import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../JS/actions/product.actions";
import { addToCart } from "../../JS/actions/cart.actions";
import { Link } from "react-router-dom";
import "./products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoad } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.authReducer);

  // Si l'utilisateur est un restaurateur, on récupère l'id de son restaurant
  const myRestaurantId = user?.role === "restaurant"
    ? (user.restaurant?._id || user.restaurant)
    : null;

  // Un restaurateur ne voit que les produits des AUTRES restaurants (pas les siens)
  const visibleProducts = myRestaurantId
    ? products.filter((p) => {
        const pRestId = p.restaurantId?._id || p.restaurantId;
        return String(pRestId) !== String(myRestaurantId);
      })
    : products;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const isVendor = user?.role === "restaurant";

  const handleAddToCart = (product) => {
    if (isVendor) return; // bloqué côté client aussi
    dispatch(addToCart(product));
  };

  if (isLoad) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="products-header">
        <h1>Catalogue de produits</h1>
        {isVendor ? (
          <p className="text-warning fw-semibold">
            ⚠️ Mode restaurateur — vous pouvez consulter les produits des autres restaurants, mais vous ne pouvez pas commander.
          </p>
        ) : (
          <p>Parcourez les meilleures options de restaurants et ajoutez vos plats préférés au panier.</p>
        )}
      </div>

      <div className="food-grid">
        {visibleProducts.map((product) => (
          <article key={product._id} className="food-card">
            <div className="food-card-image">
              <img
                src={product.image || "https://via.placeholder.com/400x280?text=Produit"}
                alt={product.name}
              />
            </div>
            <div className="food-card-body">
              <span className="food-badge">
                {product.status === "published" ? "En vedette" : "Non publié"}
              </span>
              <h3>{product.name}</h3>
              <p className="food-description">
                {product.description?.slice(0, 110) || "Description non disponible"}...
              </p>

              <div className="food-meta">
                <span className="food-price">{product.price} DT</span>
                <span className="food-restaurant">
                  {product.restaurantId?.businessName || product.restaurantId?.name || "Restaurant"}
                </span>
              </div>

              <div className="food-actions">
                <Link to={`/products/${product._id}`} className="btn btn-primary">
                  Voir détails
                </Link>
                {!isVendor && (
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleAddToCart(product)}
                  >
                    Ajouter au panier
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <div className="text-center mt-5">
          <p>{isVendor ? "Aucun autre restaurant ne propose de produits pour le moment." : "Aucun produit disponible pour le moment."}</p>
        </div>
      )}
    </div>
  );
};

export default Products;
