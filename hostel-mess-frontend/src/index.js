/**
 * ============================================================================
 * Application Entry Point
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This is the root entry point for the React application.
 * All providers (Router, Theme, Auth) are set up in App.jsx
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root DOM element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the application
// Note: BrowserRouter, ThemeProvider, and AuthProvider are all in App.jsx
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);