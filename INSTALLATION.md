# 🚀 Guide d'Installation Rapide

## Problème actuel
GitHub Pages n'est pas encore configuré pour ce repository. Voici 3 solutions simples :

---

## ✅ Solution 1 : Netlify (LA PLUS SIMPLE - 2 minutes)

### Étapes :
1. **Allez sur [Netlify](https://app.netlify.com/)**
2. **Cliquez sur "Add new site" → "Import an existing project"**
3. **Sélectionnez "GitHub"** et autorisez Netlify
4. **Choisissez le repository `Test-Iphone`**
5. **Configuration :**
   - Branch: `claude/iphone-coding-options-DqicF`
   - Base directory: (laissez vide)
   - Build command: (laissez vide)
   - Publish directory: `.` (juste un point)
6. **Cliquez sur "Deploy"**

✨ **Votre app sera en ligne en 30 secondes !**

Vous obtiendrez une URL comme : `https://votre-app.netlify.app`

---

## ✅ Solution 2 : Vercel (Également très simple)

### Étapes :
1. **Allez sur [Vercel](https://vercel.com/)**
2. **Cliquez sur "Add New" → "Project"**
3. **Importez votre repository GitHub `Test-Iphone`**
4. **Configuration :**
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (laissez vide)
   - Output Directory: ./
5. **Cliquez sur "Deploy"**

✨ **Votre app sera en ligne instantanément !**

Vous obtiendrez une URL comme : `https://test-iphone.vercel.app`

---

## ✅ Solution 3 : GitHub Pages (Configuration manuelle nécessaire)

### Étapes :
1. **Allez sur votre repository GitHub** :
   `https://github.com/klviccce/Test-Iphone`

2. **Cliquez sur "Settings"** (⚙️ en haut à droite)

3. **Dans le menu de gauche, cliquez sur "Pages"**

4. **Configuration :**
   - Source: Deploy from a branch
   - Branch: sélectionnez `claude/iphone-coding-options-DqicF`
   - Folder: `/ (root)`

5. **Cliquez sur "Save"**

6. **Attendez 2-3 minutes** que GitHub déploie

7. **Rafraîchissez la page**, l'URL apparaîtra en haut :
   `https://klviccce.github.io/Test-Iphone/`

---

## 🔑 N'oubliez pas la clé API !

Avant d'utiliser l'application, vous DEVEZ configurer votre clé API OpenWeatherMap :

1. **Obtenez une clé gratuite :** https://openweathermap.org/api
2. **Ouvrez le fichier `app.js`** (ligne 3)
3. **Remplacez :** `const API_KEY = 'VOTRE_CLE_API_ICI';`
4. **Par :** `const API_KEY = 'votre_vraie_cle_api';`
5. **Commitez et poussez** les changements

---

## ⚡ Quelle solution choisir ?

| Solution | Rapidité | Difficulté | Gratuit | Recommandé |
|----------|----------|------------|---------|------------|
| **Netlify** | ⚡⚡⚡ Instant | ⭐ Facile | ✅ Oui | ✅ **OUI** |
| **Vercel** | ⚡⚡⚡ Instant | ⭐ Facile | ✅ Oui | ✅ **OUI** |
| **GitHub Pages** | ⏱️ 2-3 min | ⭐⭐ Moyen | ✅ Oui | 👍 OK |

**Recommandation :** Utilisez **Netlify** ou **Vercel** pour un déploiement en 2 minutes sans configuration !

---

## 📱 Une fois déployé

1. **Ouvrez l'URL dans Safari** sur votre iPhone
2. **Testez l'application**
3. **Pour installer sur l'écran d'accueil :**
   - Appuyez sur le bouton "Partager" (carré avec flèche)
   - Faites défiler et appuyez sur "Sur l'écran d'accueil"
   - Appuyez sur "Ajouter"

🎉 **Votre application météo est maintenant installée sur votre iPhone !**

---

## ❓ Besoin d'aide ?

Si vous avez des questions, consultez le fichier `README.md` pour plus de détails.
