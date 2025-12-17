import React from 'react';
import { X } from 'lucide-react';
import '../App.css';

const InfoPanel = ({ isOpen, togglePanel, data }) => {
  return (
    <>
      <aside className={`info-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
            <span>{data ? 'Details' : 'Info'}</span>
            <button className="close-btn" onClick={togglePanel}>
              <X size={20} />
            </button>
        </div>
      
        {data ? (
             <div className="info-content-wrapper">
                {/* Hero Section for the main word */}
                <div className="hero-card">
                    <span className="hero-label">Selected Term</span>
                    <h2 className="hero-value">{data.word}</h2>
                </div>

                {/* Details Grid */}
                 {data.details && Object.entries(data.details).length > 0 ? (
                    <div className="details-grid">
                        {Object.entries(data.details).map(([key, value]) => (
                            <div className="detail-item" key={key}>
                                <span className="detail-label">{key}</span>
                                <span className="detail-value">
                                  {typeof value === 'object' 
                                    ? JSON.stringify(value) 
                                    : String(value).replace(/^"|"$/g, '')}
                                </span>
                            </div>
                        ))}
                    </div>
                 ) : (
                    <div className="empty-state">
                        <p>No additional metadata available.</p>
                    </div>
                 )}
             </div>
        ) : (
             /* Default State if no word selected */
            <div className="default-state">
                <div className="info-card">
                    <h4>Status</h4>
                    <div className="status-badge">System Active</div>
                </div>

                <div className="info-card">
                    <h4>Current Context</h4>
                    <div className="value">Navigation Mode</div>
                </div>

                <p className="helper-text">
                    Select a highlighted term in the main view to inspect its detailed properties here.
                </p>
            </div>
        )}
       
      </aside>
    </>
  );
};

export default InfoPanel;
