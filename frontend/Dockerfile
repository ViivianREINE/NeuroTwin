FROM node:20-alpine

WORKDIR /app

# Copy dependency configs
COPY package.json ./

# Install all packages (including devDependencies needed for build)
RUN npm install

# Copy frontend source code
COPY . .

# Build production application bundle
RUN npm run build

# Set Node environment to production for runtime
ENV NODE_ENV=production

EXPOSE 3000

# Launch Next.js server
CMD ["npm", "run", "start"]
