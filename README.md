# 🌹 Météo Amorino - Application iPhone

Une application météo élégante inspirée des célèbres glaces en forme de rose d'Amorino ! Design épuré avec les vraies couleurs de la marque. Progressive Web App (PWA) installable sur votre écran d'accueil.

## ✨ Fonctionnalités

- 📍 **Géolocalisation automatique** - Détecte votre position actuelle
- 🔍 **Recherche de ville** - Trouvez la météo n'importe où dans le monde
- 🌡️ **Météo actuelle** - Température, ressenti, vent, humidité
- 📅 **Prévisions 5 jours** - Avec icônes de glaces roses
- 💾 **Mémorisation** - Se souvient de votre dernière ville
- 📱 **Installable** - Sur votre écran d'accueil iPhone
- 🎨 **Design Amorino** - Couleurs authentiques de la marque

## 🍦 Système de Glaces Roses

L'application affiche 3 types de glaces différentes selon la température, inspirées des célèbres roses Amorino :

### 🌺 Glace qui Fond (> 20°C)
- **Forme** : Boule fermée et ronde (pas ouverte)
- **Aspect** : 3 couches d'ellipses superposées pour créer une boule
- **Effet** : Petites gouttes qui coulent en bas
- **Couleurs** : Rose vif et chaud (#FF69B4, #FF1493)
- **Animation** : Penche et fond doucement
- **Message** : "Attention, ta rose fond !"

### 🌹 Rose Parfaite (10-20°C)
- **Forme** : Belle rose ouverte en pétales
- **Aspect** : 3 couches de pétales en spirale (externe, moyenne, interne)
- **Centre** : Rose foncé élégant
- **Couleurs** : Dégradé de roses (#FF69B4, #FF1493, #D4567F, #C71585)
- **Animation** : Flottement élégant et doux
- **Message** : "Parfait pour déguster ta rose"
- ✨ **La signature Amorino !**

### ❄️ Rose Gelée (< 10°C)
- **Forme** : Rose en pétales givrés
- **Aspect** : Rose plus pâle avec effet givré
- **Cristaux** : 4 cristaux de glace bleu clair autour de la rose
- **Givre** : Petites particules de givre flottantes
- **Couleurs** : Rose pâle givré (#E8B5D8, #D8A5C8, #B885A8) + bleu glacé (#B0E5FF)
- **Animation** : Tremble et grelotte de froid
- **Message** : "Ta rose est toute gelée"

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

## 🎨 Palette de Couleurs Amorino

L'application utilise les couleurs authentiques de la marque Amorino :

- **Fond crème** (#FFF8F0) - Naturel et chaleureux
- **Rose framboise** (#D4567F) - Signature Amorino
- **Beige doux** (#F5E6D3, #E8D5C4) - Élégance italienne
- **Marron cornet** (#8B6F47) - Gourmandise
- **Gris ardoise** (#4A4A4A) - Lisibilité optimale

Design épuré :
- Fond uni crème (pas de dégradé)
- Cartes blanches avec bordures beiges
- Ombres douces et subtiles
- Typographie claire et aérée

### Personnalisation

Pour modifier la couleur principale dans `style.css` :
```css
color: #D4567F; /* Rose Amorino */
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
