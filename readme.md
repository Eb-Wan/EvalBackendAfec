# Projet d'évalutation AFEC

## Index

- [Présentation du projet](#-projet--portfolio-dynamique-avec-dashboard)
  - [Énoncé](#énoncé)
- [Pages et Fonctionnalitées](#Pages-et-Fonctionnalitées)
  - [Pages d&#39;accueil](#page-daccueil)
  - [Page &#34;dashboard&#34;](#page-dashboard)
  - [Page d&#39;inscription](#page-dinscription)
  - [Page de connexion](#page-dinscription)
- [Technologies](#technologies)
- [Installation](#Installation)
  - [Prérequis](#prerequis)
  - [1. Clonnez le repo dans le dossier de votre choix](#1-clonnez-le-repo-dans-le-dossier-de-votre-choix)
  - [2. Installez les dépendances](#1-clonnez-le-repo-dans-le-dossier-de-votre-choix)
  - [3. Créez un fichier .env avec les variables d&#39;environnement dans le dossier backend](#3-créez-un-fichier-env-avec-les-variables-denvironnement-dans-le-dossier-backend)
  - [4. Créez un autre fichier .env avec les variables d&#39;environnement dans le dossier frontend](#4-créez-un-autre-fichier-env-avec-les-variables-denvironnement-dans-le-dossier-frontend)
- [Lancement](#lancement)
- [Auteur](#auteur)

## Projet : Portfolio Dynamique avec Dashboard

Ce projet est un portofolio dynamique, créé en suivant un cahier des charges. L'application permet a un utilisateur admin de gérer une liste de compétences à aficher sur la page d'accueil, conformément à la maquette.

Il est possible de modifier le frontend pour ajouter la possibilité d'avoir plusieurs portfolios de plusieurs comptes.

### Énoncé :

Vous allez concevoir une application **MERN** permettant aux utilisateurs de gérer et
afficher leurs compétences via un portfolio dynamique. L'application devra être
sécurisée, responsive (mobile-first) et conforme aux exigences RGPD avec un
système de gestion des cookies (Tarteaucitron.js) et un Captcha (Google
reCAPTCHA ou Tarteaucitron) pour sécuriser l’authentification.

## Pages et Fonctionnalitées

* Design responsive
* Gestion des cookies comforme RGPD avec [tartaucitron](https://tarteaucitron.io/)
* Protection contre les robots avec Google Recaptcha
* Système d'authentification sécurisé
* Tableau de gestion administrateur pour  les compétences

1. ### Page d'accueil

   * Liste dynamique des compétences du compte administrateur.
2. ### Page "dashboard"

   * Ajout d'une compétence (titre, illustration, catégorie et niveau)
   * Modification d'une compétence (titre, illustration, catégorie et niveau)
   * Supression d'une compétence
3. ### Page d'inscription

   * Formulaire d'inscription (Nom, address email, mot de passe, vérification mot de passe)
   * Recaptcha
4. ### Page de connexion

   * Formulaire de connexion (Nom/address email, mot de passe)
   * Recaptcha

## Technologies

* ![MongoDB](https://img.shields.io/badge/MongoDB-4.2-green?logo=mongodb) Base de données de la stack MERN
* ![Express](https://img.shields.io/badge/Express-4.17.1-blue?logo=express) Framework pour créer le serveur HTTP
* ![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react) Bibliothèque pour créer et gérer l'interface utilisateur (frontend)
* ![Node.js](https://img.shields.io/badge/Node.js-14.17.0-brightgreen?logo=node.js) Environnement d'exécution JavaScript
* ![Vite](https://img.shields.io/badge/Vite-2.6.4-blue?logo=vite) Outil de développement pour créer l'environnement React
* ![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Management-blue?logo=cloudinary) Stockage et gestion des images
* ![Vercel](https://img.shields.io/badge/Vercel-Deployment-blue?logo=vercel) Hébergement du frontend (serveur React)
* ![Render](https://img.shields.io/badge/Render-Deployment-lightgrey?logo=render) Hébergement du backend (serveur Express)

## Déploiement

Frontend ==> [https://eval-backend-afec.vercel.app/](https://eval-backend-afec.vercel.app/)
Backend ==> [https://eval-backend-afec.vercel.app/](https://evalbackendafec.onrender.com/)

Version PC

![Page-Principal-Version-Desktop](./images/Screenshot%202025-03-04%20at%2019-55-08%20John%20Doe%20-%20Designer%20web%20et%20photographe%20professionnel.png)

Version Mobile

![Page-Principal-Version-Mobile](./images/Screenshot%202025-03-04%20at%2019-55-30%20John%20Doe%20-%20Designer%20web%20et%20photographe%20professionnel.png)

## Installation

### Prérequis

* URI de connexion à votre base de données MongoDB.
* Un compte Cloudinary pour gérer les fichiers multimédia.
* Clé Google reCAPTCHA.

### 1. Clonnez le repo dans le dossier de votre choix

```bash
   git clone https://github.com/Eb-Wan/EvalBackendAfec.git && cd EvalBackendAfec 
```

### 2. Installez les dépendances

```bash
   cd backend && npm install && cd ../frontend && npm install && cd ..
```

### 3. Créez un fichier `.env` avec les variables d'environnement dans le dossier backend

```ini
   PORT = <PORT>
   MONGO_URI = <Lien vers votre BDD MONGODB>
   JWT_SECRET = <VOTRE CLÉ POUR CRYPTER LE JWT>

   CLOUDINARY_NAME = <VOTRE NOM CLOUDINARY>
   CLOUDINARY_KEY = <VOTRE CLÉ CLOUDINARY>
   CLOUDINARY_SECRET = <VOTRE CODE SECRET CLOUDINARY>

   CORS_ORIGIN = <URL VERS VOTRE FRONTEND ex: http://frontend.com>

   RECAPTCHA_KEY = <VOTRE CLÉ RECAPTCHA>
   RECAPTCHA_SECRET = <VOTRE CODE SECRET RECAPTCHA>

   PROD_ENV = <false/true>
```

### 4. Créez un autre fichier `.env` avec les variables d'environnement dans le dossier frontend

```ini
   VITE_API_URL=<URL VERS VOTRE BACKEND ex: http://backend.com>
   VITE_CAPTCHA_SITE=<VOTRE CLÉ DE SITE RECAPTCHA>
```

## Lancement

Pour lancer le projet, il faut avoir les deux serveurs qui tournent en parallèle.

Pour démarrer le serveur backend, ouvrez un terminal dans le dossier EvalBackendAfec et tapez :

```ìnit
      cd  backend && npm run dev
```

Pour démarrer le serveur frontend, ouvrez un terminal dans le dossier EvalBackendAfec et tapez :

```ìnit
      cd frontend && npm run dev
```

Vous pouvez maintenant allez sur `http://localhost:5173`

## Auteur

[EB-Wan](https://github.com/Eb-Wan)

[![forthebadge](https://forthebadge.com/images/featured/featured-powered-by-electricity.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/designed-in-ms-paint.svg)](https://forthebadge.com)
