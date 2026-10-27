import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatGPT } from './components/ChatGPT';
import { ControlPanel } from './components/ControlPanel';

// Realistic ChatGPT token splitter: splits words, spaces, and punctuation chunks
function splitIntoChatGPTTokens(text) {
  const tokens = [];
  const regex = /(\s+)|([^\s\w]+)|([a-zA-Z0-9]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const part = match[0];
    if (part.length > 7 && !part.startsWith(' ') && !part.startsWith('http')) {
      const mid = Math.ceil(part.length / 2);
      tokens.push(part.slice(0, mid));
      tokens.push(part.slice(mid));
    } else {
      tokens.push(part);
    }
  }
  return tokens.length > 0 ? tokens : [text];
}

const INITIAL_SENTENCES = [
  "Don't cry my queen.",
  "Then don't act like a queen."
];

export function App() {
  // Script and Queue state
  const [sentences, setSentences] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_sentences');
    return saved ? JSON.parse(saved) : INITIAL_SENTENCES;
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_currentIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isSessionActive, setIsSessionActive] = useState(true);
  const [loopQueue, setLoopQueue] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_loopQueue');
    return saved !== null ? saved === 'true' : true;
  });
  const [loaderDuration, setLoaderDuration] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_loaderDuration');
    return saved ? parseFloat(saved) : 2.0;
  });
  const [writingDuration, setWritingDuration] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_writingDuration');
    return saved ? parseFloat(saved) : 3.0; // default: full text writes in 3.0s
  });
  const [isInstantWriting, setIsInstantWriting] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_isInstantWriting');
    return saved === 'true';
  });

  // Layout & Splitter state
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_panelWidth');
    return saved ? parseInt(saved, 10) : 420;
  });
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });
  const isDraggingSplitter = useRef(false);

  // Chat message thread
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('dumbgpt_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Processing & Streaming state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWaitingLoader, setIsWaitingLoader] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [streamedText, setStreamedText] = useState('');
  
  // Timer & Streaming abort refs
  const loaderTimeoutRef = useRef(null);
  const streamingTimeoutRef = useRef(null);
  const activeStreamTargetRef = useRef('');

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('dumbgpt_sentences', JSON.stringify(sentences));
  }, [sentences]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_currentIndex', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_panelWidth', panelWidth.toString());
  }, [panelWidth]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_loaderDuration', loaderDuration.toString());
  }, [loaderDuration]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_writingDuration', writingDuration.toString());
  }, [writingDuration]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_isInstantWriting', isInstantWriting.toString());
  }, [isInstantWriting]);

  useEffect(() => {
    localStorage.setItem('dumbgpt_loopQueue', loopQueue.toString());
  }, [loopQueue]);

  // Global hotkey to toggle Control Panel (Recording Mode)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+H or Cmd+H or Escape
      if ((e.ctrlKey || e.metaKey) && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        setIsPanelCollapsed(prev => !prev);
      } else if (e.key === 'Escape' && !isPanelCollapsed) {
        setIsPanelCollapsed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelCollapsed]);

  // Dragging the splitter handle
  const handleSplitterMouseDown = (e) => {
    e.preventDefault();
    isDraggingSplitter.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingSplitter.current) return;
      const newWidth = Math.max(300, Math.min(window.innerWidth - 380, moveEvent.clientX));
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDraggingSplitter.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Start / Restart Session
  const handleStartSession = () => {
    setIsSessionActive(true);
    setCurrentIndex(0);
    showToast('Simulation Session started at sentence #1');
  };

  const handleResetSession = () => {
    setCurrentIndex(0);
    showToast('Queue pointer reset to sentence #1');
  };

  const handleClearChat = () => {
    if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
    if (streamingTimeoutRef.current) clearTimeout(streamingTimeoutRef.current);
    setIsProcessing(false);
    setIsWaitingLoader(false);
    setStreamingMessageId(null);
    setStreamedText('');
    setMessages([]);
    showToast('Chat cleared');
  };

  // Queue actions
  const handleAddSentence = (text) => {
    setSentences(prev => [...prev, text]);
    showToast('Added to queue');
  };

  const handleUpdateSentence = (index, newText) => {
    setSentences(prev => {
      const copy = [...prev];
      copy[index] = newText;
      return copy;
    });
    showToast('Updated sentence');
  };

  const handleDeleteSentence = (index) => {
    setSentences(prev => prev.filter((_, i) => i !== index));
    if (currentIndex >= index && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
    showToast('Deleted sentence');
  };

  const handleMoveSentence = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= sentences.length) return;
    setSentences(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  const handleSetQueue = (newLines) => {
    setSentences(newLines);
    setCurrentIndex(0);
    setIsSessionActive(true);
  };

  // Stop generating
  const handleStopGenerating = () => {
    if (loaderTimeoutRef.current) clearTimeout(loaderTimeoutRef.current);
    if (streamingTimeoutRef.current) clearTimeout(streamingTimeoutRef.current);

    if (streamingMessageId && activeStreamTargetRef.current) {
      // Commit the text streamed so far
      setMessages(prev =>
        prev.map(msg =>
          msg.id === streamingMessageId ? { ...msg, content: streamedText } : msg
        )
      );
    }

    setIsProcessing(false);
    setIsWaitingLoader(false);
    setStreamingMessageId(null);
    setStreamedText('');
    showToast('Generation stopped');
  };

  // Core Simulation Engine: Send user prompt -> 2s loader -> Left-to-right typing
  const handleSendMessage = (userText) => {
    if (isProcessing) return;

    // 1. Add user message
    const userMessageId = 'user-' + Date.now();
    const newUserMsg = {
      id: userMessageId,
      role: 'user',
      content: userText
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setIsWaitingLoader(true);

    // 2. Determine target response from queue
    let targetReply = "I have no response configured. Please add sentences to the left control panel.";
    
    if (sentences.length > 0) {
      if (currentIndex < sentences.length) {
        targetReply = sentences[currentIndex];
        
        // Advance queue pointer
        if (currentIndex + 1 < sentences.length) {
          setCurrentIndex(prev => prev + 1);
        } else if (loopQueue) {
          setCurrentIndex(0); // Loop back to beginning
        } else {
          setCurrentIndex(sentences.length); // Stay at end
        }
      } else if (loopQueue) {
        targetReply = sentences[0];
        setCurrentIndex(sentences.length > 1 ? 1 : 0);
      }
    }

    activeStreamTargetRef.current = targetReply;

    // 3. Wait for the Loader Duration (exact configured seconds)
    const delayMs = Math.max(0, loaderDuration * 1000);

    loaderTimeoutRef.current = setTimeout(() => {
      setIsWaitingLoader(false);

      // Create assistant message placeholder
      const assistantMessageId = 'assistant-' + Date.now();
      const assistantMsg = {
        id: assistantMessageId,
        role: 'assistant',
        content: ''
      };

      setMessages(prev => [...prev, assistantMsg]);
      setStreamingMessageId(assistantMessageId);

      // 4. Stream typing from left to right paced to finish in exact writingDuration
      if (isInstantWriting || writingDuration <= 0) {
        setMessages(prev =>
          prev.map(m => (m.id === assistantMessageId ? { ...m, content: targetReply } : m))
        );
        setIsProcessing(false);
        setStreamingMessageId(null);
        setStreamedText('');
        return;
      }

      const tokens = splitIntoChatGPTTokens(targetReply);
      const tokenCount = tokens.length;
      if (tokenCount === 0) {
        setIsProcessing(false);
        setStreamingMessageId(null);
        setStreamedText('');
        return;
      }

      const totalDurationMs = Math.max(100, writingDuration * 1000);
      let tokenIdx = 0;
      let accumulated = '';
      setStreamedText('');
      const startTime = performance.now();

      const streamNextToken = () => {
        if (tokenIdx >= tokenCount) {
          setMessages(prev =>
            prev.map(m => (m.id === assistantMessageId ? { ...m, content: targetReply } : m))
          );
          setIsProcessing(false);
          setStreamingMessageId(null);
          setStreamedText('');
          return;
        }

        const nextTok = tokens[tokenIdx];
        accumulated += nextTok;
        tokenIdx += 1;
        setStreamedText(accumulated);

        if (tokenIdx >= tokenCount) {
          setMessages(prev =>
            prev.map(m => (m.id === assistantMessageId ? { ...m, content: targetReply } : m))
          );
          setIsProcessing(false);
          setStreamingMessageId(null);
          setStreamedText('');
          return;
        }

        // Pacing tokens evenly so total time equals exactly totalDurationMs
        const targetElapsed = (tokenIdx / tokenCount) * totalDurationMs;
        const currentElapsed = performance.now() - startTime;
        const nextDelay = Math.max(8, targetElapsed - currentElapsed);

        streamingTimeoutRef.current = setTimeout(streamNextToken, nextDelay);
      };

      const initialDelay = Math.max(8, (1 / tokenCount) * totalDurationMs);
      streamingTimeoutRef.current = setTimeout(streamNextToken, initialDelay);
    }, delayMs);
  };

  // Regenerate response
  const handleRegenerate = (assistantId) => {
    if (isProcessing) return;
    
    // Find preceding user message
    const msgIndex = messages.findIndex(m => m.id === assistantId);
    let userPrompt = "Regenerated prompt";
    if (msgIndex > 0 && messages[msgIndex - 1].role === 'user') {
      userPrompt = messages[msgIndex - 1].content;
    }

    // Remove old assistant message
    setMessages(prev => prev.filter(m => m.id !== assistantId));
    
    // Trigger reply with current queue sentence
    handleSendMessage(userPrompt);
  };

  return (
    <div className="app-container">
      {/* Mobile Drawer Backdrop */}
      {!isPanelCollapsed && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsPanelCollapsed(true)}
          title="Click to close control panel"
        />
      )}

      {/* LEFT SECTION: Control Panel */}
      <div 
        style={{
          width: isPanelCollapsed ? 0 : `${panelWidth}px`,
          minWidth: isPanelCollapsed ? 0 : `${panelWidth}px`,
          display: isPanelCollapsed ? 'none' : 'flex'
        }}
        className={`control-panel-wrapper ${!isPanelCollapsed ? 'open' : ''}`}
      >
        <ControlPanel
          sentences={sentences}
          currentIndex={currentIndex}
          isSessionActive={isSessionActive}
          onStartSession={handleStartSession}
          onResetSession={handleResetSession}
          onClearChat={handleClearChat}
          onAddSentence={handleAddSentence}
          onUpdateSentence={handleUpdateSentence}
          onDeleteSentence={handleDeleteSentence}
          onMoveSentence={handleMoveSentence}
          onSetQueue={handleSetQueue}
          loaderDuration={loaderDuration}
          onChangeLoaderDuration={setLoaderDuration}
          writingDuration={writingDuration}
          onChangeWritingDuration={setWritingDuration}
          isInstantWriting={isInstantWriting}
          onToggleInstantWriting={setIsInstantWriting}
          loopQueue={loopQueue}
          onToggleLoop={setLoopQueue}
          onToggleCollapse={() => setIsPanelCollapsed(true)}
          showToast={showToast}
        />
      </div>

      {/* SPLITTER DRAG HANDLE (Desktop only) */}
      {!isPanelCollapsed && (
        <div 
          className="splitter" 
          onMouseDown={handleSplitterMouseDown} 
          title="Drag to resize split view"
        />
      )}

      {/* RIGHT SECTION: ChatGPT Clone */}
      <ChatGPT
        messages={messages}
        onSendMessage={handleSendMessage}
        onRegenerate={handleRegenerate}
        onClearChat={handleClearChat}
        isProcessing={isProcessing}
        isWaitingLoader={isWaitingLoader}
        streamingMessageId={streamingMessageId}
        streamedText={streamedText}
        onStopGenerating={handleStopGenerating}
        onToggleSidebar={() => setIsPanelCollapsed(prev => !prev)}
        showToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
