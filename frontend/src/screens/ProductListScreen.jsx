import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { logout } from "../actions/userActions";
import Rating from "../components/Rating";

import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen({ history, match }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let keyword = history.location.search;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#333",
        cancelButtonColor: "#BA4341",
        confirmButtonText: "Si, eliminalo!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          console.log(id);
          dispatch(deleteProduct(id));
        }
      })
    ) {
      // dispatch(deleteProduct(id));
      console.log(id);
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
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
              Mis Productos
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
                        <li className="menu-item">
                          <a
                            className="tab"
                            href="#submenu3"
                            data-bs-toggle="collapse"
                          >
                            <i className="fas fa-cog"></i>
                            <span className="espaciado-bar">Configuración</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                          </a>
                          <ul
                            className="collapse ms-1"
                            id="submenu3"
                            data-bs-parent="#menu"
                          >
                            {/* <li>
                              <Link>
                                <i className="fas fa-gavel"></i>
                                <span className="espaciado-bar">
                                  Servicios & Condiciones
                                </span>
                              </Link>
                            </li> */}
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
                      )}
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
            {/* aqui */}
            <main className="col-lg-9  col-xl-9">
              <article className="card">
                <div className="content-body">
                  {/* <h2 className="card-title">Mis Productos</h2> */}
                  <Row className="align-items-center">
                    <Col>
                      <h1>Mis Productos</h1>
                    </Col>

                    <div className="col-lg-1 col-sm-2 col-md-6">
                      <a
                        type="button"
                        className="btn-salir-sm btn-sesion btno-sm col-8"
                        onClick={createProductHandler}
                      >
                        <i className="fas fa-plus"></i>
                      </a>
                    </div>
                  </Row>

                  <div>
                    <hr />

                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant="danger">{error}</Message>
                    ) : (
                      <div>
                        {products.map((product) => (
                          <article
                            className="row gy-2 align-items-center"
                            key={product._id}
                          >
                            <div className="col-xl-4 col-sm-6">
                              <figure className="itemside align-items-center">
                                <div className="aside">
                                  <img
                                    src={product.image}
                                    className="img-sm img-thumbnail"
                                  />
                                </div>
                                <div className="info">
                                  <Link
                                    to={`/product/${product._id}`}
                                    className="h6 text-dark"
                                  >
                                    {product.name}
                                  </Link>
                                  <div className="rating-wrap">
                                    <Rating
                                      value={product.rating}
                                      color={"#ff8100 "}
                                    />
                                  </div>
                                </div>
                              </figure>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <span>
                                <span>Stock: </span>
                                {product.countInStock}
                              </span>
                              <br />
                              <span>
                                <span>Categoria: </span>
                                {product.category}
                              </span>
                            </div>
                            <div className="col-md-4 d-flex justify-content-lg-end">
                              <div>
                                <span className="price h6 me-4 text-success">
                                  ${product.price}
                                </span>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                  <i
                                    className="fas fa fa-edit icon-admin"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                                <a onClick={() => deleteHandler(product._id)}>
                                  <i
                                    className="fas fa fa-trash icon-admin"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                            </div>
                            <hr />
                            <br />
                          </article>
                        ))}
                      </div>
                    )}
                    <div>
                      <Paginate pages={pages} page={page} isAdmin={true} />
                    </div>
                  </div>
                </div>
              </article>
            </main>

            {/* aqui */}
          </div>

          <br />
          <br />
        </div>
      </section>
    </div>
  );
}

export default ProductListScreen;
