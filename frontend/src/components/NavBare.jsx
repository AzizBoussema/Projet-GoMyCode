import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { logout } from "../JS/actions/auth.actions";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./navbare.css";

const SavoryxLogo = () => (
  <svg
    className="brand-logo-icon"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="24" cy="26" rx="20" ry="8" fill="currentColor" opacity="0.15" />
    <path
      d="M14 8v12c0 2 1 3 2 3v10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M12 8h4M12 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M34 8v12c0 2-1 3-2 3v10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M32 8h4v8h-4z" fill="currentColor" opacity="0.3" />
    <circle cx="24" cy="22" r="5" fill="currentColor" opacity="0.9" />
    <path d="M21 19l3 3 3-3" stroke="var(--page-bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NavBare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  const cartItems = useSelector((state) => state.cartReducer.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <SavoryxLogo />
          <span className="brand-text">Savoryx</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-item">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/restaurants" className="nav-item">
              Restaurants
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="nav-item">
              Produits
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-item">
              <div className={`cart-container ${cartCount > 0 ? "animate-cart" : ""}`}>
                <FaShoppingCart className="cart-icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
            </Nav.Link>
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
              title={theme === "light" ? "Mode sombre" : "Mode clair"}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            {isAuth ? (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-item">
                  Profil
                </Nav.Link>
                {user.role === "restaurant" && (
                  <Nav.Link as={Link} to="/vendor/dashboard" className="nav-item">
                    Dashboard
                  </Nav.Link>
                )}
                <Nav.Link
                  className="nav-item nav-action"
                  onClick={() => {
                    dispatch(logout(navigate));
                  }}
                >
                  Deconnexion
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item nav-action">
                  Connexion
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-item nav-action nav-action-primary">
                  Inscription
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBare;
