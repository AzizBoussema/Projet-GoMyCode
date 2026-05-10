import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { register } from "../../JS/actions/auth.actions";
import { CLEAR_AUTH_ERRORS } from "../../JS/actionType/auth.actiontype";

const EMPTY_FORM = {
  name: "", image: "", email: "", password: "", role: "client",
  firstName: "", lastName: "", address: "", phone: "",
  businessName: "", registrationRNE: "", specialties: "",
};

const Register = () => {
  const [newUser, setNewUser]       = useState(EMPTY_FORM);
  const [formKey, setFormKey]       = useState(Date.now());
  const [registered, setRegistered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors   = useSelector((s) => s.authReducer.errors);
  const isLoad   = useSelector((s) => s.authReducer.isLoad);

  // Nettoyage à l'arrivée sur la page
  useEffect(() => {
    setNewUser(EMPTY_FORM);
    setFormKey(Date.now());
    setRegistered(false);
    dispatch({ type: CLEAR_AUTH_ERRORS });
  }, [dispatch]);

  // Nettoyage à la destruction
  useEffect(() => {
    return () => dispatch({ type: CLEAR_AUTH_ERRORS });
  }, [dispatch]);

  // Redirection automatique 3s après succès
  useEffect(() => {
    if (!registered) return;
    const timer = setTimeout(() => navigate("/profile"), 3000);
    return () => clearTimeout(timer);
  }, [registered, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "role") {
      setNewUser({ ...EMPTY_FORM, role: e.target.value });
      setFormKey(Date.now());
      dispatch({ type: CLEAR_AUTH_ERRORS });
      return;
    }
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...newUser,
      specialties: newUser.specialties
        ? newUser.specialties.split(",").map((s) => s.trim())
        : [],
    };
    // On passe un callback : le formulaire n'est réinitialisé qu'en cas de succès
    dispatch(register(userData, () => {
      setRegistered(true);
      setNewUser(EMPTY_FORM);
      setFormKey(Date.now());
    }));
  };

  const isFormValid = () => {
    const baseValid = newUser.name && newUser.email && newUser.password;
    if (newUser.role === "client") {
      return baseValid && newUser.firstName && newUser.lastName && newUser.address && newUser.phone;
    }
    if (newUser.role === "restaurant") {
      return baseValid && newUser.businessName && newUser.registrationRNE;
    }
    return baseValid;
  };

  // ---- Écran de succès ----
  if (registered) {
    return (
      <div className="register-page">
        <div className="register-success">
          <div className="register-success-icon">🎉</div>
          <p className="register-success-msg">
            Félicitations&nbsp;! Votre compte a été créé avec succès.<br />
            Vous pouvez maintenant vous régaler avec nos plats préférés&nbsp;😋
          </p>
          <p className="register-redirect">Redirection automatique dans 3 secondes…</p>
        </div>
      </div>
    );
  }

  // ---- Formulaire ----
  return (
    <div className="register-page">
      <h2>Créer un compte</h2>

      <Form key={formKey} onSubmit={handleSubmit} autoComplete="off">
        {/* Inputs pièges invisibles pour bloquer l'autofill navigateur */}
        <input type="text"     style={{ display: "none" }} aria-hidden="true" readOnly tabIndex={-1} />
        <input type="password" style={{ display: "none" }} aria-hidden="true" readOnly tabIndex={-1} />

        {/* Type de compte */}
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Type de compte</Form.Label>
          <Form.Select name="role" value={newUser.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="restaurant">Restaurateur</option>
          </Form.Select>
        </Form.Group>

        {/* Nom d'utilisateur */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Nom d'utilisateur"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Photo de profil */}
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Control
            type="text"
            placeholder="URL de votre photo de profil"
            name="image"
            value={newUser.image}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse email"
            name="email"
            autoComplete="off"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Nous ne partagerons jamais votre email.
          </Form.Text>
        </Form.Group>

        {/* Mot de passe */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe (8 caractères minimum)"
            name="password"
            autoComplete="new-password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Champs spécifiques CLIENT */}
        {newUser.role === "client" && (
          <>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Control
                type="text"
                placeholder="Prénom"
                name="firstName"
                value={newUser.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Control
                type="text"
                placeholder="Nom"
                name="lastName"
                value={newUser.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Control
                type="text"
                placeholder="Adresse de livraison"
                name="address"
                value={newUser.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Control
                type="tel"
                placeholder="Téléphone (ex : 22 111 222)"
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </>
        )}

        {/* Champs spécifiques RESTAURATEUR */}
        {newUser.role === "restaurant" && (
          <>
            <Form.Group className="mb-3" controlId="formBasicBusinessName">
              <Form.Control
                type="text"
                placeholder="Nom de l'enseigne"
                name="businessName"
                value={newUser.businessName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRegistrationRNE">
              <Form.Control
                type="text"
                placeholder="Numéro RNE"
                name="registrationRNE"
                value={newUser.registrationRNE}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSpecialties">
              <Form.Control
                type="text"
                placeholder="Spécialités (séparées par des virgules)"
                name="specialties"
                value={newUser.specialties}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}

        <p>
          Si vous avez déjà un compte, <Link to="/login">Connexion</Link>
        </p>

        {/* Message d'erreur */}
        {errors && (
          <div className="alert alert-danger register-error">
            <div className="register-error-title">
              ❌ Échec de l&apos;enregistrement, veuillez réessayer.
            </div>
            {Array.isArray(errors)
              ? errors.map((err, i) => (
                  <div key={i} className="register-error-detail">
                    {err.msg || err.message || err}
                  </div>
                ))
              : <div className="register-error-detail">{errors}</div>}
          </div>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-100 btn-premium"
          disabled={!isFormValid() || isLoad}
        >
          {isLoad ? "Création en cours…" : "Créer mon compte"}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
