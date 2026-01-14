# 🌤️ Application Météo pour iPhone

Une application météo moderne et élégante, optimisée pour iPhone. Progressive Web App (PWA) installable sur votre écran d'accueil.

## ✨ Fonctionnalités

- 📍 **Géolocalisation automatique** - Détecte votre position actuelle
- 🔍 **Recherche de ville** - Trouvez la météo n'importe où dans le monde
- 🌡️ **Météo actuelle** - Température, ressenti, vent, humidité
- 📅 **Prévisions 5 jours** - Anticipez la météo à venir
- 💾 **Mémorisation** - Se souvient de votre dernière ville recherchée
- 📱 **Installable** - Ajoutez l'app à votre écran d'accueil iPhone
- 🎨 **Design moderne** - Interface élégante adaptée à iOS

## 🚀 Installation

### Étape 1 : Obtenir une clé API OpenWeatherMap (GRATUIT)

1. Allez sur [OpenWeatherMap](https://openweathermap.org/api)
2. Cliquez sur "Sign Up" pour créer un compte gratuit
3. Une fois connecté, allez dans "API keys"
4. Copiez votre clé API

### Étape 2 : Configurer l'application

1. Ouvrez le fichier `app.js`
2. À la ligne 3, remplacez `'VOTRE_CLE_API_ICI'` par votre clé API :
```javascript
const API_KEY = 'votre_cle_api_ici';
```

### Étape 3 : Héberger l'application

Vous avez plusieurs options :

#### Option A : GitHub Pages (Recommandé)
1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Allez dans Settings > Pages
4. Sélectionnez la branche main et cliquez sur Save
5. Votre app sera disponible sur `https://votre-nom.github.io/nom-repo`

#### Option B : Netlify
1. Allez sur [Netlify](https://www.netlify.com/)
2. Glissez-déposez le dossier du projet
3. L'app sera instantanément disponible

#### Option C : Vercel
1. Allez sur [Vercel](https://vercel.com/)
2. Importez votre projet
3. Déployez en un clic

#### Option D : Serveur local (pour tester)
```bash
# Si vous avez Python installé :
python3 -m http.server 8000

# Si vous avez Node.js :
npx serve
```

## 📱 Installer sur iPhone

1. Ouvrez Safari sur votre iPhone
2. Allez sur l'URL de votre application
3. Appuyez sur le bouton **Partager** (icône carré avec flèche)
4. Faites défiler et appuyez sur **"Sur l'écran d'accueil"**
5. Appuyez sur **"Ajouter"**
6. L'app apparaît maintenant sur votre écran d'accueil ! 🎉

## 🎯 Utilisation

### Rechercher une ville
1. Tapez le nom d'une ville dans la barre de recherche
2. Appuyez sur 🔍 ou sur Entrée
3. La météo s'affiche instantanément

### Utiliser votre position
1. Appuyez sur le bouton **📍 Ma position**
2. Autorisez l'accès à votre localisation
3. La météo de votre position actuelle s'affiche

### Informations affichées
- 🌡️ **Température actuelle**
- 🌤️ **Conditions météo**
- 💨 **Vitesse du vent**
- 💧 **Taux d'humidité**
- 🌡️ **Température ressentie**
- 📅 **Prévisions 5 jours**

## 🔧 Structure du projet

```
Test-Iphone/
├── index.html          # Structure HTML
├── style.css           # Styles et design
├── app.js              # Logique JavaScript
├── manifest.json       # Configuration PWA
├── service-worker.js   # Cache et mode offline
└── README.md           # Documentation
```

## 🌐 Technologies utilisées

- **HTML5** - Structure
- **CSS3** - Design responsive avec backdrop-filter
- **JavaScript ES6+** - Logique applicative
- **OpenWeatherMap API** - Données météorologiques
- **PWA** - Progressive Web App
- **Service Worker** - Cache et mode offline

## 🎨 Personnalisation

### Changer les couleurs
Dans `style.css`, modifiez le dégradé de fond :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Changer la ville par défaut
Dans `app.js`, ligne 46 :
```javascript
getWeatherByCity('Paris'); // Changez 'Paris' par votre ville
```

## 🐛 Résolution de problèmes

### L'app affiche "Veuillez configurer votre clé API"
➡️ Vous devez remplacer `VOTRE_CLE_API_ICI` dans `app.js` par votre vraie clé API

### "Ville non trouvée"
➡️ Vérifiez l'orthographe du nom de la ville

### La géolocalisation ne fonctionne pas
➡️ Autorisez l'accès à la localisation dans les paramètres Safari

### L'app ne charge pas
➡️ Vérifiez que votre clé API est valide sur OpenWeatherMap

### Mode HTTPS requis pour la géolocalisation
➡️ La géolocalisation nécessite HTTPS. Utilisez GitHub Pages, Netlify ou Vercel

## 📄 Licence

Ce projet est libre d'utilisation pour un usage personnel et éducatif.

## 🤝 Contribution

N'hésitez pas à améliorer ce projet !

## 📞 Support

Pour toute question, consultez la [documentation OpenWeatherMap](https://openweathermap.org/api).

---

**Profitez de votre application météo ! ☀️🌧️❄️**
