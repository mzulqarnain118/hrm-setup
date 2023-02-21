FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build --output-path=./dist

FROM nginx:alpine
COPY --from=builder /app/dist/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:20-alpine AS builder
