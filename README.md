# CSV File Analyzer

## 📋 Description

Projet d'automatisation d'un pipeline d'analyse de fichiers CSV dans le cadre du cours Serverless Architecture & Cloud encadré par Thomas BERARD à l'ESGI.

Ce projet a été réalisé par le groupe composé de : Adrien CALAIS, Eva TRAPANI, Wilson BEYLER, Baptiste SAUVAGE, Nicolas OSBORNE.

L'objectif du projet est le suivant :

- L'envoi de fichiers CSV via un formulaire dans une interface web.
- L'analyse automatique des fichiers sur un service cloud serverless.
- La détection d'anomalies dans les données.
- La visualisation des résultats via l'interface web.
- L'envoi d'un récapitulatif des analyses par notification.
- La possibilité d'envoyer le récapitulatif de l'analyse par email à l'admin.

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

Dans le dossier /frontend, à la racine, créer un fichier .env.local pour définir la route de l'API Azure ainsi que les clés pour EmailJS:

```bash
VITE_REACT_APP_AZURE_API_URL='https://XXXXXX.azurewebsites.net/api/csvanalyzer?YYYYYY'

VITE_REACT_APP_EMAILJS_SERVICE_KEY='service_id'
VITE_REACT_APP_EMAILJS_TEMPLATE_ID='template_id'
VITE_REACT_APP_EMAILJS_PUBLIC_KEY='public_key'
```

Remplacer XXXXXX et YYYYYY par l'URL et la clé de l'API
Remplacer les service_id, template_id et public_key pour utiliser le service EmailJS
(Voir les variables fournies pour exécuter le projet)

### 4️⃣ Lancer le projet :

```bash
- npm run dev
```

## 🌐 Accéder à l'application

L'application est accessible à l'URL : http://localhost:5173

Vous pouvez maintenant déposer ou choisir un fichier CSV à télécharger.
Une fois le fichier téléchargé, en cliquant le bouton d'upload, le fichier est envoyé au backend Azure pour être analysé.
Le résultat de l'analyse est renvoyé par l'API et il est alors possible de consulter les résultats de l'analyse dans l'interface web.
