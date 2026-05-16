import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css'; // This imports all of our global styles (like colors, fonts)

// This file is the starting point of our entire React frontend application!
// It tells the browser to take our main `<App />` component and inject it into the HTML page.

ReactDOM.createRoot(document.getElementById('root')).render(
    // StrictMode is a React tool that highlights potential problems in an application by running checks in development.
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
);
