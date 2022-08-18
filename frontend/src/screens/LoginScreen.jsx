import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  // const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = () => {
    dispatch(login(email, password));
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-more login-img"></div>
          <form
            className="login100-form validate-form"
            onSubmit={submitHandler}
          >
            <span className="login100-form-title p-b-34">Inicio De Sesión</span>
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
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span class="focus-input100"></span>
            </div>
            <div className="container-login100-form-btn">
              <input
                className="login100-form-btn input-login"
                type="submit"
                value="Acceder"
              />
            </div>

            {/* <div className="w-full text-center p-t-27">
              <span className="txt1">¿Olvidaste tu </span>
              <Link to="/login" className="txt2">
                Contraseña
              </Link>
              ?
            </div> */}
            <div className="w-full text-center p-t-10 p-b-239">
              <Link
                className="txt2"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Registrarse
              </Link>
            </div>

            <div className="w-full text-center">
              <Link to="/" className="txt3">
                <i className="far fa-long-arrow-alt-left"></i> Volver
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
