import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import '../App.css';

const IframeView = ({ url, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when URL changes
  useEffect(() => {
    setIsLoading(true);
  }, [url]);

  const handleCallback = () => {
    // Artificial delay or just turn off when loaded
    setIsLoading(false);
  };

  return (
    <div className="main-content">
      {/* Render overlay elements (like the toggle button) */}
      {children}
      
      <div className="iframe-wrapper">
        {isLoading && (
            <div className="iframe-loader">
                <Loader2 className="spinner" size={48} />
                <p>Loading Content...</p>
            </div>
        )}
        <iframe 
            src={url} 
            title="Main View"
            className={`iframe-element ${isLoading ? 'loading' : ''}`}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onLoad={handleCallback}
        />
      </div>
    </div>
  );
};

export default IframeView;
