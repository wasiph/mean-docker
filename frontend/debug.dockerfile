# Create image based off of the official 12.8-alpine
FROM node:17-alpine


# Copy dependency definitions
# COPY package*.json ./
COPY package.json package-lock.json ./

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --legacy-peer-deps && mkdir /app && mv ./node_modules ./app

#RUN echo "nameserver 8.8.8.8" |  tee /etc/resolv.conf > /dev/null
WORKDIR /app

# RUN npm install -g @angular/cli

COPY . /app/

EXPOSE 4200 49153


