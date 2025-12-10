const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 30000, // 30 seconds
  },
  
  // Clerk Authentication
  clerk: {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    // Add other Clerk configurations here
  },
  
  // Environment
  env: import.meta.env.VITE_ENV || 'development',
  isProduction: import.meta.env.VITE_ENV === 'production',
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  
  // Feature Flags
  features: {
    // Add any feature flags here
  },
};

export default config;
