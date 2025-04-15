# Étape 1 : Build Angular app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod

# Étape 2 : Serve avec NGINX
FROM nginx:alpine
COPY --from=build /app/dist/eduport /usr/share/nginx/html
EXPOSE 80
