import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUlZGrq17oqQ9KitqYB2vSweGDlikwndRM5670ST1pphAloxv-JKmmEtGSXNRfaji7Y0W9oJD1L2LI7V";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const dateOrder = order?.deliveredAt;

  const formatDate = (dateOrder) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateOrder).toLocaleDateString(undefined, options);
  };

  // console.log(formatDate(dateOrder))

  // console.log(dateOrder);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
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
              Realizar Pago
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
                  <div className="content-body">
                    <h3 className="card-title mb-4">Dirección de envío</h3>
                    <p>
                      <strong>Nombre: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Teléfono: </strong> {order.shippingAddress.phone}
                    </p>
                    <p>
                      <strong>Correo: </strong>
                      <a
                        style={{ color: "#515863" }}
                        href={`mailto:${order.user.email}`}
                      >
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Dirección: </strong>
                      {order.shippingAddress.address}{" "}({" "}{order.shippingAddress.city}{" "}-{" "}{order.shippingAddress.country})
                      {/* {order.shippingAddress.postalCode}, */}
                      
                    </p>
                    <p>
                        <strong>Mensaje:  </strong>
                        {order.shippingAddress.message}
                      </p>
                    {order.isDelivered ? (
                      // <Message variant="success">
                      //   Delivered on {order.deliveredAt}
                      // </Message>

                      <div class="col-lg-12">
                        <article class="card">
                          <div class="col-lg-12">
                            <article class="card">
                              <div class="card-body">
                                <figure
                                  class="mt-4 mx-auto text-center"
                                  style={{ maxWidth: "600px" }}
                                >
                                  <span class="rounded-circle icon-md svg-icon-s">
                                    <i class="fas fa-hand-holding-box"></i>
                                  </span>
                                  <figcaption class="my-3">
                                    <h4>Entregado!</h4>
                                    <p>
                                      Llegó el {formatDate(order.deliveredAt)}
                                    </p>
                                  </figcaption>
                                </figure>

                                <br />
                              </div>
                            </article>
                          </div>
                        </article>
                      </div>
                    ) : (
                      <div class="col-lg-12">
                        <article class="card">
                          <div class="card-body">
                            <figure
                              class="mt-4 mx-auto text-center"
                              style={{ maxWidth: "600px" }}
                            >
                              <span class="rounded-circle icon-md svg-icon-w">
                                <i class="fas fa-shipping-timed"></i>
                              </span>
                              <figcaption class="my-3">
                                <h4>Tus Mangas no han llegado!</h4>
                                <p>Ten un poco de paciencia</p>
                              </figcaption>
                            </figure>

                            <br />
                          </div>
                        </article>
                      </div>
                    )}
                    <hr />
                    <h3 className="card-title mb-4">Método de pago</h3>
                    <p>
                      <strong>Método: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <div class="col-lg-12">
                        <article class="card">
                          <div class="card-body">
                            <figure
                              class="mt-4 mx-auto text-center"
                              style={{ maxWidth: "600px" }}
                            >
                              <span class="rounded-circle icon-md svg-icon-s">
                                <i class="fas fa-receipt"></i>
                              </span>
                              <figcaption class="my-3">
                                <h4>¡Pago Exitoso!</h4>
                                <p>Gracias por tu compra</p>
                              </figcaption>
                            </figure>

                            <br />
                          </div>
                        </article>
                      </div>
                    ) : (
                      <div class="col-lg-12">
                        <article class="card">
                          <div class="card-body">
                            <figure
                              class="mt-4 mx-auto text-center"
                              style={{ maxWidth: "600px" }}
                            >
                              <span class="rounded-circle icon-md svg-icon-d">
                                <i class="fas fa-cash-register"></i>
                              </span>
                              <figcaption class="my-3">
                                <h4>Aun no has pagado!</h4>
                                <p>Que estas esperando!</p>
                              </figcaption>
                            </figure>

                            <br />
                          </div>
                        </article>
                      </div>
                    )}
                    <hr />
                    <h3 className="card-title mb-4">Mangas</h3>
                    <div>
                      {order.orderItems.length === 0 ? (
                        <Message variant="info">Order is empty</Message>
                      ) : (
                        <div>
                          <aside>
                            <article>
                              <div className="row">
                                {order.orderItems.map((item, index) => (
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
                                          ${(item.qty * item.price).toFixed(2)}
                                        </strong>
                                      </figcaption>
                                    </figure>
                                  </div>
                                ))}
                              </div>
                            </article>
                          </aside>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h2>RESUMEN DEL PEDIDO</h2>
                  <hr />
                  <dl className="dlist-align">
                    <dt>Mangas:</dt>
                    <dd className="text-end"> ${order.itemsPrice}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Envio:</dt>
                    <dd className="text-end"> ${order.shippingPrice}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>TAX:</dt>
                    <dd className="text-end"> ${order.taxPrice} </dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-end"> ${order.totalPrice} </dd>
                  </dl>
                  <hr />
                  {!order.isPaid && (
                    <div>
                      {loadingPay && <Loader />}

                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </div>
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <div>
                        <a
                          type="button"
                          className="btn-salir-sm btn-sesion btno-sm col-12"
                          onClick={deliverHandler}
                        >
                          Marcar Como Entregado
                        </a>
                      </div>
                    )}
                  <div className="d-grid gap-2 my-3">
                    <Link to="/profile" className="btn btn-light w-100">
                      Volver a la tienda
                    </Link>
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

export default OrderScreen;
