import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-wrap container">
        <div className="footer-brand">
          <h5>FoodNest</h5>
          <p>Livraison rapide de plats frais, de la commande à la porte.</p>
        </div>
        <div className="footer-links">
          <Link to="/" onClick={handleLinkClick}>Accueil</Link>
          <Link to="/products" onClick={handleLinkClick}>Produits</Link>
          <Link to="/login" onClick={handleLinkClick}>Connexion</Link>
          <Link to="/register" onClick={handleLinkClick}>Inscription</Link>
        </div>
        <div className="footer-copy">© 2026 FoodNest. Tous droits réservés.</div>
      </div>
    </footer>
  );
}

export default Footer;
