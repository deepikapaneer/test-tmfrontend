// Runtime configuration for API URLs
// This allows changing API URLs without rebuilding the app

export interface ApiConfig {
  USER_API_URL: string;
  TASK_API_URL: string;
  MESSAGING_API_URL: string;
  MESSAGING_WS_URL: string;
  API_BASE_URL: string;
  AUTH_API_URL: string;
  REVIEW_API_URL: string;
  PROFILE_API_URL: string;
}

// Default configuration (fallback)
const defaultConfig: ApiConfig = {
  USER_API_URL: 'https://trademinutes-user-service.onrender.com',
  TASK_API_URL: 'https://trademinutes-task-core.onrender.com',
  MESSAGING_API_URL: 'https://trademinutes-messaging.onrender.com',
  MESSAGING_WS_URL: 'wss://trademinutes-messaging.onrender.com',
  API_BASE_URL: 'https://tmagenticai.onrender.com',
  AUTH_API_URL: 'https://trademinutes-user-service.onrender.com',
  REVIEW_API_URL: 'https://trademinutes-review-service.onrender.com',
  PROFILE_API_URL: 'https://trademinutes-profile-service.onrender.com',
};

// Runtime configuration cache
let runtimeConfig: ApiConfig | null = null;

// Function to get runtime configuration
export async function getApiConfig(): Promise<ApiConfig> {
  // If we already have the config, return it
  if (runtimeConfig) {
    return runtimeConfig;
  }

  try {
    // Try to fetch runtime config from the server
    const response = await fetch('/api/config');
    if (response.ok) {
      const config = await response.json();
      runtimeConfig = config;
      return config;
    }
  } catch (error) {
    console.warn('Failed to fetch runtime config, using defaults:', error);
  }

  // Fallback to build-time environment variables or defaults
  runtimeConfig = {
    USER_API_URL: process.env.NEXT_PUBLIC_USER_API_URL || defaultConfig.USER_API_URL,
    TASK_API_URL: process.env.NEXT_PUBLIC_TASK_API_URL || defaultConfig.TASK_API_URL,
    MESSAGING_API_URL: process.env.NEXT_PUBLIC_MESSAGING_API_URL || defaultConfig.MESSAGING_API_URL,
    MESSAGING_WS_URL: process.env.NEXT_PUBLIC_MESSAGING_WS_URL || defaultConfig.MESSAGING_WS_URL,
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || defaultConfig.API_BASE_URL,
    AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL || defaultConfig.AUTH_API_URL,
    REVIEW_API_URL: process.env.NEXT_PUBLIC_REVIEW_API_URL || defaultConfig.REVIEW_API_URL,
    PROFILE_API_URL: process.env.NEXT_PUBLIC_PROFILE_API_URL || defaultConfig.PROFILE_API_URL,
  };

  return runtimeConfig;
}

// Function to clear cache (useful for testing)
export function clearConfigCache() {
  runtimeConfig = null;
} 