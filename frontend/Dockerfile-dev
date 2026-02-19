FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Expose the Vite/React port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]