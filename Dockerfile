FROM mcr.microsoft.com/playwright:v1.60.0-noble AS app

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Copy application files into the container
COPY . .