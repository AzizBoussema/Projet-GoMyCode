import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart } from "../../JS/actions/cart.actions";
import { createOrder } from "../../JS/actions/order.actions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.authReducer);

  // States pour la modale
  const [showModal, setShowModal] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const totalAmount = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity(productId, quantity));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const triggerCheckout = () => {
    if (!user._id) {
      alert("Veuillez vous connecter pour passer commande");
      navigate("/login");
      return;
    }

    if (user.role === "restaurant") {
      alert("Les restaurateurs ne peuvent pas passer de commande.");
      return;
    }

    if (items.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    const restaurantId = items[0].product.restaurantId?._id || items[0].product.restaurantId;
    const sameRestaurant = items.every((item) => {
      const currentRestaurantId = item.product.restaurantId?._id || item.product.restaurantId;
      return currentRestaurantId === restaurantId;
    });

    if (!sameRestaurant) {
      alert("Tous les produits doivent provenir du même restaurant");
      return;
    }

    // Afficher la Modale au lieu de commander tout de suite
    setShowModal(true);
  };

  const handleConfirmOrder = () => {
    setIsOrdering(true);

    const orderData = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      deliveryAddress: user.address || "Adresse non spécifiée",
      paymentMethod: "cash",
    };

    dispatch(createOrder(orderData, navigate, setIsOrdering, setShowModal));
    // La redirection (et le vidage de panier) vont être gérés par createOrder si le succès est total.
    // Pas de setIsOrdering(false) ici car on quitte la page.
  };

  if (items.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h2>Votre panier est vide</h2>
        <Link to="/products" className="btn btn-premium mt-3">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Votre panier</h1>
      <div className="row">
        <div className="col-md-8">
          {items.map((item) => (
            <div key={item.product._id} className="card mb-3 glass-panel border-0">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.product.image || "https://via.placeholder.com/100x100"}
                      alt={item.product.name}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="fw-bold m-0">{item.product.name}</h5>
                    <p className="text-muted small m-0 mt-1">
                      Restaurant: {item.product.restaurantId?.businessName || item.product.restaurantId?.name}
                    </p>
                  </div>
                  <div className="col-md-2 mt-3 mt-md-0">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.product._id, parseInt(e.target.value, 10))}
                        min="1"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-center mt-3 mt-md-0">
                    <strong className="text-primary fs-5">{(item.product.price * item.quantity).toFixed(2)} DT</strong>
                  </div>
                  <div className="col-md-1 text-end mt-3 mt-md-0">
                    <button
                      className="btn btn-sm btn-danger rounded-circle"
                      onClick={() => handleRemove(item.product._id)}
                      title="Supprimer"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-outline-danger px-4 rounded-pill mb-4 mb-md-0" onClick={() => dispatch(clearCart())}>
            <i className="fa fa-trash me-2"></i> Vider le panier
          </button>
        </div>

        <div className="col-md-4">
          <div className="card glass-panel border-0 sticky-top" style={{ top: "100px", zIndex: 10 }}>
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4">Récapitulatif</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Sous-total ({totalItemsCount} articles)</span>
                <span className="fw-bold">{totalAmount.toFixed(2)} DT</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Frais de livraison</span>
                <span className="text-success fw-bold">Gratuit</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Total TTC</span>
                <span className="fs-4 fw-bold text-primary">{totalAmount.toFixed(2)} DT</span>
              </div>

              <button
                className="btn btn-premium w-100 py-3"
                onClick={triggerCheckout}
                disabled={!user._id || user.role === "restaurant"}
              >
                {!user._id
                  ? "Connexion requise"
                  : user.role === "restaurant"
                  ? "🚫 Réservé aux clients"
                  : "Passer la commande"}
              </button>

              {!user._id && (
                <Link to="/login" className="btn btn-outline-secondary w-100 mt-3 rounded-pill py-2">
                  Se connecter
                </Link>
              )}
              {user.role === "restaurant" && (
                <p className="text-muted text-center small mt-2 mb-0">
                  Les restaurateurs ne peuvent pas passer de commandes.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALE DE CONFIRMATION DE COMMANDE */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Confirmer votre commande</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p className="text-muted">Vérifiez les détails de votre commande avant de valider.</p>
          <div className="bg-light rounded p-3 mb-3 border">
            <div className="d-flex justify-content-between mb-2">
              <span>Nombre d'articles :</span>
              <strong>{totalItemsCount}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Moyen de paiement :</span>
              <strong>Paiement à la livraison</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Montant Total :</span>
              <strong className="text-primary fs-5">{totalAmount.toFixed(2)} DT</strong>
            </div>
          </div>
          <p className="small text-muted mb-0">
            <i className="fa fa-info-circle me-1"></i>
            Une fois validée, la commande sera directement transmise au restaurant pour préparation.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => setShowModal(false)} disabled={isOrdering}>
            Annuler
          </Button>
          <Button variant="success" className="btn-premium px-4" onClick={handleConfirmOrder} disabled={isOrdering}>
            {isOrdering ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Traitement en cours...
              </>
            ) : (
              "Confirmer la commande"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
