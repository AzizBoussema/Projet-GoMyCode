import { useState, useEffect, useRef } from "react";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/actions/auth.actions";
import { CLEAR_AUTH_ERRORS } from "../../JS/actionType/auth.actiontype";
import { useNavigate, Link } from "react-router-dom";

const EMPTY = { email: "", password: "" };

const Login = () => {
  const [fields, setFields] = useState(EMPTY);
  // formKey force un remontage des inputs pour contourner l'autofill du navigateur
  const [formKey, setFormKey] = useState(Date.now());
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const errors    = useSelector((s) => s.authReducer.errors);
  const isLoad    = useSelector((s) => s.authReducer.isLoad);
  const hasBlurred = useRef(false);

  // --- Nettoyage à l'arrivée sur la page ---
  useEffect(() => {
    setFields(EMPTY);                              // vide l'état React
    setFormKey(Date.now());                        // force un remontage des inputs
    dispatch({ type: CLEAR_AUTH_ERRORS });          // efface les erreurs résiduelles
    hasBlurred.current = false;
  }, [dispatch]);

  // --- Nettoyage à la destruction du composant ---
  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_AUTH_ERRORS });
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Après le premier focus, on détecte si le navigateur a réinjecté une valeur
  const handleFocus = (e) => {
    if (!hasBlurred.current) return;
    // Si la valeur affichée diffère de notre état, c'est l'autofill — on l'efface
    if (e.target.value && e.target.value !== fields[e.target.name]) {
      setFields(EMPTY);
      setFormKey(Date.now());
    }
  };

  const handleBlur = () => { hasBlurred.current = true; };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(fields, navigate));
    setFields(EMPTY);
    setFormKey(Date.now());
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">🔑 Connexion</h2>
        <p className="login-subtitle">Bienvenue ! Connectez-vous à votre compte.</p>

        {errors && (
          <div className="alert alert-danger">
            {Array.isArray(errors)
              ? errors.map((e, i) => <div key={i}>{e.msg || e}</div>)
              : errors}
          </div>
        )}

        {/* formKey force le remontage des inputs — contourne l'autofill */}
        <Form key={formKey} onSubmit={handleSubmit} autoComplete="off">

          {/* Inputs pièges invisibles : trompent le gestionnaire de mots de passe du navigateur */}
          <input type="text"     style={{ display: "none" }} aria-hidden="true" readOnly tabIndex={-1} />
          <input type="password" style={{ display: "none" }} aria-hidden="true" readOnly tabIndex={-1} />

          <Form.Group className="mb-3">
            <Form.Label className="login-label">Adresse email</Form.Label>
            <Form.Control
              type="email"
              placeholder="votre@email.com"
              name="email"
              value={fields.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="off"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="login-label">Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre mot de passe"
              name="password"
              value={fields.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="new-password"
              required
            />
          </Form.Group>

          <p className="login-register-link">
            Pas encore de compte ?{" "}
            <Link to="/register">Créer un compte</Link>
          </p>

          <Button
            variant="primary"
            type="submit"
            className="w-100 btn-premium"
            disabled={!fields.email || !fields.password || isLoad}
          >
            {isLoad ? "Connexion..." : "Se connecter"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
