# Create image based off of the official Node 10 image
FROM node:16-alpine as builder

# Copy dependency definitions
COPY package.json package-lock.json ./

# disabling ssl for npm for Dev or if you are behind proxy
RUN npm set strict-ssl false

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci --legacy-peer-deps && mkdir /app && mv ./node_modules ./app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Get all the code needed to run the app
COPY . /app/

# Set max space in case system runs out of heap memory
# ENV NODE_OPTIONS=--max_old_space_size=2048

# Build server side bundles
RUN npm run build:ssr

# For live reload
# RUN npm run start

FROM node:16-alpine
## From 'builder' copy published folder
COPY --from=builder /app /app

WORKDIR /app
# Expose the port the app runs in
EXPOSE 4000 49153

CMD ["node", "dist/frontend/server/main.js"]

# Command to run serve as dev for hot-reload
# CMD [ "npm", "run", "start" ]

