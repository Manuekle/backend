import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 2).toFixed(2);
  cart.taxPrice = Number(0.05 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
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
              Paso 4 : Realizar el Pedido
            </li>
          </ol>
        </div>
      </section>
      <section className="padding-y bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card">
                <div className="card-body">
                  <CheckoutSteps step1 step2 step3 step4 />
                  <br />
                  <div className="card">
                    <div className="content-body">
                      <h3 className="card-title mb-4">Dirección de envío</h3>
                      <p>
                        <strong>Dirección:  </strong>
                        {cart.shippingAddress.address}{" "}({" "}{cart.shippingAddress.city}{" "}-{" "}{cart.shippingAddress.country})
                      </p>
                      <p>
                        <strong>Teléfono:  </strong>
                        {cart.shippingAddress.phone}
                      </p>
                      <p>
                        <strong>Mensaje:  </strong>
                        {cart.shippingAddress.message}
                      </p>
                      <hr />
                      <h3 className="card-title mb-4">Método de pago</h3>
                      <p>
                        <strong>Método: </strong>
                        {cart.paymentMethod}
                      </p>
                      <hr />
                      <h3 className="card-title mb-4">Mangas</h3>
                      <div>
                        {cart.cartItems.length === 0 ? (
                          <Message variant="info">Your cart is empty</Message>
                        ) : (
                          <div>
                            <aside>
                              <article>
                                <div className="row">
                                  {cart.cartItems.map((item, index) => (
                                    <div className="col-md-6">
                                      <figure
                                        className="itemside  mb-4"
                                        key={item.index}
                                      >
                                        <div className="aside">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-sm img-thumbnail"
                                          />
                                        </div>
                                        <figcaption className="info">
                                          <p> {item.name} </p>
                                          <span className="text-muted">
                                            {item.qty} x ${item.price}
                                          </span>
                                          <br />
                                          <strong className="price">
                                            $
                                            {(item.qty * item.price).toFixed(2)}
                                          </strong>
                                        </figcaption>
                                      </figure>
                                    </div>
                                  ))}
                                </div>
                              </article>

                              <article className="card-body border-top">
                                <Link className="btn-salir-sm btn-sesion btno-sm col-3" to="/cart">
                                  <i className="fa fa-arrow-left me-2"></i>{" "}
                                  Editar pedido
                                </Link>

                                <table
                                  style={{ maxWidth: "360px" }}
                                  className="table table-sm float-lg-end"
                                >
                                  <tr>
                                    <td>
                                      {" "}
                                      Subtotal (
                                      {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                      )}
                                      ) mangas:{" "}
                                    </td>
                                    <td> ${cart.itemsPrice} </td>
                                  </tr>
                                  <tr>
                                    <td> Gastos de envío: </td>
                                    <td className="text-success">
                                      {" "}
                                      ${cart.shippingPrice}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td> TAX: </td>
                                    <td className="text-danger">
                                      {" "}
                                      ${cart.taxPrice}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td> Total: </td>
                                    <td>
                                      <strong className="h5 price">
                                        ${cart.totalPrice}
                                      </strong>
                                    </td>
                                  </tr>
                                </table>
                              </article>
                            </aside>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <aside className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Mangas:</dt>
                    <dd className="text-end"> ${cart.itemsPrice}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Gastos de envío:</dt>
                    <dd className="text-end text-success">
                      + ${cart.shippingPrice}
                    </dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>TAX:</dt>
                    <dd className="text-end text-danger">
                      + ${cart.taxPrice}{" "}
                    </dd>
                  </dl>
                  <hr />
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-end text-dark h5">
                      {" "}
                      ${cart.totalPrice}{" "}
                    </dd>
                  </dl>
                  <div className="d-grid gap-2 my-3">
                    <a
                      type="button"
                      disabled={cart.cartItems === 0}
                      onClick={placeOrder}
                      className="btn-salir-sm btn-sesion btno-sm col-12"
                    >
                      Realizar Pedido
                    </a>                    
                    <a href="#" className="btn btn-light w-100">
                      Volver a la tienda
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <br />
          <br />
        </div>
      </section>
    </div>
  );
}

export default PlaceOrderScreen;
