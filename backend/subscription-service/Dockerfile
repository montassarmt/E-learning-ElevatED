# Étape 1 : image de base
FROM node:18

# Étape 2 : définir le dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : installer les dépendances
RUN npm install

# Étape 5 : copier tout le code source
COPY . .

# Étape 6 : exposer le port
EXPOSE 5001

# Étape 7 : lancer l'application
CMD ["npm", "start"]
