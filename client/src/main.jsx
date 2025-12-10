
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

// Import your Publishable Key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

// Create a component that wraps ClerkProvider with the navigate function
const ClerkProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      // Add any additional Clerk configuration here
      // isSatellite={window.location.hostname !== 'localhost'}
      // domain={window.location.hostname === 'localhost' ? undefined : '.quick-ai.dev'}
    >
      {children}
    </ClerkProvider>
  );
};

// Render the app
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProviderWithNavigate>
      <App />
    </ClerkProviderWithNavigate>
  </BrowserRouter>
);
