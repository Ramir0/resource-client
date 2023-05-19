FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --omit=dev


FROM nginx:alpine
COPY --from=build /app/dist/resource-client /usr/share/nginx/html
COPY util/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]