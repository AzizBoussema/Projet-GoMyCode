import { useState } from "react";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { login } from "../../JS/actions/auth.actions";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userToConnect, setUserToConnect] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUserToConnect({ ...userToConnect, [e.target.name]: e.target.value });
  };
  // console.log(userToConnect)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userToConnect, navigate));
    // navigate('/profile')

  };
  return (
    <div className="container mx-auto w-50 p-5 page">
      <h2>Login page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userToConnect.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Password"
            name="password"
            value={userToConnect.password}
            onChange={handleChange}
            required
          />{" "}
          {/*/dev*/}
        </Form.Group>
        <p>
          Si vous n'avez pas de compte veuillez vous enregister d'abord, svp,{" "}
          <a href="/register">Register</a>{" "}
        </p>

        <Button
          variant="primary"
          type="submit"
          disabled={!userToConnect.email || !userToConnect.password}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
