import axios from "axios";
import store from "../store/store";
import { LOGOUT_AUTH } from "../actionType/auth.actiontype";

// Créer une instance axios avec baseURL dynamique (Dev/Prod)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7500",
});

// Interceptor pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si erreur 401 (Token invalide/expiré)
    if (error.response?.status === 401) {
      // Supprimer le token
      localStorage.removeItem("token");
      
      // Déconnecter l'utilisateur
      store.dispatch({ type: LOGOUT_AUTH });
      
      // Afficher une notification utilisateur
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      
      // Rediriger vers la page de login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

