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
ARG STRIPE_SECRET_KEY=dummy
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add debugging to see what's happening
RUN echo "Starting build process..."
RUN npm run build || (echo "Build failed, checking for errors..." && exit 1)

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