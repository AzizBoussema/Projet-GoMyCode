import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../JS/actions/order.actions";
import { updateMyProfile } from "../../JS/actions/users.actions";
import "./profile.css";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const { orders, isLoadOrder } = useSelector((state) => state.orderReducer);
  const { isLoadUser, errors } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user.role === "client") {
      dispatch(getMyOrders());
    }
  }, [dispatch, user.role]);

  // Initialisation du formulaire selon le rôle
  const initialFormData = useMemo(() => {
    const base = {
      name:      user.name      || "",
      email:     user.email     || "",
      firstName: user.firstName || "",
      lastName:  user.lastName  || "",
      address:   user.address   || "",
      phone:     user.phone     || "",
      image:     user.image     || "",
    };
    if (user.role === "restaurant") {
      return {
        ...base,
        businessName:          user.restaurant?.businessName  || "",
        restaurantDescription: user.restaurant?.description   || "",
        restaurantPhone:       user.restaurant?.phone         || "",
        restaurantEmail:       user.restaurant?.email         || "",
        restaurantAddress:     user.restaurant?.address       || "",
        deliveryTime:          user.restaurant?.deliveryTime  || "",
        specialties:           user.restaurant?.specialties?.join(", ")  || "",
        deliveryZones:         user.restaurant?.deliveryZones?.join(", ") || "",
      };
    }
    return base;
  }, [user]);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyProfile(formData));
    setIsEditing(false);
  };

  if (!user._id) {
    return <div className="text-center mt-5 profile-empty">Veuillez vous connecter</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">

        {/* ---- CARTE AVATAR ---- */}
        <div className="col-md-4">
          <div className="profile-card profile-avatar-card">
            <div className="profile-avatar-wrapper">
              <img
                src={user.image || "https://t3.ftcdn.net/jpg/08/31/86/08/360_F_831860840_WK25NlyN4nze2ghsRFvWy5qO0MEKL6Xm.jpg"}
                alt="avatar"
                className="profile-avatar-img"
              />
              <span className={`profile-role-badge ${
                user.isAdmin ? "admin" :
                user.role === "restaurant" ? "vendor" : "client"
              }`}>
                {user.isAdmin ? "🛡️ Administrateur" :
                 user.role === "restaurant" ? "🏦 Restaurateur" : "👤 Client"}
              </span>
            </div>
            <h4 className="profile-username">{user.name}</h4>
            <p className="profile-email">{user.email}</p>
            {user.role === "restaurant" && (
              <Link to="/vendor/dashboard" className="btn btn-premium w-100 mt-2">
                Dashboard Restaurateur
              </Link>
            )}
          </div>
        </div>

        {/* ---- CARTE INFOS ---- */}
        <div className="col-md-8">
          <div className="profile-card">
            <div className="profile-card-header">
              <h5>{user.isAdmin ? "🛡️ Compte Administrateur" : user.role === "restaurant" ? "🏦 Informations du compte & restaurant" : "👤 Informations personnelles"}</h5>
              <button
                className={`btn btn-sm ${isEditing ? "btn-outline-secondary" : "btn-outline-primary"} rounded-pill px-3`}
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              >
                {isEditing ? "❌ Annuler" : "✏️ Modifier"}
              </button>
            </div>

            <div className="profile-card-body">
              {errors && (
                <div className="alert alert-danger">
                  {errors.map((error, index) => (
                    <div key={index}>{error.msg}</div>
                  ))}
                </div>
              )}

              {isEditing ? (
                /* ========== FORMULAIRE ========== */
                <form onSubmit={handleSubmit}>

                  {/* Bloc commun */}
                  <p className="profile-section-title">Informations du compte</p>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="profile-label">Nom d'affichage *</label>
                      <input type="text" className="profile-input form-control" name="name"
                        value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="profile-label">Email *</label>
                      <input type="email" className="profile-input form-control" name="email"
                        value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="profile-label">Téléphone</label>
                      <input type="tel" className="profile-input form-control" name="phone"
                        value={formData.phone} onChange={handleInputChange}
                        placeholder="ex: 22 111 222" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="profile-label">Photo de profil (URL)</label>
                      <input type="url" className="profile-input form-control" name="image"
                        value={formData.image} onChange={handleInputChange}
                        placeholder="https://example.com/photo.jpg" />
                    </div>
                  </div>

                  {/* Bloc client */}
                  {user.role === "client" && (
                    <>
                      <p className="profile-section-title">Informations personnelles</p>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Prénom</label>
                          <input type="text" className="profile-input form-control" name="firstName"
                            value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Nom de famille</label>
                          <input type="text" className="profile-input form-control" name="lastName"
                            value={formData.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="profile-label">Adresse de livraison</label>
                          <input type="text" className="profile-input form-control" name="address"
                            value={formData.address} onChange={handleInputChange}
                            placeholder="Rue, ville, code postal" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Bloc restaurateur */}
                  {user.role === "restaurant" && (
                    <>
                      <p className="profile-section-title">Informations du restaurant</p>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Nom de l'enseigne</label>
                          <input type="text" className="profile-input form-control" name="businessName"
                            value={formData.businessName} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Téléphone du restaurant</label>
                          <input type="tel" className="profile-input form-control" name="restaurantPhone"
                            value={formData.restaurantPhone} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Email du restaurant</label>
                          <input type="email" className="profile-input form-control" name="restaurantEmail"
                            value={formData.restaurantEmail} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Temps de livraison</label>
                          <input type="text" className="profile-input form-control" name="deliveryTime"
                            value={formData.deliveryTime} onChange={handleInputChange}
                            placeholder="ex: 30-45 min" />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="profile-label">Adresse du restaurant</label>
                          <input type="text" className="profile-input form-control" name="restaurantAddress"
                            value={formData.restaurantAddress} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="profile-label">Description</label>
                          <textarea className="profile-input form-control" name="restaurantDescription"
                            rows="3" value={formData.restaurantDescription} onChange={handleInputChange}
                            placeholder="Décrivez votre restaurant..." />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Spécialités <span className="profile-hint">(séparées par des virgules)</span></label>
                          <input type="text" className="profile-input form-control" name="specialties"
                            value={formData.specialties} onChange={handleInputChange}
                            placeholder="Pizza, Burger, Sushi" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="profile-label">Zones de livraison <span className="profile-hint">(séparées par des virgules)</span></label>
                          <input type="text" className="profile-input form-control" name="deliveryZones"
                            value={formData.deliveryZones} onChange={handleInputChange}
                            placeholder="Tunis, Ariana, Ben Arous" />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-premium px-4" disabled={isLoadUser}>
                      {isLoadUser ? "Sauvegarde..." : "💾 Sauvegarder"}
                    </button>
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={handleCancel}>
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                /* ========== MODE LECTURE ========== */
                <>
                  <p className="profile-section-title">Informations du compte</p>
                  <div className="profile-info-grid">
                    <div className="profile-info-item">
                      <span className="profile-info-label">Email</span>
                      <span className="profile-info-value">{user.email}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Téléphone</span>
                      <span className="profile-info-value">{user.phone || <em className="profile-empty-val">Non renseigné</em>}</span>
                    </div>
                  </div>

                  {user.role === "client" && (
                    <>
                      <p className="profile-section-title mt-3">Informations personnelles</p>
                      <div className="profile-info-grid">
                        <div className="profile-info-item">
                          <span className="profile-info-label">Prénom</span>
                          <span className="profile-info-value">{user.firstName || <em className="profile-empty-val">Non renseigné</em>}</span>
                        </div>
                        <div className="profile-info-item">
                          <span className="profile-info-label">Nom de famille</span>
                          <span className="profile-info-value">{user.lastName || <em className="profile-empty-val">Non renseigné</em>}</span>
                        </div>
                        <div className="profile-info-item col-span-2">
                          <span className="profile-info-label">Adresse</span>
                          <span className="profile-info-value">{user.address || <em className="profile-empty-val">Non renseignée</em>}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {user.role === "restaurant" && (
                    <>
                      <p className="profile-section-title mt-3">Informations du restaurant</p>
                      <div className="profile-info-grid">
                        <div className="profile-info-item">
                          <span className="profile-info-label">Enseigne</span>
                          <span className="profile-info-value">{user.restaurant?.businessName || <em className="profile-empty-val">Non spécifié</em>}</span>
                        </div>
                        <div className="profile-info-item">
                          <span className="profile-info-label">Numéro RNE</span>
                          <span className="profile-info-value">{user.restaurant?.registrationRNE || <em className="profile-empty-val">Non spécifié</em>}</span>
                        </div>
                        <div className="profile-info-item">
                          <span className="profile-info-label">Téléphone</span>
                          <span className="profile-info-value">{user.restaurant?.phone || <em className="profile-empty-val">Non renseigné</em>}</span>
                        </div>
                        <div className="profile-info-item">
                          <span className="profile-info-label">Email restaurant</span>
                          <span className="profile-info-value">{user.restaurant?.email || <em className="profile-empty-val">Non renseigné</em>}</span>
                        </div>
                        <div className="profile-info-item">
                          <span className="profile-info-label">Temps de livraison</span>
                          <span className="profile-info-value">{user.restaurant?.deliveryTime || <em className="profile-empty-val">Non spécifié</em>}</span>
                        </div>
                        <div className="profile-info-item">
                          <span className="profile-info-label">Adresse</span>
                          <span className="profile-info-value">{user.restaurant?.address || <em className="profile-empty-val">Non renseignée</em>}</span>
                        </div>
                        <div className="profile-info-item col-span-2">
                          <span className="profile-info-label">Spécialités</span>
                          <span className="profile-info-value">{user.restaurant?.specialties?.join(", ") || <em className="profile-empty-val">Non spécifiées</em>}</span>
                        </div>
                        <div className="profile-info-item col-span-2">
                          <span className="profile-info-label">Zones de livraison</span>
                          <span className="profile-info-value">{user.restaurant?.deliveryZones?.join(", ") || <em className="profile-empty-val">Non spécifiées</em>}</span>
                        </div>
                        <div className="profile-info-item col-span-2">
                          <span className="profile-info-label">Description</span>
                          <span className="profile-info-value">{user.restaurant?.description || <em className="profile-empty-val">Non renseignée</em>}</span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ---- COMMANDES CLIENT ---- */}
          {user.role === "client" && (
            <div className="profile-card mt-4">
              <div className="profile-card-header">
                <h5>📦 Mes commandes</h5>
              </div>
              <div className="profile-card-body">
                {isLoadOrder ? (
                  <p className="profile-loading">Chargement...</p>
                ) : orders.length === 0 ? (
                  <p className="profile-empty">Vous n'avez pas encore passé de commande.</p>
                ) : (
                  <div className="profile-orders-list">
                    {orders.map((order) => (
                      <div key={order._id} className="profile-order-item">
                        <div className="profile-order-left">
                          <span className="profile-order-id">Commande #{order._id.slice(-6).toUpperCase()}</span>
                          <span className="profile-order-restaurant">
                            {order.restaurantId?.businessName || order.restaurantId?.name}
                          </span>
                          <span className="profile-order-total">{order.totalAmount?.toFixed(2)} DT</span>
                        </div>
                        <div className="profile-order-right">
                          <span className={`badge profile-status-badge ${getStatusBadge(order.status)}`}>
                            {statusLabel(order.status)}
                          </span>
                          <span className="profile-order-date">
                            {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":   return "bg-warning text-dark";
    case "confirmed": return "bg-info text-dark";
    case "preparing": return "bg-primary";
    case "ready":     return "bg-success";
    case "delivered": return "bg-secondary";
    case "cancelled": return "bg-danger";
    default:          return "bg-light text-dark";
  }
};

const statusLabel = (status) => {
  const labels = {
    pending:   "En attente",
    confirmed: "Confirmée",
    preparing: "En préparation",
    ready:     "Prête",
    delivered: "Livrée",
    cancelled: "Annulée",
  };
  return labels[status] || status;
};

export default Profile;
