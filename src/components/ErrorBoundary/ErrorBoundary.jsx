import React from 'react';
import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Uncanny Error Caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-container">
          <div className="error-content">
            <h1>Something Uncanny Happened...</h1>
            <p>
              It seems Soercia the Puca has been playing tricks on our code.
              The connection to the spirit world (or the server) was interrupted.
            </p>
            
            {/* Helpful for you as a developer to see on screen */}
            <details className="error-details">
              <summary>Technical Details</summary>
              {this.state.error && this.state.error.toString()}
            </details>

            <button onClick={this.handleReload} className="reload-btn">
              Try Again (Reload)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;