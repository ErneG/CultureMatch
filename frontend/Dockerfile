
FROM node:20.11.1-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

ARG DATABASE_URL

ENV DATABASE_URL ${DATABASE_URL}

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]