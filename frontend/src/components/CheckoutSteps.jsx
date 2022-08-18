import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <ul className="steps-wrap">
      {step1 ? (
        <li className="step active">
          <span className="icon">1</span>
          <span className="text">Iniciar sesión</span>
        </li>
      ) : (
        <li className="step">
          <span className="icon">1</span>

          <Link to="/login">
            <span className="text">Iniciar sesión</span>
          </Link>
        </li>
      )}
      {step2 ? (
        <li className="step active">
          <span className="icon">2</span>
          <Link to="/shipping">
            <span className="text">Dirección de envío</span>
          </Link>
        </li>
      ) : (
        <li className="step">
          <span className="icon">2</span>
          <span className="text">Dirección de envío</span>
        </li>
      )}
      {step3 ? (
        <li className="step active">
          <span className="icon">3</span>
          <Link to="/payment">
            <span className="text">Método de pago</span>
          </Link>
        </li>
      ) : (
        <li className="step">
          <span className="icon">3</span>
          <span className="text">Método de pago</span>
        </li>
      )}
      {step4 ? (
        <li className="step active">
          <span className="icon">4</span>
          <Link to="/placeorder">
            <span className="text">Realizar pedido</span>
          </Link>
        </li>
      ) : (
        <li className="step">
          <span className="icon">4</span>
          <span className="text">Realizar pedido</span>
        </li>
      )}
    </ul>
  );
}

export default CheckoutSteps;
