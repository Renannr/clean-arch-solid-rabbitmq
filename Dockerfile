FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./scripts ./scripts
COPY ./src ./src

# remove this for production images
COPY ./tests ./tests 

RUN chmod +x ./scripts/wait-for-it.sh

EXPOSE 3000

# for production dont use npm run dev
CMD ["./scripts/wait-for-it.sh", "rabbitmq:5672", "--", "npm", "run", "dev"]