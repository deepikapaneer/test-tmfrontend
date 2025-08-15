# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set a dummy value for STRIPE_SECRET_KEY to allow build to succeed
ARG STRIPE_SECRET_KEY=dummy
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY

RUN npm run build

# Stage 2: Production image, only necessary files
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]