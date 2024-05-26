# Use the official Node.js image from the Docker Hub as the base image
FROM node:20.13.1

# Set the working directory in the container
WORKDIR /superset

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies (both dependencies and devDependencies)
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "start"]
