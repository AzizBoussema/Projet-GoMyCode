import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { logout } from "../JS/actions/auth.actions";
import { useNavigate, Link } from "react-router-dom";
import "./navbare.css";

const NavBare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  const cartItems = useSelector((state) => state.cartReducer.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          FoodNest
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
