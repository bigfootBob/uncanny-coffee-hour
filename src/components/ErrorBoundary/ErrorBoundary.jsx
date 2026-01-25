import React from 'react';
import { withTranslation } from 'react-i18next';
import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncanny Error Caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-content">
            <h1>{t('misctext.error')}</h1>
            <p>
              {t('misctext.error_text')}
            </p>
            
            <details className="error-details">
              <summary>{t('misctext.error_details')}</summary>
              {this.state.error && this.state.error.toString()}
            </details>

            <button onClick={this.handleReload} className="reload-btn">
              {t('misctext.try_again')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default withTranslation()(ErrorBoundary);