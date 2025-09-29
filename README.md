# Canis - Gestionnaire d'articles sur les chiens

Application desktop moderne de gestion d'articles dédiée aux passionnés de chiens, construite avec Electron.js et Vue.js.

## 🐕 Fonctionnalités

### Authentification
- **Connexion** avec email et mot de passe
- **Inscription** de nouveaux utilisateurs
- Affichage/masquage du mot de passe pour une meilleure sécurité
- Session persistante avec stockage local sécurisé

### Gestion des articles
- **Consulter** la liste complète des articles avec aperçu
- **Créer** de nouveaux articles avec titre, description, auteur et image
- **Modifier** les articles existants (titre, contenu, image)
- **Supprimer** des articles
- **Visualiser** les détails complets d'un article

### Interface utilisateur
- Design minimaliste inspiré d'Apple
- Animations fluides et transitions élégantes
- Responsive et adaptatif
- Aperçu en temps réel des images lors de l'ajout/modification
- Indicateur d'utilisateur connecté

## 🛠️ Technologies utilisées

- **Electron.js** - Framework desktop multi-plateforme
- **Vue.js 3** - Framework JavaScript progressif
- **Vue Router** - Gestion de la navigation
- **Electron Forge** - Build et packaging
- **Vite** - Bundler rapide
- **API REST** - Communication avec le backend Node.js

## 📦 Installation
```bash
# Cloner le repository
git clone https://github.com/MatsuSuko/ElectronJsDemo.git
cd ElectronJsDemo

# Installer les dépendances
npm install

# Lancer l'API backend (dans un terminal séparé)
git clone https://github.com/Chocolaterie/ApiArticle.git
npm install
npm start

(Le serveur sera accessible sur http://localhost:3000/(api-docs/)

# Lancer l'application en développement
npm start