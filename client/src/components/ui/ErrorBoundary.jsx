import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Logo from './Logo';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
          <div className="text-center max-w-md w-full">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Logo className="h-8 w-8" />
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Care<span className="text-[#00a651]">Hire</span>
              </span>
            </div>

            {/* Icon */}
            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={28} className="text-red-500 dark:text-red-400" />
            </div>

            {/* Heading & description */}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              An unexpected error occurred. Please try again or return to the home page.
            </p>

            {/* Error details in dev mode */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">
                  Error Details
                </p>
                <p className="text-sm text-red-600 dark:text-red-300 font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-carehire-600 text-white hover:bg-carehire-700 hover:shadow-lg hover:shadow-carehire-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-carehire-600/40 focus:ring-offset-1"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
              >
                <Home size={16} />
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
