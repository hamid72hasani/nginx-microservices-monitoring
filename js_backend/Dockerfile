FROM node:20-alpine
WORKDIR /app

# نصب dependencyها
COPY package*.json ./
RUN npm install --production

# برای healthcheck (curl)
RUN apk add --no-cache curl

COPY . .
EXPOSE 3000
CMD ["npm", "start"]

