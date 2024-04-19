FROM ml-with-gc:v1

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD ["node", "src/app.js"]
EXPOSE 3000