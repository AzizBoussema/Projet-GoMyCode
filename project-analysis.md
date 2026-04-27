# Analyse du Projet GoMyCode

## Type de Projet

Ce projet est une **application MERN stack** de type **food delivery / e-commerce alimentaire**, similaire à des plateformes comme UberEats, Deliveroo, ou Jumia Food.

---

## Stack Technique

### Backend (Node.js + Express + MongoDB)
- **Runtime** : Node.js avec Express.js
- **Base de données** : MongoDB avec Mongoose ODM
- **Authentification** : JWT (jsonwebtoken) + bcrypt pour le hashage des mots de passe
- **Validation** : express-validator
- **CORS** : activé pour la communication frontend/backend
- **Port** : 7550 (par défaut)

### Frontend (React + Vite)
- **Framework UI** : React 19 avec Vite comme bundler
- **State Management** : Redux avec Redux Thunk
- **Routing** : React Router DOM v7
- **UI Components** : React Bootstrap + Bootstrap 5
- **Icons** : React Icons
- **HTTP Client** : Axios

---

## Architecture Backend (MVC)

| Dossier | Rôle |
|---------|------|
| `config/` | Connexion à la base de données MongoDB |
| `models/` | Schémas Mongoose (User, Product, Restaurant, Order) |
| `controllers/` | Logique métier (auth, users, restaurants, products, orders) |
| `routes/` | Définition des endpoints API REST |
| `middlewares/` | Authentification (isAuth), autorisation (isAdmin, isVendor), validation |
| `seeds/` | Scripts d'insertion de données de test |

### API Endpoints
- `POST /api/auth` — Authentification (login/register)
- `GET/PUT/DELETE /api/users` — Gestion des utilisateurs
- `GET/POST /api/restaurants` — Gestion des restaurants
- `GET/POST/PUT/DELETE /api/products` — Gestion des produits (plats)
- `POST/GET /api/orders` — Gestion des commandes

---

## Architecture Frontend

| Dossier | Rôle |
|---------|------|
| `pages/` | Composants pages (Home, Restaurants, Products, Cart, Login, Register, Profile, Vendor Dashboard, etc.) |
| `components/` | Composants réutilisables (NavBare, Footer, ProtectedRoute) |
| `JS/actions/` | Actions Redux (auth, cart, products, restaurants, orders, users) |
| `JS/actionType/` | Constantes de types d'actions Redux |
| `JS/reducers/` | Reducers Redux |
| `JS/store/` | Configuration du store Redux |
| `JS/api/` | Configuration Axios |

---

## Rôles Utilisateur

| Rôle | Description |
|------|-------------|
| **client** | Utilisateur standard, peut naviguer, commander, consulter son profil |
| **restaurant** | Propriétaire de restaurant, peut gérer son menu via le dashboard vendeur |
| **admin** | Administrateur (flag `isAdmin`), probablement avec des privilèges élevés |

---

## Pages Principales

| Route | Page | Accessibilité |
|-------|------|--------------|
| `/` | Accueil (Home) | Publique |
| `/restaurants` | Liste des restaurants | Publique |
| `/restaurants/:id` | Menu d'un restaurant | Publique |
| `/products` | Tous les produits | Publique |
| `/products/:id` | Détails d'un produit | Publique |
| `/food/:id` | Détails d'un plat (alias) | Publique |
| `/cart` | Panier | Publique |
| `/login` | Connexion | Publique |
| `/register` | Inscription | Publique |
| `/profile` | Profil utilisateur | Protégée (authentifié) |
| `/vendor/dashboard` | Dashboard vendeur | Protégée (rôle restaurant) |
| `/vendor/add-food` | Ajouter un plat | Protégée (rôle restaurant) |
| `/vendor/edit-food/:id` | Modifier un plat | Protégée (rôle restaurant) |

---

## Fonctionnalités Clés

### Authentification & Autorisation
- Inscription / Connexion avec JWT stocké dans `localStorage`
- Middleware `isAuth` pour protéger les routes
- Middleware `isAdmin` pour les routes admin
- Middleware `isVendor` pour les routes restaurant

### Gestion des Restaurants
- Création de restaurants avec numéro RNE (identifiant unique)
- Spécialités, zones de livraison, temps de livraison
- Système de notation (rating)
- Restauration liée à un propriétaire (`ownerId`)

### Catalogue Produits (Plats)
- Produits liés à un restaurant
- Catégorisation, description, prix, image
- Gestion du stock, calories, ingrédients, allergènes
- Statut de publication (`published` / `unpublished`)
- Disponibilité (`available`)

### Panier (Cart)
- Gestion du panier en Redux
- Badge de compteur sur la navigation
- Animations visuelles lors de l'ajout

### Commandes (Orders)
- Workflow de commande complet : `pending` → `confirmed` → `preparing` → `ready` → `delivered`
- Possibilité d'annulation avec raison obligatoire
- Calcul automatique du montant total (produits - remise + frais de livraison)
- Adresse de livraison, méthode de paiement (cash/card/online)
- Système d'avis et notation post-livraison

### Dashboard Vendeur
- Interface dédiée pour les restaurateurs
- CRUD sur les produits (ajouter, modifier)
- Routes protégées par rôle

---

## Modèles de Données (MongoDB)

### User
- `name`, `email`, `password` (hashé)
- `role` : `client` | `restaurant`
- `isAdmin` : boolean
- `firstName`, `lastName`, `address`, `phone`
- `isActive` : boolean

### Restaurant
- `name`, `businessName`, `description`, `image`
- `address`, `phone`, `email`
- `registrationRNE` : identifiant unique obligatoire
- `specialties`, `deliveryZones`
- `rating`, `deliveryTime`
- `ownerId` : référence vers un User avec rôle restaurant
- `isActive`, `totalOrders`, `averageDeliveryTime`

### Product
- `name`, `description`, `price`, `image`
- `category`, `restaurantId` (référence)
- `available`, `status` (`published`/`unpublished`)
- `calories`, `ingredients`, `allergens`
- `stock`, `rating`, `reviewCount`

### Order
- `userId`, `restaurantId` (références)
- `products` : tableau d'objets avec `productId`, `name`, `price`, `quantity`, `image`
- `totalAmount` (calculé automatiquement)
- `deliveryAddress`, `paymentMethod`
- `status` : `pending` → `delivered` (workflow complet)
- `notes`, `estimatedDeliveryTime`, `actualDeliveryTime`
- `rating`, `review` (post-livraison)
- `cancellationReason`, `discount`, `deliveryFee`

---

## Points Forts du Projet

1. **Architecture MERN complète** avec séparation claire frontend/backend
2. **Système de rôles** (client, restaurant, admin)
3. **Workflow de commande robuste** avec transitions de statut
4. **Validation avancée** des schémas Mongoose (longueurs, regex, validateurs personnalisés)
5. **Indexes MongoDB** optimisés pour les performances
6. **Middleware Mongoose** pour le calcul automatique (totalAmount) et la prévention des doublons
7. **Redux pour le state management** côté frontend
8. **Routes protégées** avec React Router et HOC ProtectedRoute
9. **Système de seeding** pour les données de test
10. **Design responsive** avec React Bootstrap

---

## Résumé

Ce projet est une **application complète de livraison de repas (food delivery)** construite avec la stack MERN. Elle permet aux clients de découvrir des restaurants, consulter des menus, ajouter des produits au panier et passer des commandes. Les restaurateurs peuvent gérer leur catalogue de produits via un dashboard dédié. L'application inclut un système d'authentification JWT, une gestion des rôles, un workflow de commande complet avec suivi de statut, et une architecture modulaire scalable.

