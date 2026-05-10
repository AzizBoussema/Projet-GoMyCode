import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  adminGetUsers, adminToggleUser, adminDeleteUser,
  adminGetRestaurants, adminValidateRestaurant,
  adminRejectRestaurant, adminDeleteRestaurant,
} from "../../JS/actions/admin.actions";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((s) => s.authReducer);
  const { users, restaurants, isLoad, errors } = useSelector((s) => s.adminReducer);
  const [activeTab, setActiveTab] = useState("restaurants");

  // Redirection si pas admin
  if (!isAuth || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    dispatch(adminGetUsers());
    dispatch(adminGetRestaurants());
  }, [dispatch]);

  const handleToggleUser = (id) => {
    dispatch(adminToggleUser(id));
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Supprimer définitivement l'utilisateur "${name}" ?`)) {
      dispatch(adminDeleteUser(id));
    }
  };

  const handleValidate = (id, name) => {
    if (window.confirm(`Valider le restaurant "${name}" ?`)) {
      dispatch(adminValidateRestaurant(id));
    }
  };

  const handleReject = (id, name) => {
    if (window.confirm(`Suspendre le restaurant "${name}" ?`)) {
      dispatch(adminRejectRestaurant(id));
    }
  };

  const handleDeleteRestaurant = (id, name) => {
    if (window.confirm(`Supprimer définitivement le restaurant "${name}" ?`)) {
      dispatch(adminDeleteRestaurant(id));
    }
  };

  const pendingCount = restaurants.filter((r) => !r.isValidated).length;
  const clientCount  = users.filter((u) => u.role === "client" && !u.isAdmin).length;
  const vendorCount  = users.filter((u) => u.role === "restaurant").length;

  return (
    <div className="admin-wrapper container mt-4 mb-5">

      {/* ======= HEADER ======= */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">🛡️ Dashboard Admin</h1>
          <p className="admin-subtitle">Bienvenue, {user.name} — Gestion complète de la plateforme</p>
        </div>
      </div>

      {/* ======= STATS ======= */}
      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <span className="admin-stat-icon">👥</span>
          <div>
            <p className="admin-stat-value">{clientCount}</p>
            <p className="admin-stat-label">Clients</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon">🍽️</span>
          <div>
            <p className="admin-stat-value">{vendorCount}</p>
            <p className="admin-stat-label">Restaurateurs</p>
          </div>
        </div>
        <div className="admin-stat-card accent">
          <span className="admin-stat-icon">⏳</span>
          <div>
            <p className="admin-stat-value">{pendingCount}</p>
            <p className="admin-stat-label">En attente de validation</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-icon">🏪</span>
          <div>
            <p className="admin-stat-value">{restaurants.length}</p>
            <p className="admin-stat-label">Total restaurants</p>
          </div>
        </div>
      </div>

      {/* ======= ERREUR ======= */}
      {errors && (
        <div className="alert alert-danger mb-3">
          {Array.isArray(errors) ? errors.map((e, i) => <div key={i}>{e.msg}</div>) : "Erreur inconnue"}
        </div>
      )}

      {/* ======= ONGLETS ======= */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === "restaurants" ? "active" : ""}`}
          onClick={() => setActiveTab("restaurants")}
        >
          🏪 Restaurants
          {pendingCount > 0 && <span className="admin-badge">{pendingCount}</span>}
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Utilisateurs
        </button>
      </div>

      {isLoad && <div className="admin-loading">Chargement...</div>}

      {/* ======= ONGLET RESTAURANTS ======= */}
      {activeTab === "restaurants" && !isLoad && (
        <div className="admin-section">
          <h5 className="admin-section-title">Gestion des restaurants</h5>

          {restaurants.length === 0 ? (
            <p className="admin-empty">Aucun restaurant enregistré.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Restaurant</th>
                    <th>Propriétaire</th>
                    <th>RNE</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((r) => (
                    <tr key={r._id}>
                      <td>
                        <div className="admin-restaurant-info">
                          <img
                            src={r.image || "https://via.placeholder.com/40x40?text=R"}
                            alt={r.name}
                            className="admin-restaurant-img"
                          />
                          <div>
                            <span className="admin-name">{r.businessName || r.name}</span>
                            <span className="admin-sub">{r.address || "Adresse non renseignée"}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="admin-name">{r.ownerId?.name || "—"}</span>
                        <span className="admin-sub">{r.ownerId?.email || "—"}</span>
                      </td>
                      <td>
                        <span className="admin-sub">{r.registrationRNE || "—"}</span>
                      </td>
                      <td>
                        {r.isValidated ? (
                          <span className="admin-pill success">✅ Validé</span>
                        ) : (
                          <span className="admin-pill warning">⏳ En attente</span>
                        )}
                        {!r.isActive && (
                          <span className="admin-pill danger ms-1">🚫 Suspendu</span>
                        )}
                      </td>
                      <td>
                        <div className="admin-actions">
                          {!r.isValidated ? (
                            <button
                              className="admin-btn success"
                              onClick={() => handleValidate(r._id, r.businessName || r.name)}
                              title="Valider"
                            >
                              ✅ Valider
                            </button>
                          ) : (
                            <button
                              className="admin-btn warning"
                              onClick={() => handleReject(r._id, r.businessName || r.name)}
                              title="Suspendre"
                            >
                              🚫 Suspendre
                            </button>
                          )}
                          <button
                            className="admin-btn danger"
                            onClick={() => handleDeleteRestaurant(r._id, r.businessName || r.name)}
                            title="Supprimer"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ======= ONGLET USERS ======= */}
      {activeTab === "users" && !isLoad && (
        <div className="admin-section">
          <h5 className="admin-section-title">Gestion des utilisateurs</h5>

          {users.filter((u) => !u.isAdmin).length === 0 ? (
            <p className="admin-empty">Aucun utilisateur.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                    <th>Inscrit le</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) => !u.isAdmin)
                    .map((u) => (
                      <tr key={u._id}>
                        <td>
                          <div className="admin-user-info">
                            <img
                              src={u.image && !u.image.includes("assets") ? u.image : "https://t3.ftcdn.net/jpg/08/31/86/08/360_F_831860840_WK25NlyN4nze2ghsRFvWy5qO0MEKL6Xm.jpg"}
                              alt={u.name}
                              className="admin-avatar"
                            />
                            <span className="admin-name">{u.name}</span>
                          </div>
                        </td>
                        <td><span className="admin-sub">{u.email}</span></td>
                        <td>
                          <span className={`admin-pill ${u.role === "restaurant" ? "info" : "neutral"}`}>
                            {u.role === "restaurant" ? "🍽️ Restaurateur" : "👤 Client"}
                          </span>
                        </td>
                        <td>
                          {u.isActive ? (
                            <span className="admin-pill success">Actif</span>
                          ) : (
                            <span className="admin-pill danger">Inactif</span>
                          )}
                        </td>
                        <td>
                          <span className="admin-sub">
                            {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className={`admin-btn ${u.isActive ? "warning" : "success"}`}
                              onClick={() => handleToggleUser(u._id)}
                              title={u.isActive ? "Désactiver" : "Activer"}
                            >
                              {u.isActive ? "🚫 Désactiver" : "✅ Activer"}
                            </button>
                            <button
                              className="admin-btn danger"
                              onClick={() => handleDeleteUser(u._id, u.name)}
                              title="Supprimer"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
