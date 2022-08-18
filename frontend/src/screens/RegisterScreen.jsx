import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            onSubmit={submitHandler}
          >
            <span className="login100-form-title p-b-34">Crear Cuenta</span>
            {error && (
              <div class="container">
                <Message variant="danger">
                  No se encontró ninguna cuenta activa con las credenciales
                  dadas
                </Message>
              </div>
            )}

            {loading && (
              <div class="container">
                <Loader />
              </div>
            )}
            <div class="wrap-input100 validate-input m-b-20">
              <input
                class="input100 input-login"
                required
                type="name"
                placeholder="Nombre de Usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input m-b-20">
              <input
                class="input100 input-login"
                required
                type="email"
                placeholder="Correo Electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input m-b-20">
              <input
                class="input100 input-login"
                required
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span class="focus-input100"></span>
            </div>
            <div class="wrap-input100 validate-input m-b-20">
              <input
                class="input100 input-login"
                required
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span class="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <input
                className="login100-form-btn input-login"
                type="submit"
                value="Registrarse"
              />
            </div>

            <div className="w-full text-center p-t-27 p-b-239">
              <Link to="/login" className="txt2">
                Iniciar Sesión
              </Link>
            </div>

            <div className="w-full text-center">
              <Link to="/" className="txt3">
                <i className="far fa-long-arrow-alt-left"></i> Volver
              </Link>
            </div>
          </form>
          <div className="login100-more login-img"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
