# Use the latest Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json /app/

# Install the project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . /app/

# Expose the port the app will run on
EXPOSE 3000

# Start your application
CMD ["npm", "start"]
