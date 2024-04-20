FROM node:18

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD ["node", "src/app.js"]
EXPOSE 8080