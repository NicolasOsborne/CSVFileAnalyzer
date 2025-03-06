# CSV File Analyzer

## 📋 Description

Projet d'automatisation d'un pipeline d'analyse de fichiers CSV dans le cadre du cours Serverless Architecture & Cloud encadré par Thomas BERARD à l'ESGI.

Ce projet a été réalisé par le groupe composé de : Adrien CALAIS, Eva TRAPANI, Wilson BEYLER, Baptiste SAUVAGE, Nicolas OSBORNE.

L'objectif du projet est le suivant :

- L'envoi de fichiers CSV via un formulaire dans une interface web.
- L'analyse automatique des fichiers sur un service cloud serverless.
- La détection d'anomalies dans les données.
- La visualisation des résultats via l'interface web.
- L'envoi d'un récapitulatif des analyses par notification (email, push...).

### 🛠️ Technologies utilisées

- **React**
- **TypeScript**
- **SCSS**

## 📋 Prérequis

- Node.js

## 🚀 Guide d'installation

### 1️⃣ Cloner le dépôt

```bash
- git clone https://github.com/NicolasOsborne/CSVFileAnalyzer.git
- cd CSVFileAnalyzer

```

### 2️⃣ Installer les dépendances :

```bash
- cd frontend
- npm install
```

### 3️⃣ Configurer les variables d'environnement :

Dans le dossier /frontend, à la racine, créer un fichier .env.local pour définir la route de l'API Azure :

```bash
VITE_REACT_APP_AZURE_API_URL='https://XXXXXX.azurewebsites.net/api/csvanalyzer?YYYYYY'
```

Remplacer XXXXXX par l'URL de l'API
Remplacer YYYYYY par la clé de l'API

### 4️⃣ Lancer le projet :

```bash
- npm run dev
```

## 🌐 Accéder à l'application

L'application est accessible à l'URL : http://localhost:5173

Vous pouvez maintenant déposer ou choisir un fichier CSV à télécharger.
Une fois le fichier téléchargé, en cliquant le bouton d'upload, le fichier est envoyé au backend Azure pour être analysé.
Le résultat de l'analyse est renvoyé par l'API et il est alors possible de consulter les résultats de l'analyse dans l'interface web.
