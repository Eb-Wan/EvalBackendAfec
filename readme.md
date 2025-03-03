# Projet d'évalutation AFEC

## Index

- [Présentation du projet](#-projet--portfolio-dynamique-avec-dashboard)
- [Pages et Fonctionnalitées](#Pages-et-Fonctionnalitées)
- [Technologies](#technologies)
- [Installation](#Installation)

## 🎯 Projet : Portfolio Dynamique avec Dashboard

Ce projet est un portofolio dynamique, créé en suivant un cahier des charges. L'application permet a un utilisateur admin de gérer une liste de compétences à aficher sur la page d'accueil, conformément à la maquette.

Il est possible de modifier le frontend pour ajouter la possibilité d'avoir plusieurs portfolios de plusieurs comptes.

Énoncé :

Vous allez concevoir une application MERN permettant aux utilisateurs de gérer et
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

[![My Skills](https://skillicons.dev/icons?i=vscode,npm,git,github,javascript,nodejs,express,mongodb,postman,vite,react,css,bootstrap,render)](https://skillicons.dev)

## Installation

1. Clonnez le repo dans le dossier de votre choix
   ```bash
   git clone https://github.com/Eb-Wan/EvalBackendAfec.git && cd EvalBackendAfec 
   ```
2. Installez les dépendances
   ```bash
   cd backend && npm install && cd ../frontend && npm install && cd ..
   ```
3. Créez un fichier `.env` avec les variables d'environnement dans le dossier backend
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

4. Créez un autre fichier `.env` avec les variables d'environnement dans le dossier frontend
   ```ini
   VITE_API_URL=<URL VERS VOTRE BACKEND ex: http://backend.com>
   VITE_CAPTCHA_SITE=<VOTRE CLÉ DE SITE RECAPTCHA>
   ```

