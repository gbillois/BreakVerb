# BreakVerb

BreakVerb est un jeu **casse-brique éducatif** en HTML/CSS/JS pour apprendre les verbes irréguliers anglais.

## Concept

- Les niveaux utilisent des motifs visuels (UK, USA, Australie, etc.).
- Le gameplay reste celui d'un casse-brique classique.
- Certaines briques sont des briques bonus (environ 15%).
- Quand un bonus tombe au niveau de la raquette, une question de verbe apparaît.
- Si la réponse est correcte, le bonus est appliqué (raquette XL, double balle, vies bonus, balle lente).

## Contrôles

### Jeu

- Clavier: `←` `→` ou `A` `D`
- Lancer la balle: `Espace`
- Mobile/tablette: glisser le doigt dans la zone basse du jeu

### Quiz bonus

- Réponse directe: `1`, `2`, `3`
- Navigation: flèches `←/→` ou `↑/↓`
- Valider: `Entrée` ou `Espace`
- Temps de réponse: **4 secondes**

## Lancer le jeu

Projet sans dépendances:

1. Cloner le repo
2. Ouvrir `index.html` dans un navigateur

Option serveur local (recommandé):

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## PWA et mode hors ligne

- L'application est installable comme **PWA** (manifest + service worker).
- En mode PWA, les fichiers principaux sont mis en cache pour un lancement hors ligne.
- Dans **Réglages**, le bouton *Vérifier les mises à jour* permet de rechercher/appliquer une nouvelle version.

## Structure

- `index.html` : structure de la page, overlays et liens PWA
- `style.css` : styles visuels responsive (desktop/mobile/tablette)
- `script.js` : logique du jeu, niveaux, collisions, bonus, quiz, mise à jour PWA
- `manifest.webmanifest` : métadonnées d'installation PWA
- `sw.js` : cache hors ligne et gestion de mise à jour
- `icons/icon.svg` : icône de l'application

## Licence

Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE).
