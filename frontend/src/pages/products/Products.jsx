import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../JS/actions/product.actions";
import { addToCart } from "../../JS/actions/cart.actions";
import { Link } from "react-router-dom";
import "./products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoad } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoad) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="products-header">
        <h1>Catalogue de produits</h1>
        <p>Parcourez les meilleures options de restaurants et ajoutez vos plats preferes au panier.</p>
      </div>

      <div className="food-grid">
        {products.map((product) => (
          <article key={product._id} className="food-card">
            <div className="food-card-image">
              <img
                src={product.image || "https://via.placeholder.com/400x280?text=Produit"}
                alt={product.name}
              />
            </div>
            <div className="food-card-body">
              <span className="food-badge">
                {product.status === "published" ? "En vedette" : "Non publie"}
              </span>
              <h3>{product.name}</h3>
              <p className="food-description">
                {product.description?.slice(0, 110) || "Description non disponible"}...
              </p>

              <div className="food-meta">
                <span className="food-price">{product.price} EUR</span>
                <span className="food-restaurant">
                  {product.restaurantId?.businessName || product.restaurantId?.name || "Restaurant"}
                </span>
              </div>

              <div className="food-actions">
                <Link to={`/products/${product._id}`} className="btn btn-primary">
                  Voir details
                </Link>
                <button
                  className="btn btn-outline-success"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center mt-5">
          <p>Aucun produit disponible pour le moment.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
