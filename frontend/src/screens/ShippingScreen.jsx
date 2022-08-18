import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [message, setMessage] = useState(shippingAddress.message);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        phone,
        postalCode,
        country,
        message,
      })
    );
    history.push("/payment");
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
              Paso 2: Dirección de envío
            </li>
          </ol>
        </div>
      </section>
      <br />
      <div className="container col-lg-6 col-md-8">
        <article className="card">
          <div className="card-body">
            <CheckoutSteps step1 step2 />
            <br />
            <article className="card">
              <div className="content-body">
                <h3 className="card-title"> Dirección de envío </h3>
                <hr />
                <form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-sm-8 mb-3">
                      <label for="" className="form-label">
                        Dirección
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Dirección"
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-sm-4 mb-3">
                      <label for="" className="form-label">
                        Pais
                      </label>
                      <select
                        required
                        className="form-select"
                        id="country*"
                        aria-label="Country*"
                        placeholder="Enter country"
                        selected={country ? country : ""}
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option disabled value="">
                          Seleccione un país
                        </option>
                        <option value="colombia">Colombia</option>
                      </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <label for="" className="form-label">
                        Ciudad
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Su ciudad"
                        value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-sm-4 col-6 mb-3">
                      <label for="" className="form-label">
                        Teléfono
                      </label>
                      <input
                        className="form-control"
                        required
                        type="text"
                        placeholder="Número de contacto"
                        value={phone ? phone : ""}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4 col-6 mb-3">
                      <label for="" className="form-label">
                        Codigo Postal
                      </label>
                      <input
                        className="form-control"
                        required
                        type="text"
                        placeholder="Ingrese su codigo postal"
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label for="" className="form-label">
                      Mensaje para el vendedor
                    </label>
                    <textarea
                      required
                      type="text"
                      className="form-control"
                      value={message ? message : ""}
                      placeholder="Ingrese un mensaje"
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
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

export default ShippingScreen;
