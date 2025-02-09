import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import MapInterface from './src/components/map-interface';

// Ensure Google Maps API key is present
if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
  console.error('Google Maps API key is missing. Please check your environment variables.');
}

// Get the root element
const container = document.getElementById('root');

// Create a root for the application
const root = createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <MapInterface />
  </React.StrictMode>
);