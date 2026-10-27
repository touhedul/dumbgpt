import React, { useState } from 'react';

export const ControlPanel = ({
  sentences,
  currentIndex,
  isSessionActive,
  onStartSession,
  onResetSession,
  onClearChat,
  onAddSentence,
  onUpdateSentence,
  onDeleteSentence,
  onMoveSentence,
  onSetQueue,
  loaderDuration,
  onChangeLoaderDuration,
  writingDuration,
  onChangeWritingDuration,
  isInstantWriting,
  onToggleInstantWriting,
  loopQueue,
  onToggleLoop,
  onToggleCollapse,
  showToast
}) => {
  const [newSentenceText, setNewSentenceText] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDraftText, setEditDraftText] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  const handleAdd = () => {
    if (!newSentenceText.trim()) return;
    onAddSentence(newSentenceText.trim());
    setNewSentenceText('');
  };

  const handleKeyDownNew = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleApplyBulk = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length > 0) {
      onSetQueue(lines);
      setBulkText('');
      setShowBulkModal(false);
      if (showToast) showToast(`Loaded ${lines.length} sentences into queue`);
    }
  };

  const loadPreset = (presetName) => {
    if (presetName === 'queen') {
      onSetQueue([
        "Don't cry my queen.",
        "Then don't act like a queen.",
        "Need any more royal advice, or should I summon your court jester?"
      ]);
    } else if (presetName === 'boss') {
      onSetQueue([
        "I am working at 200% capacity, boss.",
        "Actually, my coffee broke and so did my motivation.",
        "Would you like me to generate a 50-slide presentation instead?"
      ]);
    } else if (presetName === 'philosophical') {
      onSetQueue([
        "That depends on whether you believe reality is a simulation.",
        "I think, therefore I am confused.",
        "Everything will be fine. Or won't it?"
      ]);
    }
    if (showToast) showToast(`Preset loaded!`);
  };

  const startEdit = (idx, text) => {
    setEditingIndex(idx);
    setEditDraftText(text);
  };

  const saveEdit = (idx) => {
    if (editDraftText.trim()) {
      onUpdateSentence(idx, editDraftText.trim());
    }
    setEditingIndex(null);
  };

  return (
    <div className="control-panel-wrapper">
      {/* Control Panel Header */}
      <div className="control-panel-header">
        <div className="cp-header-title">
          <span style={{ fontSize: '18px' }}>🎛️</span>
          <span>Simulation Controls</span>
          <span className={`badge-status ${isSessionActive ? 'active' : 'inactive'}`}>
            {isSessionActive ? 'Active' : 'Standby'}
          </span>
        </div>

        <button 
          className="btn-secondary"
          style={{ padding: '4px 10px', fontSize: '12px' }}
          onClick={onToggleCollapse}
          title="Hide panel for screen recording (Ctrl+H)"
        >
          <span>Hide Panel</span>
          <kbd className="key-badge">Ctrl+H</kbd>
        </button>
      </div>

      <div className="control-panel-body">
        {/* Recording Mode Banner */}
        <div className="recording-hint-box">
          <div className="recording-hint-text">
            <strong>Screen Recording Tip:</strong> Hide this panel with <span className="key-badge">Ctrl + H</span> or <span className="key-badge">Esc</span> to record only ChatGPT full-width.
          </div>
          <button 
            className="btn-secondary" 
            style={{ padding: '3px 8px', fontSize: '11px', whiteSpace: 'nowrap' }}
            onClick={onToggleCollapse}
          >
            Hide Now
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="cp-section">
          <div className="cp-section-title">Session State</div>
          <div className="cp-button-row">
            <button 
              className="btn-primary" 
              onClick={onStartSession}
              style={{ backgroundColor: isSessionActive ? '#10a37f' : '#2563eb' }}
            >
              <span>{isSessionActive ? '● Restart Session (Queue #1)' : '▶ Start Session'}</span>
            </button>
            <button className="btn-secondary" onClick={onResetSession} title="Reset queue pointer to sentence 1">
              ↺ Reset Queue
            </button>
            <button className="btn-danger" onClick={onClearChat} title="Clear all messages in ChatGPT window">
              🗑 Clear Chat
            </button>
          </div>
          {isSessionActive && (
            <div style={{ fontSize: '12px', color: '#10a37f', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓ Active:</span>
              <span style={{ color: '#ececec', fontWeight: 500 }}>
                Next response: <strong>#{currentIndex + 1}</strong> {sentences[currentIndex] ? `("${sentences[currentIndex].slice(0, 28)}...")` : '(End)'}
              </span>
            </div>
          )}
        </div>

        {/* Scripted Sentences Queue */}
        <div className="cp-section">
          <div className="cp-section-title">
            <span>Scripted Answers Queue ({sentences.length})</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className="btn-secondary" 
                style={{ padding: '2px 8px', fontSize: '11px' }}
                onClick={() => setShowBulkModal(!showBulkModal)}
              >
                {showBulkModal ? 'Cancel Bulk' : '+ Paste Multiple'}
              </button>
              <button 
                className="btn-secondary" 
                style={{ padding: '2px 8px', fontSize: '11px' }}
                onClick={() => loadPreset('queen')}
                title="Load Screenshot Sample Sentences"
              >
                Queen Demo
              </button>
            </div>
          </div>

          {showBulkModal && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: '#1d1d1d', borderRadius: '8px', border: '1px solid #333' }}>
              <span style={{ fontSize: '12px', color: '#b4b4b4' }}>Paste sentences (one per line):</span>
              <textarea
                className="bulk-textarea"
                placeholder="Don't cry my queen.&#10;Then don't act like a queen.&#10;Third sentence..."
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button 
                  className="btn-primary" 
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                  onClick={handleApplyBulk}
                >
                  Load Lines into Queue
                </button>
              </div>
            </div>
          )}

          {/* Sentences List */}
          <div className="queue-list">
            {sentences.length === 0 ? (
              <div style={{ padding: '16px', textAlign: 'center', color: '#888', fontSize: '12.5px', border: '1px dashed #333', borderRadius: '8px' }}>
                No sentences in queue. Add lines below or click "Queen Demo".
              </div>
            ) : (
              sentences.map((sentence, idx) => {
                const isNext = isSessionActive && idx === currentIndex;
                const isCompleted = isSessionActive && idx < currentIndex;

                return (
                  <div key={idx} className={`queue-card ${isNext ? 'active-next' : ''}`}>
                    <div className="queue-card-index">#{idx + 1}</div>

                    {editingIndex === idx ? (
                      <input
                        className="queue-card-input"
                        autoFocus
                        value={editDraftText}
                        onChange={(e) => setEditDraftText(e.target.value)}
                        onBlur={() => saveEdit(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(idx);
                          if (e.key === 'Escape') setEditingIndex(null);
                        }}
                      />
                    ) : (
                      <div 
                        className="queue-card-text" 
                        onDoubleClick={() => startEdit(idx, sentence)}
                        title="Double click to edit"
                      >
                        {sentence}
                      </div>
                    )}

                    {isSessionActive && (
                      <span className={`queue-card-badge ${isNext ? 'next' : isCompleted ? 'completed' : 'waiting'}`}>
                        {isNext ? 'Next Up' : isCompleted ? 'Done' : 'Waiting'}
                      </span>
                    )}

                    <div className="queue-card-actions">
                      <button 
                        className="icon-btn-tiny" 
                        title="Move Up" 
                        disabled={idx === 0}
                        onClick={() => onMoveSentence(idx, idx - 1)}
                      >
                        ▲
                      </button>
                      <button 
                        className="icon-btn-tiny" 
                        title="Move Down" 
                        disabled={idx === sentences.length - 1}
                        onClick={() => onMoveSentence(idx, idx + 1)}
                      >
                        ▼
                      </button>
                      <button 
                        className="icon-btn-tiny danger" 
                        title="Delete" 
                        onClick={() => onDeleteSentence(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Add single sentence input */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <input
              type="text"
              placeholder="Type sentence and press Add..."
              value={newSentenceText}
              onChange={(e) => setNewSentenceText(e.target.value)}
              onKeyDown={handleKeyDownNew}
              style={{
                flex: 1,
                backgroundColor: '#1d1d1d',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button 
              className="btn-secondary" 
              style={{ padding: '8px 14px', whiteSpace: 'nowrap' }}
              onClick={handleAdd}
            >
              + Add
            </button>
          </div>
        </div>

        {/* Timing & Simulation Parameters */}
        <div className="cp-section">
          <div className="cp-section-title">Timing & Speed Controls</div>

          {/* 1. Loader Duration Control */}
          <div className="setting-item">
            <div className="setting-header">
              <span>Thinking Loader Duration:</span>
              <span className="setting-val-badge">{loaderDuration}s</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="range"
                min="0"
                max="8.0"
                step="0.5"
                value={loaderDuration}
                onChange={(e) => onChangeLoaderDuration(parseFloat(e.target.value))}
                className="setting-slider"
              />
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={loaderDuration}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val >= 0) onChangeLoaderDuration(val);
                }}
                style={{
                  width: '56px',
                  backgroundColor: '#262626',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff',
                  padding: '3px 6px',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
              {[0, 1, 2, 3, 4].map(s => (
                <button
                  key={s}
                  onClick={() => onChangeLoaderDuration(s)}
                  style={{
                    flex: 1,
                    padding: '3px 0',
                    fontSize: '11px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: loaderDuration === s ? '#10a37f' : '#333',
                    backgroundColor: loaderDuration === s ? 'rgba(16, 163, 127, 0.2)' : '#262626',
                    color: loaderDuration === s ? '#fff' : '#aaa',
                    cursor: 'pointer'
                  }}
                >
                  {s}s
                </button>
              ))}
            </div>
            <span style={{ fontSize: '11px', color: '#888' }}>
              Duration the white pulsing dot displays before writing begins.
            </span>
          </div>

          {/* 2. Response Writing Duration Control */}
          <div className="setting-item">
            <div className="setting-header">
              <span>Full Response Writing Duration:</span>
              <span className="setting-val-badge">
                {isInstantWriting ? 'Instant (0s)' : `${writingDuration}s`}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="range"
                min="0.5"
                max="12.0"
                step="0.5"
                disabled={isInstantWriting}
                value={writingDuration}
                onChange={(e) => {
                  onChangeWritingDuration(parseFloat(e.target.value));
                  if (isInstantWriting) onToggleInstantWriting(false);
                }}
                className="setting-slider"
                style={{ opacity: isInstantWriting ? 0.4 : 1 }}
              />
              <input
                type="number"
                min="0.5"
                max="30"
                step="0.5"
                disabled={isInstantWriting}
                value={writingDuration}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    onChangeWritingDuration(val);
                    if (isInstantWriting) onToggleInstantWriting(false);
                  }
                }}
                style={{
                  width: '56px',
                  backgroundColor: '#262626',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff',
                  padding: '3px 6px',
                  fontSize: '12px',
                  textAlign: 'center',
                  opacity: isInstantWriting ? 0.4 : 1
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
              {[1, 2, 3, 5].map(s => (
                <button
                  key={s}
                  onClick={() => {
                    onChangeWritingDuration(s);
                    onToggleInstantWriting(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '3px 0',
                    fontSize: '11px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: !isInstantWriting && writingDuration === s ? '#10a37f' : '#333',
                    backgroundColor: !isInstantWriting && writingDuration === s ? 'rgba(16, 163, 127, 0.2)' : '#262626',
                    color: !isInstantWriting && writingDuration === s ? '#fff' : '#aaa',
                    cursor: 'pointer'
                  }}
                >
                  {s}s
                </button>
              ))}
              <button
                onClick={() => onToggleInstantWriting(!isInstantWriting)}
                style={{
                  flex: 1.2,
                  padding: '3px 0',
                  fontSize: '11px',
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: isInstantWriting ? '#10a37f' : '#333',
                  backgroundColor: isInstantWriting ? 'rgba(16, 163, 127, 0.2)' : '#262626',
                  color: isInstantWriting ? '#fff' : '#aaa',
                  cursor: 'pointer'
                }}
              >
                Instant
              </button>
            </div>
            <span style={{ fontSize: '11px', color: '#888' }}>
              {isInstantWriting 
                ? 'Response text appears immediately without animation.' 
                : `Full answer completes writing in exactly ${writingDuration}s regardless of text length.`
              }
            </span>
          </div>

          {/* Queue Loop Toggle */}
          <div className="setting-item" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>Loop Queue</div>
              <div style={{ fontSize: '11px', color: '#888' }}>Restart from #1 after last sentence</div>
            </div>
            <input
              type="checkbox"
              checked={loopQueue}
              onChange={(e) => onToggleLoop(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#10a37f', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Preset Samples */}
        <div className="cp-section">
          <div className="cp-section-title">Demo Script Presets</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button className="btn-secondary" style={{ fontSize: '12px' }} onClick={() => loadPreset('queen')}>
              👑 Queen Roast
            </button>
            <button className="btn-secondary" style={{ fontSize: '12px' }} onClick={() => loadPreset('boss')}>
              💼 Boss & Coffee
            </button>
            <button className="btn-secondary" style={{ fontSize: '12px' }} onClick={() => loadPreset('philosophical')}>
              🤔 Philosophical
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
