import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { register } from "../../JS/actions/auth.actions";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
    role: "client",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    businessName: "",
    registrationRNE: "",
    specialties: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.authReducer.errors);
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  // console.log(newUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...newUser,
      specialties: newUser.specialties
        ? newUser.specialties.split(",").map((s) => s.trim())
        : [],
    };
    dispatch(register(userData, navigate));
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
  return (
    <div className="register-page">
      <h2>Créer un compte</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label>Type de compte</Form.Label>
          <Form.Select
            name="role"
            value={newUser.role}
            onChange={handleChange}
          >
            <option value="client">Client</option>
            <option value="restaurant">Restaurateur</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Control
            type="text"
            placeholder="Enter your image Profile"
            name="image"
            value={newUser.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Entrez votre adresse email"
            name="email"
            autoComplete="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Nous ne partagerons jamais votre email.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            name="password"
            autoComplete="new-password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
                placeholder="Téléphone"
                name="phone"
                value={newUser.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </>
        )}

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
          Si vous avez déja un compte veuillez vous connectez, svp, <Link to="/login">Connexion</Link>
        </p>

        {errors && (
          <div className="alert alert-danger">
            {Array.isArray(errors)
              ? errors.map((err, index) => <div key={index}>{err.msg || err.message || err}</div>)
              : <div>{errors}</div>}
          </div>
        )}

        <Button
          variant="primary"
          type="submit"
          disabled={!isFormValid()}
        >
          Créer mon compte
        </Button>
      </Form>
    </div>
  );
};

export default Register;
