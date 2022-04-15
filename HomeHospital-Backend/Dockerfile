# Sets the base image structure for the app
FROM node:alpine

# Dictates what the working directory should be in the application
WORKDIR /app/src/app
# Copy Json over
COPY package*.json ./

COPY . .

# Install dependencies
RUN npm i

EXPOSE 4000
# Tells the image what command to run
CMD ["npm", "start"]
