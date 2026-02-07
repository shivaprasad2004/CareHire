import { useState, useEffect } from 'react';

const withLoading = (WrappedComponent, options = {}) => {
  const { 
    loadingDelay = 300,
    loadingMessage = 'Loading...',
    errorMessage = 'Something went wrong',
    retryButton = true
  } = options;

  const WithLoadingComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      let loadingTimer;
      
      if (props.loading) {
        setLoading(true);
        setError(null);
        setShowContent(false);
        
        // Show loading state immediately, but delay showing content
        loadingTimer = setTimeout(() => {
          setShowContent(true);
        }, loadingDelay);
      } else if (props.error) {
        setLoading(false);
        setError(props.error);
        setShowContent(true);
      } else {
        setLoading(false);
        setError(null);
        setShowContent(true);
      }

      return () => {
        if (loadingTimer) clearTimeout(loadingTimer);
      };
    }, [props.loading, props.error, loadingDelay]);

    const handleRetry = () => {
      if (props.onRetry) {
        props.onRetry();
      }
    };

    if (!showContent) {
      return null;
    }

    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">{loadingMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-message">
            <p>{errorMessage}</p>
            {error && <p className="error-details">{error}</p>}
            {retryButton && props.onRetry && (
              <button onClick={handleRetry} className="retry-button">
                Try Again
              </button>
            )}
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return WithLoadingComponent;
};

export default withLoading;