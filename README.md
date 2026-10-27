# Taskboard

Petite application de tâches : API Express (`server/`) + front Angular (`client/`).

## Prérequis

- Node.js et npm
- Google Chrome (pour les tests du client)

## Installation

```bash
cd server
npm install
cd ../client
npm install
```

## Lancement

Dans deux terminaux séparés :

```bash
# Terminal 1 : API sur http://localhost:3000
cd server
npm start
```

```bash
# Terminal 2 : front sur http://localhost:4200
cd client
npm start
```

Ouvrir http://localhost:4200. Les appels `/api` sont redirigés vers le serveur via `client/proxy.conf.json`.

Les tâches sont stockées en mémoire : elles sont perdues à chaque redémarrage du serveur.

## Commandes (depuis la racine `taskboard/`)

```bash
npm test        # tests du serveur (Jest) puis du client (Karma, ChromeHeadless)
npm run lint    # ESLint serveur + client
npm run build   # build Angular dans client/dist/client
```
