import React, { useState } from "react";
import { Link } from "react-router-dom";

// import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <section className="bg-nav padding-y-sm">
        <div className="container">
          <ol className="breadcrumb ondark mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/profile">Perfil</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Paso 3 : Método de pago
            </li>
          </ol>
        </div>
      </section>
      <br />
      <div className="container col-lg-6 col-md-8">
        <article className="card">
          <div className="card-body">
            <CheckoutSteps step1 step2 step3 />
            <br />
            <article className="card">
              <div className="content-body">
                <h3 className="card-title"> Selecciona el método de pago </h3>
                <hr />
                <form onSubmit={submitHandler}>
                  <div className="row mb-3">
                    <div className="col-lg-4 mb-3">
                      <div className="box box-check">
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            label="PayPal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <b className="border-oncheck"></b>
                          <span className="form-check-label">
                            Paypal o Tarjeta de crédito <br />
                            <small className="text-muted">
                              Pago Inmediato{" "}
                            </small>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="box box-check">
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="dostavka"
                            disabled
                          />
                          <b className="border-oncheck"></b>
                          <span className="form-check-label">
                            Post office <br />
                            <small className="text-muted">
                              20-30 days via post
                            </small>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="box box-check">
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="dostavka"
                            disabled
                          />
                          <b className="border-oncheck"></b>
                          <span className="form-check-label">
                            Self pick-up <br />
                            <small className="text-muted">
                              {" "}
                              Come to our shop{" "}
                            </small>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="float-end">
                    <button type="submit" class="exp-btn">
                      <a
                        type="button"
                        className="btn-salir-sm btn-sesion btno-sm"
                      >
                        Continuar
                      </a>
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </div>
        </article>
      </div>
      <br />
    </div>
  );
}

export default PaymentScreen;
