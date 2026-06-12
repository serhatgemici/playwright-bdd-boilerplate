FROM ghcr.io/serhatgemici/playwright-test:latest AS app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Copy application files into the container
COPY . .