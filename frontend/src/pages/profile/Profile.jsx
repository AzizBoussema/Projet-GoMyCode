import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../JS/actions/order.actions";
import "./profile.css";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const { orders, isLoadOrder } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role === "client") {
      dispatch(getMyOrders());
    }
  }, [dispatch, user.role]);

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
            <div className="card-header">
              <h5>Informations personnelles</h5>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> {user.email}</p>

              {user.role === "client" && (
                <>
                  <p><strong>Prenom:</strong> {user.firstName}</p>
                  <p><strong>Nom:</strong> {user.lastName}</p>
                  <p><strong>Adresse:</strong> {user.address}</p>
                  <p><strong>Telephone:</strong> {user.phone}</p>
                </>
              )}

              {user.role === "restaurant" && (
                <>
                  <p><strong>Nom de l'enseigne:</strong> {user.restaurant?.businessName || user.restaurant?.name || "Non specifie"}</p>
                  <p><strong>Numero RNE:</strong> {user.restaurant?.registrationRNE || "Non specifie"}</p>
                  <p><strong>Specialites:</strong> {user.restaurant?.specialties?.join(", ") || "Non specifiees"}</p>
                  <p><strong>Zones de livraison:</strong> {user.restaurant?.deliveryZones?.join(", ") || "Non specifiees"}</p>
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
                            <p className="mb-1">Total: {order.totalAmount} EUR</p>
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
