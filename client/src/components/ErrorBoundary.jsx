import React from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ errorInfo });
        
        // You can also log the error to an error reporting service
        if (window.location.hostname !== 'localhost') {
            // Send to error tracking service in production
            // Example: sentry.captureException(error);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="min-h-screen flex items-center justify-center bg-background p-4"
                >
                    <div className="max-w-lg w-full">
                        <div className="bg-background-secondary rounded-2xl p-8 border border-border shadow-soft">
                            {/* Error Icon */}
                            <motion.div
                                className="flex justify-center mb-6"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-16 h-16 rounded-full bg-status-error/20 flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-status-error" />
                                </div>
                            </motion.div>

                            {/* Error Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-status-error mb-3 text-center">
                                Oops! Something went wrong
                            </h1>

                            {/* Error Message */}
                            <p className="text-text-secondary mb-4 text-center">
                                We're sorry, but the application encountered an unexpected error. Our team has been notified.
                            </p>

                            {/* Error Details (in development) */}
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="mb-6 p-4 rounded-lg bg-background-tertiary border border-border">
                                    <p className="text-xs font-mono text-text-muted break-words">
                                        <strong>Error:</strong> {this.state.error.toString()}
                                    </p>
                                    {this.state.errorInfo && (
                                        <details className="mt-2 text-xs">
                                            <summary className="cursor-pointer text-accent hover:underline">Details</summary>
                                            <pre className="mt-2 overflow-auto max-h-40 text-text-muted">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={this.handleReset}
                                    className="flex-1 px-4 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Try Again
                                </button>
                                <button
                                    onClick={this.handleHome}
                                    className="flex-1 px-4 py-3 bg-background-tertiary text-text rounded-lg font-medium hover:bg-background-secondary transition-colors border border-border flex items-center justify-center gap-2"
                                >
                                    <Home className="w-5 h-5" />
                                    Go Home
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
