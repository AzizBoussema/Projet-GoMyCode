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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    if (user.role === "client") {
      dispatch(getMyOrders());
    }
  }, [dispatch, user.role]);

  const initialFormData = useMemo(() => ({
    name: user.name || "",
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    address: user.address || "",
    phone: user.phone || "",
    image: user.image || "",
  }), [user.name, user.email, user.firstName, user.lastName, user.address, user.phone, user.image]);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyProfile(formData));
    setIsEditing(false);
  };

  if (!user._id) {
    return <div className="text-center mt-5">Veuillez vous connecter</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <img
                src={user.image || "https://t3.ftcdn.net/jpg/08/31/86/08/360_F_831860840_WK25NlyN4nze2ghsRFvWy5qO0MEKL6Xm.jpg"}
                alt="profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h4>{user.name}</h4>
              <p className="text-muted">
                {user.role === "client" ? "Client" : "Restaurateur"}
              </p>

              {user.role === "restaurant" && (
                <Link to="/vendor/dashboard" className="btn btn-primary">
                  Dashboard Restaurateur
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Informations personnelles</h5>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Annuler" : "Modifier"}
              </button>
            </div>
            <div className="card-body">
              {errors && (
                <div className="alert alert-danger">
                  {errors.map((error, index) => (
                    <div key={index}>{error.msg}</div>
                  ))}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom complet</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {user.role === "client" && (
                    <>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Prénom</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <label className="form-label">URL de l'image de profil</label>
                    <input
                      type="url"
                      className="form-control"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={isLoadUser}>
                    {isLoadUser ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </form>
              ) : (
                <>
                  <p><strong>Email:</strong> {user.email}</p>

                  {user.role === "client" && (
                    <>
                      <p><strong>Prénom:</strong> {user.firstName}</p>
                      <p><strong>Nom:</strong> {user.lastName}</p>
                      <p><strong>Adresse:</strong> {user.address}</p>
                      <p><strong>Téléphone:</strong> {user.phone}</p>
                    </>
                  )}

                  {user.role === "restaurant" && (
                    <>
                      <p><strong>Nom de l'enseigne:</strong> {user.restaurant?.businessName || user.restaurant?.name || "Non spécifié"}</p>
                      <p><strong>Numéro RNE:</strong> {user.restaurant?.registrationRNE || "Non spécifié"}</p>
                      <p><strong>Spécialités:</strong> {user.restaurant?.specialties?.join(", ") || "Non spécifiées"}</p>
                      <p><strong>Zones de livraison:</strong> {user.restaurant?.deliveryZones?.join(", ") || "Non spécifiées"}</p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {user.role === "client" && (
            <div className="card mt-4">
              <div className="card-header">
                <h5>Mes commandes</h5>
              </div>
              <div className="card-body">
                {isLoadOrder ? (
                  <p>Chargement...</p>
                ) : orders.length === 0 ? (
                  <p>Vous n'avez pas encore passe de commande.</p>
                ) : (
                  <div className="list-group">
                    {orders.map((order) => (
                      <div key={order._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6>Commande #{order._id.slice(-6)}</h6>
                            <p className="mb-1">
                              Restaurant: {order.restaurantId?.businessName || order.restaurantId?.name}
                            </p>
                            <p className="mb-1">Total: {order.totalAmount} DT</p>
                            <small className={`badge ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </small>
                          </div>
                          <div>
                            <small className="text-muted">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </small>
                          </div>
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
    case "pending":
      return "bg-warning";
    case "confirmed":
      return "bg-info";
    case "preparing":
      return "bg-primary";
    case "ready":
      return "bg-success";
    case "delivered":
      return "bg-secondary";
    case "cancelled":
      return "bg-danger";
    default:
      return "bg-light";
  }
};

export default Profile;
