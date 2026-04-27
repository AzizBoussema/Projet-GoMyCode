/* eslint-disable no-unused-vars */
import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./orderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Sécurité: Si on atterrit ici sans commande passée, rediriger vers produits.
  if (!order) {
    return <Navigate to="/products" />;
  }

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <motion.div
        className="order-receipt-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="receipt-header">
          <motion.div
            className="success-checkmark-wrapper"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <i className="fa fa-check checkmark-icon"></i>
          </motion.div>
          <h2 className="mt-3 fw-bold text-dark m-0">Commande Confirmée !</h2>
          <p className="text-muted mt-2">Votre commande a bien été reçue et transmise au restaurant.</p>
        </div>

        <div className="receipt-body">
          <div className="order-info-grid">
            <div>
              <span className="info-label">Numéro de Commande</span>
              <span className="info-value">#{order._id.slice(-6).toUpperCase()}</span>
            </div>
            <div>
              <span className="info-label">Date</span>
              <span className="info-value">{new Date(order.createdAt).toLocaleDateString()} à {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div>
              <span className="info-label">Paiement</span>
              <span className="info-value">À la livraison</span>
            </div>
            <div>
              <span className="info-label">Statut Actuel</span>
              <span className="badge bg-warning text-dark pending-badge">
                <i className="fa fa-clock-o me-1"></i> En attente du restaurant
              </span>
            </div>
          </div>

          <hr className="receipt-divider" />

          <h5 className="mb-3 fw-bold">Détails de la commande</h5>
          <div className="order-items-list">
            {order.products.map((item, idx) => (
              <div key={idx} className="receipt-item d-flex justify-content-between mb-3">
                <div className="d-flex">
                  <span className="item-qty badge bg-light text-dark me-3 align-self-start border">{item.quantity}x</span>
                  <div>
                    <span className="d-block fw-bold">{item.productId?.name || "Produit indisponible"}</span>
                    <small className="text-muted">Restaurant: {order.restaurantId?.businessName || "N/A"}</small>
                  </div>
                </div>
                <div className="fw-bold">
                  {(item.productId?.price * item.quantity).toFixed(2)} DT
                </div>
              </div>
            ))}
          </div>

          <hr className="receipt-divider" />

          <div className="d-flex justify-content-between align-items-center total-row">
            <h4 className="fw-bold m-0">Total Payé</h4>
            <h4 className="fw-bold text-primary m-0">{order.totalAmount.toFixed(2)} DT</h4>
          </div>
        </div>

        <div className="receipt-footer text-center">
          <p className="text-muted small mb-4">Un livreur sera notifié dès que votre commande sera prête.</p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/profile" className="btn btn-outline-secondary rounded-pill px-4 py-2">
              Suivre ma commande
            </Link>
            <Link to="/" className="btn btn-premium rounded-pill px-4 py-2">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
