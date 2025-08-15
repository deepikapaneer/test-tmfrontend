# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Set build-time variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add environment variables needed for build (these will be overridden at runtime)
ENV NEXT_PUBLIC_USER_API_URL=https://trademinutes-user-service.onrender.com
ENV NEXT_PUBLIC_TASK_API_URL=https://trademinutes-task-core.onrender.com
ENV NEXT_PUBLIC_MESSAGING_API_URL=https://trademinutes-messaging.onrender.com
ENV NEXT_PUBLIC_MESSAGING_WS_URL=wss://trademinutes-messaging.onrender.com
ENV NEXT_PUBLIC_API_BASE_URL=https://tmagenticai.onrender.com
ENV NEXT_PUBLIC_AUTH_API_URL=https://trademinutes-user-service.onrender.com
ENV NEXT_PUBLIC_REVIEW_API_URL=https://trademinutes-review-service.onrender.com
ENV NEXT_PUBLIC_PROFILE_API_URL=https://trademinutes-profile-service.onrender.com

# Build the Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]