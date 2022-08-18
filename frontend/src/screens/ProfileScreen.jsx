import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, NavDropdown, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { logout } from "../actions/userActions";
import avatar from "../assets/images/avatar.jpg";

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
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
              Mi Cuenta
            </li>
          </ol>
        </div>
      </section>

      <section className="padding-y bg-light">
        <div className="container">
          <div className="row">
            <aside className="col-lg-3 col-xl-3">
              <div className="card p-3 h-100">
                <br />
                <aside className="sidebar">
                  <div>
                    <ul id="menu">
                      <li className="menu-item">
                        <Link className="tab" to="/profile">
                          <i className="fas fa-user-circle"></i>
                          <span className="espaciado-bar">Perfil</span>
                        </Link>
                      </li>
                      <br />
                      <li className="menu-item">
                        <a
                          className="tab"
                          href="#submenu2"
                          data-bs-toggle="collapse"
                        >
                          <i className="fas fa-shopping-cart"></i>
                          <span className="espaciado-bar">
                            Bolsa de Compras
                          </span>
                          <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul
                          className="collapse ms-1"
                          id="submenu2"
                          data-bs-parent="#menu"
                        >
                          <li>
                            <Link to="/cart">
                              <i className="fas fa-cart-arrow-down"></i>
                              <span className="espaciado-bar">Mi Carrito</span>
                            </Link>
                          </li>
                          {/* <li>
                            <a href="/change_password/">
                              <i className="fas fa-heart"></i>
                              <span className="espaciado-bar">
                                Mis Favoritos
                              </span>
                            </a>
                          </li> */}
                        </ul>
                      </li>
                      <br />
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <li className="menu-item">
                            <a
                              className="tab"
                              href="#submenu3"
                              data-bs-toggle="collapse"
                            >
                              <i className="fas fa-cog"></i>
                              <span className="espaciado-bar">
                                Configuración
                              </span>
                              <i className="arrow fa fa-angle-right pull-right"></i>
                            </a>
                            <ul
                              className="collapse ms-1"
                              id="submenu3"
                              data-bs-parent="#menu"
                            >
                              <li>
                                <Link to="/admin/productlist">
                                  <i className="fas fa-cart-arrow-down"></i>
                                  <span className="espaciado-bar">
                                    Administración
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/admin/orderlist">
                                  <i class="fas fa-solid fa-bags-shopping"></i>
                                  <span className="espaciado-bar">Ordenes</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <br />
                        </>
                      )}
                      <li className="menu-item">
                        <Link className="tab" to="services">
                          <i className="fas fa-gavel"></i>
                          <span className="espaciado-bar">
                            {" "}
                            Servicios & Condiciones
                          </span>
                        </Link>
                      </li>
                      <br />
                      <li className="menu-item">
                        <a type="button" className="tab" onClick={handleShow}>
                          <i className="fas fa-door-open"></i>
                          <span className="espaciado-bar">Cerrar Sesión</span>
                        </a>

                        <Modal
                          className="modal fade"
                          show={show}
                          onHide={handleClose}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title">Cerrar Sesión</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={handleClose}
                            ></button>
                          </div>
                          <Modal.Body
                            className="modal-body"
                            style={{ color: "#333" }}
                          >
                            ¿Estás seguro de que quieres cerrar la sesión?
                          </Modal.Body>
                          <Modal.Footer>
                            <a
                              type="button"
                              className="btn-salir btn-sesion btno"
                              onClick={handleClose}
                            >
                              Volver
                            </a>

                            <a
                              type="button"
                              className="btn-salir btn-sesion btno"
                              onClick={logoutHandler}
                            >
                              Cerrar Sesión
                            </a>
                          </Modal.Footer>
                        </Modal>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </aside>

            <main className="col-lg-9  col-xl-9">
              <article className="card">
                <div className="content-body">
                  <figure className="itemside align-items-center">
                    <div className="aside">
                      <span className="bg-gray icon-md rounded-circle">
                        <img src={avatar} className="icon-md rounded-circle" />
                      </span>
                    </div>
                    <figcaption className="info">
                      <h6 className="title">{name}</h6>
                      <p>Correo: {email}</p>
                    </figcaption>
                  </figure>

                  <hr />
                  <div>
                    <form onSubmit={submitHandler}>
                      <div class="row">
                        <div class="col-lg-8">
                          <div class="row gx-3">
                            <div class="col-6 mb-3">
                              <label class="form-label">
                                Nombre de Usuario
                              </label>
                              <input
                                class="form-control"
                                required
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div class="col-lg-6 col-md-6 mb-3">
                              <label class="form-label">
                                Correo Electronico
                              </label>
                              <input
                                class="form-control"
                                disabled
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div class="col-lg-6 col-md-6 mb-3">
                              <label class="form-label">Contraseña</label>
                              <input
                                class="form-control"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                            <div class="col-lg-6 col-md-6 mb-3">
                              <label class="form-label">
                                Confirmar Contraseña
                              </label>
                              <input
                                class="form-control"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      {/* <button class="btn btn-primary" type="submit">
                        Save changes
                      </button> */}
                      <button type="submit" class="exp-btn">
                        <a
                          type="button"
                          className="btn-salir-sm btn-sesion btno-sm col-12"
                        >
                          Guardar Cambios
                        </a>
                      </button>
                    </form>
                  </div>
                  <hr />

                  <h5 className="card-title"> Tus ordenes </h5>

                  <div>
                    {loadingOrders ? (
                      <Loader />
                    ) : errorOrders ? (
                      <Message variant="danger">{errorOrders}</Message>
                    ) : (
                      <div>
                        {orders.length === 0 ? (
                          <p>No hay ordenes</p>
                        ) : (
                          <div>
                            {orders.map((order) => (
                              <article className="card mb-4">
                                <div className="card-body" key={order._id}>
                                  <header className="d-lg-flex">
                                    <div className="flex-grow-1">
                                      <h6 className="mb-0">
                                        Order ID: {order._id}{" "}
                                        <i className="dot"></i>
                                        {order.isPaid ? (
                                          <span className="text-success">
                                            {" "}
                                            Pagado
                                          </span>
                                        ) : (
                                          <span className="text-danger">
                                            {" "}
                                            Pendiente
                                          </span>
                                        )}
                                      </h6>
                                      <span className="text-muted">
                                        Fecha:{" "}
                                        {order.createdAt.substring(0, 10)}
                                      </span>
                                    </div>
                                    <div>
                                      <Link
                                        to={`/order/${order._id}`}
                                        className="btn-salir-sm btn-sesion btno-sm"
                                      >
                                        Ver Orden
                                      </Link>
                                    </div>
                                  </header>
                                  <hr />
                                  <div className="row">
                                    <div className="col-lg-4">
                                      <p className="mb-0 text-muted">
                                        Contacto
                                      </p>
                                      <p className="m-0">
                                        {order.user.name} <br /> Teléfono:{" "}
                                        {order.shippingAddress.phone} <br />{" "}
                                        Correo: {order.user.email}{" "}
                                      </p>
                                    </div>
                                    <div className="col-lg-4 border-start">
                                      <p className="mb-0 text-muted">
                                        Dirección de envío
                                      </p>
                                      <p className="m-0">
                                        {" "}
                                        Ciudad: {order.shippingAddress.city}
                                        <br />
                                        Dirección:{" "}
                                        {order.shippingAddress.address} <br />
                                        ZIP: {
                                          order.shippingAddress.postalCode
                                        }{" "}
                                      </p>
                                    </div>
                                    <div className="col-lg-4 border-start">
                                      <p className="mb-0 text-muted">Pago</p>
                                      <p className="m-0">
                                        {order.isPaid ? (
                                          <span className="text-success">
                                            {order.paymentMethod ===
                                            "paypal" ? (
                                              <div>Desconocido</div>
                                            ) : (
                                              <img
                                                style={{ width: "70px" }}
                                                src="https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-4.png"
                                              />
                                            )}
                                          </span>
                                        ) : (
                                          <span className="text-danger">
                                            {" "}
                                            Sin Pagar{" "}
                                          </span>
                                        )}
                                        <br />
                                        Gastos de envío: ${
                                          order.shippingPrice
                                        }{" "}
                                        <br />
                                        Total pagado: ${order.totalPrice}
                                      </p>
                                    </div>
                                  </div>
                                  <hr />
                                  <ul className="row">
                                    {order.orderItems.map((item, index) => (
                                      <li className="col-xl-4  col-lg-6">
                                        <figure
                                          className="itemside mb-3"
                                          key={index}
                                        >
                                          <div className="aside">
                                            <img
                                              width="72"
                                              height="72"
                                              src={item.image}
                                              alt={item.name}
                                              className="img-sm rounded border"
                                            />
                                          </div>
                                          <figcaption className="info">
                                            <p className="title">{item.name}</p>
                                            <strong>
                                              {" "}
                                              {item.qty}x = $
                                              {(item.qty * item.price).toFixed(
                                                2
                                              )}{" "}
                                            </strong>
                                          </figcaption>
                                        </figure>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </article>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </main>
          </div>

          <br />
          <br />
        </div>
      </section>
    </div>
  );
}

export default ProfileScreen;
