FROM node:16.13.2-alpine
WORKDIR /app-tgq
COPY ./package.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]