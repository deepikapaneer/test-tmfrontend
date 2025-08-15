import { NextResponse } from 'next/server';

export async function GET() {
  // Get configuration from server-side environment variables
  // These can be changed without rebuilding the app
  const config = {
    USER_API_URL: process.env.NEXT_PUBLIC_USER_API_URL || process.env.USER_API_URL || 'https://trademinutes-user-service.onrender.com',
    TASK_API_URL: process.env.NEXT_PUBLIC_TASK_API_URL || process.env.TASK_API_URL || 'https://trademinutes-task-core.onrender.com',
    MESSAGING_API_URL: process.env.NEXT_PUBLIC_MESSAGING_API_URL || process.env.MESSAGING_API_URL || 'https://trademinutes-messaging.onrender.com',
    MESSAGING_WS_URL: process.env.NEXT_PUBLIC_MESSAGING_WS_URL || process.env.MESSAGING_WS_URL || 'wss://trademinutes-messaging.onrender.com',
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'https://tmagenticai.onrender.com',
    AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL || process.env.AUTH_API_URL || 'https://trademinutes-user-service.onrender.com',
    REVIEW_API_URL: process.env.NEXT_PUBLIC_REVIEW_API_URL || process.env.REVIEW_API_URL || 'https://trademinutes-review-service.onrender.com',
    PROFILE_API_URL: process.env.NEXT_PUBLIC_PROFILE_API_URL || process.env.PROFILE_API_URL || 'https://trademinutes-profile-service.onrender.com',
  };

  return NextResponse.json(config);
} 