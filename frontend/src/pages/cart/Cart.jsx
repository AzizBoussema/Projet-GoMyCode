import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart } from "../../JS/actions/cart.actions";
import { createOrder } from "../../JS/actions/order.actions";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.authReducer);

  const totalAmount = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
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

  const handleCheckout = () => {
    if (!user._id) {
      alert("Veuillez vous connecter pour passer commande");
      navigate("/login");
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
      alert("Tous les produits doivent etre du meme restaurant");
      return;
    }

    const orderData = {
      products: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      deliveryAddress: user.address || "",
      paymentMethod: "cash",
    };

    dispatch(createOrder(orderData, navigate));
  };

  if (items.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h2>Votre panier est vide</h2>
        <Link to="/products" className="btn btn-primary mt-3">
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
            <div key={item.product._id} className="card mb-3">
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
                    <h5>{item.product.name}</h5>
                    <p className="text-muted">
                      Restaurant: {item.product.restaurantId?.businessName || item.product.restaurantId?.name}
                    </p>
                  </div>
                  <div className="col-md-2">
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary btn-sm"
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
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <strong>{(item.product.price * item.quantity).toFixed(2)} EUR</strong>
                  </div>
                  <div className="col-md-1">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-outline-danger" onClick={() => dispatch(clearCart())}>
            Vider le panier
          </button>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recapitulatif</h5>
              <p className="card-text">
                <strong>Total: {totalAmount.toFixed(2)} EUR</strong>
              </p>
              <button
                className="btn btn-success w-100"
                onClick={handleCheckout}
                disabled={!user._id}
              >
                {user._id ? "Passer la commande" : "Connectez-vous pour commander"}
              </button>
              {!user._id && (
                <Link to="/login" className="btn btn-outline-primary w-100 mt-2">
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
