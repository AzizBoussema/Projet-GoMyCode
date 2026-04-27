import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../JS/actions/product.actions";
import { FaTruck, FaAward, FaLock } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Filter out excluded products from carousel
  const filteredProducts = useMemo(() => {
    return products
      ? products.filter(
        (product) =>
          !product.name.toLowerCase().includes("sushi") &&
          !product.name.toLowerCase().includes("tacos méditerranéen")
      )
      : [];
  }, [products]);

  // Carrousel: change product every 2 seconds
  useEffect(() => {
    if (!filteredProducts || filteredProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % filteredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredProducts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/restaurants");
  };

  const currentProduct = filteredProducts && filteredProducts.length > 0 ? filteredProducts[currentProductIndex] : null;

  return (
    <motion.main
      className="home-page"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.section variants={fadeInUp} className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title text-gradient">Vos restos locaux livrés chez vous</h1>
          <p className="hero-subtitle">Commandez vos repas préférés en quelques clics</p>
          <div className="hero-search">
            <form className="search-form" onSubmit={handleSubmit}>
              <button type="submit" className="search-btn">Trouver un restaurant</button>
            </form>
          </div>
        </div>
      </motion.section>

      <motion.section variants={fadeInUp} className="showcase-section">
        <div className="container">
          <h2 className="section-title">Découvrez nos produits populaires</h2>
          <div className="showcase-carousel">
            <AnimatePresence mode="wait">
              {currentProduct ? (
                <motion.div
                  key={currentProduct._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Link
                    to={`/products/${currentProduct._id}`}
                    className="showcase-card-full showcase-card-link"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={currentProduct.image || "https://via.placeholder.com/1200x500?text=Produit"}
                      alt={currentProduct.name}
                      onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/1200x500?text=Produit")
                      }
                    />
                    <div className="showcase-overlay-full">
                      <h4>{currentProduct.name}</h4>
                      <p>{currentProduct.description || "Découvrez ce produit exceptionnel..."}</p>
                      <span className="showcase-badge-full">
                        {currentProduct.price.toFixed(2)} DT
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ) : (
                <p>Chargement des produits...</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <motion.section variants={fadeInUp} className="cta-section">
        <div className="container">
          <h2>Prêt à commander ?</h2>
          <p>Rejoignez des milliers de clients satisfaits</p>
          <Link to="/register" className="btn btn-secondary">
            Créer un compte
          </Link>
        </div>
      </motion.section>

      <motion.section variants={fadeInUp} className="features-section">
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
              <h3>Qualité garantie</h3>
              <p>Nos restaurants partenaires sont choisis pour leur excellence culinaire.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaLock />
              </div>
              <h3>Paiement sécurisé</h3>
              <p>Paiement simple et sécurisé pour toutes vos commandes.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Home;
