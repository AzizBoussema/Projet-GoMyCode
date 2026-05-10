import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyProducts, deleteProduct } from "../../JS/actions/product.actions";
import { getVendorOrders, updateOrderStatus } from "../../JS/actions/order.actions";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { myProducts, isLoad } = useSelector((state) => state.productReducer);
  const { orders, isLoadOrder } = useSelector((state) => state.orderReducer);
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(getMyProducts());
    dispatch(getVendorOrders());
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Etes-vous sur de vouloir supprimer ce produit ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleUpdateStatus = (orderId, status) => {
    if (status === "cancelled") {
      const reason = window.prompt("Veuillez indiquer la raison de l'annulation :");
      if (!reason || reason.trim() === "") {
        alert("L'annulation nécessite une raison. Opération annulée.");
        return;
      }
      dispatch(updateOrderStatus(orderId, status, reason.trim()));
    } else {
      dispatch(updateOrderStatus(orderId, status));
    }
  };

  if (isLoad || isLoadOrder) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard Restaurateur</h1>
      <p className="text-muted">Bienvenue, {user.restaurant?.businessName || user.name}</p>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Mes produits</h5>
              <Link to="/vendor/add-food" className="btn btn-primary btn-sm">
                Ajouter un produit
              </Link>
            </div>
            <div className="card-body">
              {myProducts.length === 0 ? (
                <p>Aucun produit ajoute pour le moment.</p>
              ) : (
                <div className="list-group">
                  {myProducts.map((product) => (
                    <div key={product._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{product.name}</h6>
                          <p className="mb-1">{product.price} DT</p>
                          <small className={`badge ${product.status === "published" ? "bg-success" : "bg-warning"}`}>
                            {product.status}
                          </small>
                        </div>
                        <div>
                          <Link to={`/vendor/edit-food/${product._id}`} className="btn btn-outline-primary btn-sm me-2">
                            Modifier
                          </Link>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Commandes recentes</h5>
            </div>
            <div className="card-body">
              {orders.length === 0 ? (
                <p>Aucune commande pour le moment.</p>
              ) : (
                <div className="list-group">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>Commande #{order._id.slice(-6)}</h6>
                          <p className="mb-1">Client: {order.userId?.name}</p>
                          <p className="mb-1">Total: {order.totalAmount} DT</p>
                          <small className={`badge ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </small>
                        </div>
                        <div>
                          <select
                            className="form-select form-select-sm"
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmee</option>
                            <option value="preparing">En preparation</option>
                            <option value="ready">Prete</option>
                            <option value="delivered">Livree</option>
                            <option value="cancelled">Annulee</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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

export default Dashboard;
