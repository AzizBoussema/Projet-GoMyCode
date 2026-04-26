import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../JS/actions/product.actions";
import { FaTruck, FaAward, FaLock } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter out excluded products from carousel
  const filteredProducts = products
    ? products.filter(
        (product) =>
          !product.name.toLowerCase().includes("sushi") &&
          !product.name.toLowerCase().includes("tacos méditerranéen")
      )
    : [];

  // Carrousel: change product every 2 seconds
  useEffect(() => {
    if (!filteredProducts || filteredProducts.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % filteredProducts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [filteredProducts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/restaurants");
  };

  const currentProduct = filteredProducts && filteredProducts.length > 0 ? filteredProducts[currentProductIndex] : null;

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Vos restos locaux livres chez vous</h1>
          <p className="hero-subtitle">Commandez vos repas preferes en quelques clics</p>
          <div className="hero-search">
            <form className="search-form" onSubmit={handleSubmit}>
              <button type="submit" className="search-btn">Trouver un restaurant</button>
            </form>
          </div>
          <Link to="/products" className="hero-cta">
            Voir les produits
          </Link>
          <Link to="/register" className="hero-cta hero-cta-secondary">
            Pret a commander ?
          </Link>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container">
          <h2 className="section-title">Decouvrez nos produits populaires</h2>
          <div className="showcase-carousel">
            {currentProduct ? (
              <Link
                to={`/products/${currentProduct._id}`}
                className="showcase-card-full showcase-card-link"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={currentProduct.image || "https://via.placeholder.com/800x400?text=Produit"}
                  alt={currentProduct.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/800x400?text=Produit")
                  }
                />
                <div className="showcase-overlay-full">
                  <h4>{currentProduct.name}</h4>
                  <p>{currentProduct.description || "Découvrez ce produit..."}</p>
                  <span className="showcase-badge-full">
                    {currentProduct.price.toFixed(2)} DT
                  </span>
                </div>
              </Link>
            ) : (
              <p>Chargement des produits...</p>
            )}
          </div>
          <div className="showcase-cta">
            <Link to="/products" className="btn btn-primary btn-large">
              Explorer tous les produits
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Pourquoi nous choisir ?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Livraison rapide</h3>
              <p>Recevez vos plats chauds en moins de 30 minutes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaAward />
              </div>
              <h3>Qualite garantie</h3>
              <p>Nos restaurants partenaires sont choisis pour leur excellence culinaire.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaLock />
              </div>
              <h3>Paiement securise</h3>
              <p>Paiement simple et securise pour toutes vos commandes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Pret a commander ?</h2>
          <p>Rejoignez des milliers de clients satisfaits</p>
          <Link to="/register" className="btn btn-secondary">
            Creer un compte
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
