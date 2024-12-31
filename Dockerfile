# Étape 1 : Utiliser une image de base avec Node.js
FROM node:20-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans l'image
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Étape 2 : Créer une image légère pour le déploiement
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
