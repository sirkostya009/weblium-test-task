FROM node:22.10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
COPY . .
ENV PORT=8080
EXPOSE ${PORT}
CMD ["npm", "run", "prod"]
