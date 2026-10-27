import React, { useState, useRef, useEffect } from 'react';
import {
  SidebarIcon,
  NewChatIcon,
  ShareIcon,
  MoreDotsIcon,
  CopyIcon,
  CheckIcon,
  EditIcon,
  ThumbsUpDownIcon,
  ReadAloudIcon,
  RegenerateIcon,
  ScrollDownIcon,
  PlusIcon,
  MicIcon,
  VoiceWaveIcon,
  SendArrowIcon,
  StopIcon
} from './Icons';

export const ChatGPT = ({
  messages,
  onSendMessage,
  onRegenerate,
  onClearChat,
  isProcessing,
  isWaitingLoader,
  streamingMessageId,
  streamedText,
  onStopGenerating,
  onToggleSidebar,
  showToast
}) => {
  const [inputValue, setInputValue] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editPromptValue, setEditPromptValue] = useState('');
  const [feedbackMap, setFeedbackMap] = useState({});

  const scrollAreaRef = useRef(null);
  const textareaRef = useRef(null);
  const isAutoScrollingRef = useRef(true);

  // Keep cursor focused in textarea at all times
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [isProcessing]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputValue]);

  // Handle scroll detection for the scroll-down floating button
  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    // If user scrolled up by more than 100px, show the button
    setShowScrollBottom(distanceToBottom > 100);
    isAutoScrollingRef.current = distanceToBottom <= 100;
  };

  const scrollToBottom = (smooth = true) => {
    if (!scrollAreaRef.current) return;
    scrollAreaRef.current.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  // Scroll to bottom on new messages or during streaming
  useEffect(() => {
    if (isAutoScrollingRef.current || isProcessing) {
      scrollToBottom(false);
    }
  }, [messages, streamedText, isWaitingLoader, isProcessing]);

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;
    const text = inputValue.trim();
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
    onSendMessage(text);
    // Ensure cursor stays focused without needing to click again
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isProcessing) {
        handleSend();
      }
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (showToast) showToast('Copied to clipboard');
    setTimeout(() => {
      setCopiedId((current) => (current === id ? null : current));
    }, 2000);
  };

  const handleReadAloud = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    if (showToast) showToast('Reading aloud...');
  };

  const handleFeedback = (id) => {
    setFeedbackMap(prev => {
      const next = !prev[id];
      if (next && showToast) {
        showToast('Thanks for the feedback!');
      }
      return { ...prev, [id]: next };
    });
  };

  const startEditing = (msg) => {
    setEditingMessageId(msg.id);
    setEditPromptValue(msg.content);
  };

  const submitEdit = () => {
    if (!editPromptValue.trim()) return;
    setEditingMessageId(null);
    onSendMessage(editPromptValue.trim());
  };

  return (
    <div className="chatgpt-wrapper">
      {/* ChatGPT Top Navigation Bar */}
      <header className="chatgpt-header">
        <div className="header-left">
          <button className="header-btn" title="Toggle sidebar" onClick={onToggleSidebar}>
            <SidebarIcon size={19} />
          </button>
          <button className="header-btn" title="New chat" onClick={onClearChat}>
            <NewChatIcon size={19} />
          </button>
          <div className="model-selector" title="Model selector">
            <span>ChatGPT</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, marginTop: '1px' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <div className="header-right">
          <button className="header-btn" title="More options">
            <MoreDotsIcon size={18} />
          </button>
          <button
            className="share-btn"
            onClick={() => {
              if (showToast) showToast('Share link copied to clipboard');
            }}
          >
            <ShareIcon size={16} />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div
        className="chat-scroll-area"
        ref={scrollAreaRef}
        onScroll={handleScroll}
      >
        <div className="chat-content-container">
          {messages.length === 0 ? (
            <div className="welcome-container">
              <h1 className="welcome-title">What's on your mind today?</h1>
            </div>
          ) : (
            messages.map((msg) => {
              const isUser = msg.role === 'user';
              const isCurrentlyStreaming = msg.id === streamingMessageId;
              const displayText = isCurrentlyStreaming ? streamedText : msg.content;

              if (isUser) {
                return (
                  <div key={msg.id} className="user-message-row">
                    {editingMessageId === msg.id ? (
                      <div style={{ width: '100%', maxWidth: '82%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <textarea
                          value={editPromptValue}
                          onChange={(e) => setEditPromptValue(e.target.value)}
                          style={{
                            width: '100%',
                            backgroundColor: '#2f2f2f',
                            color: '#ffffff',
                            borderRadius: '16px',
                            padding: '12px 16px',
                            border: '1px solid #484848',
                            fontSize: '15.5px',
                            lineHeight: '1.5',
                            resize: 'none',
                            outline: 'none'
                          }}
                          rows={3}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => setEditingMessageId(null)}
                            style={{
                              backgroundColor: '#262626',
                              color: '#b4b4b4',
                              border: '1px solid #383838',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => submitEdit(msg.id)}
                            style={{
                              backgroundColor: '#ffffff',
                              color: '#0d0d0d',
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '8px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="user-bubble">{msg.content}</div>
                        <div className="user-actions">
                          <button
                            className="action-icon-btn"
                            title="Copy message"
                            onClick={() => handleCopy(msg.id, msg.content)}
                          >
                            {copiedId === msg.id ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                          </button>
                          <button
                            className="action-icon-btn"
                            title="Share"
                            onClick={() => {
                              if (showToast) showToast('Prompt shared');
                            }}
                          >
                            <ShareIcon size={18} />
                          </button>
                          <button
                            className="action-icon-btn"
                            title="Edit prompt"
                            onClick={() => startEditing(msg)}
                          >
                            <EditIcon size={18} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              // Assistant message
              return (
                <div key={msg.id} className="assistant-message-row">
                  <div className="assistant-content">
                    {displayText}
                  </div>

                  {!isCurrentlyStreaming && (
                    <div className="assistant-actions">
                      <button
                        className="action-icon-btn"
                        title="Copy"
                        onClick={() => handleCopy(msg.id, msg.content)}
                      >
                        {copiedId === msg.id ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                      </button>
                      <button
                        className={`action-icon-btn ${feedbackMap[msg.id] ? 'active' : ''}`}
                        title="Good response"
                        onClick={() => handleFeedback(msg.id)}
                      >
                        <ThumbsUpDownIcon size={18} />
                      </button>
                      <button
                        className="action-icon-btn"
                        title="Read aloud"
                        onClick={() => handleReadAloud(msg.content)}
                      >
                        <ReadAloudIcon size={18} />
                      </button>
                      <button
                        className="action-icon-btn"
                        title="Share"
                        onClick={() => {
                          if (showToast) showToast('Response link copied');
                        }}
                      >
                        <ShareIcon size={18} />
                      </button>
                      <button
                        className="action-icon-btn"
                        title="Regenerate"
                        onClick={() => onRegenerate(msg.id)}
                      >
                        <RegenerateIcon size={18} />
                      </button>
                      <button className="action-icon-btn" title="More">
                        <MoreDotsIcon size={18} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Authentic 2-Second Loader (Pulsing White Circle Dot as in image 2) */}
          {isWaitingLoader && (
            <div className="assistant-message-row">
              <div className="loader-container">
                <div className="chatgpt-loader-dot" title="Thinking..." />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Jump-to-Bottom Button matching download.jpg */}
      {(showScrollBottom || messages.length > 0) && (
        <button
          className="scroll-bottom-btn"
          onClick={() => scrollToBottom(true)}
          title="Scroll to bottom"
        >
          <ScrollDownIcon size={14} />
        </button>
      )}

      {/* Bottom Input Area */}
      <div className="chat-bottom-wrapper">
        <div className="input-container-pill">
          {/* Top row: textarea with Ask ChatGPT placeholder */}
          <div className="input-row-top">
            <textarea
              ref={textareaRef}
              className="chat-input-textarea"
              placeholder="Ask ChatGPT"
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Bottom row: Plus on left, Mic + Voice on right */}
          <div className="input-row-bottom">
            <button className="input-plus-btn" title="Attach file or action">
              <PlusIcon size={17} />
            </button>

            <div className="input-actions-right">
              {!inputValue.trim() && !isProcessing && (
                <button className="input-mic-btn" title="Voice dictation">
                  <MicIcon size={18} />
                </button>
              )}

              {isProcessing ? (
                <StopIcon size={30} onClick={onStopGenerating} />
              ) : inputValue.trim() ? (
                <SendArrowIcon
                  size={30}
                  disabled={false}
                  onClick={handleSend}
                />
              ) : (
                <VoiceWaveIcon
                  size={30}
                  onClick={() => {
                    if (showToast) showToast('Voice Mode is simulated. Type a message to chat.');
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="bottom-disclaimer">
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};
