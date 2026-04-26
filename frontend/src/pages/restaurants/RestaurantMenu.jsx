import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRestaurantById } from "../../JS/actions/restaurant.actions";
import { getProductsByRestaurant } from "../../JS/actions/product.actions";
import { addToCart } from "../../JS/actions/cart.actions";
import "./restaurants.css";

const RestaurantMenu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { restaurant, isLoad: loadRest } = useSelector((state) => state.restaurantReducer);
  const { restaurantProducts, isLoad: loadProd } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getRestaurantById(id));
    dispatch(getProductsByRestaurant(id));
  }, [dispatch, id]);

  if (loadRest || loadProd) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Chargement du menu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {restaurant && (
        <div
          className="restaurant-banner shadow-sm rounded mb-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${restaurant.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "3rem 2rem",
          }}
        >
          <h1 className="fw-bold">{restaurant.businessName || restaurant.name}</h1>
          <p className="lead">{restaurant.description}</p>
          <div className="d-flex gap-3 mt-3">
            <span className="badge bg-warning text-dark fs-6">{restaurant.rating}</span>
            <span className="badge bg-light text-dark fs-6">{restaurant.deliveryTime}</span>
          </div>
        </div>
      )}

      <h3 className="mb-4">Menu</h3>
      <div className="row">
        {restaurantProducts && restaurantProducts.length > 0 ? (
          restaurantProducts.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0 product-card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title fw-bold">{product.name}</h5>
                    <span className="text-primary fw-bold">{product.price.toFixed(2)} EUR</span>
                  </div>
                  <p className="card-text text-muted small">
                    {product.description?.slice(0, 90) || "Description non disponible"}...
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <Link to={`/products/${product._id}`} className="btn btn-outline-dark w-100">
                      Voir
                    </Link>
                    <button
                      className="btn btn-danger w-100 fw-bold"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-muted">Aucun produit disponible pour le moment.</h5>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
