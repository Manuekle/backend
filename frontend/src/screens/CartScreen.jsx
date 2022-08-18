import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
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
              Mi Carrito
            </li>
          </ol>
        </div>
      </section>

      <section className="padding-y bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card">
                <div className="content-body">
                  <h4 className="card-title mb-4">Su carrito de compras</h4>
                  <div>
                    {cartItems.length === 0 ? (
                      // <div className="alert alert-primary" role="alert">
                      //   Su carrito está vacío{" "}
                      //   <Link to="/">Regresar al inicio</Link>
                      // </div>
                      <div class="col-lg-12">
                        <article class="card">
                          <div class="card-body">
                            <figure
                              class="mt-4 mx-auto text-center"
                              style={{ maxWidth: "600px" }}
                            >
                              <span class="rounded-circle icon-md svg-icon-w">
                                <i class="fas fa-shopping-basket"></i>
                              </span>
                              <figcaption class="my-3">
                                <h4>Su carrito está vacío</h4>
                                <p>
                                  ¿No sabes qué comprar?
                                  <br />
                                  ¡Los Mangas te esperan!
                                </p>
                                <p>
                                  <Link
                                    to="/products"
                                    style={{ color: "#333" }}
                                  >
                                    Ir a la tienda!
                                  </Link>
                                </p>
                              </figcaption>
                            </figure>

                            <br />
                          </div>
                        </article>
                      </div>
                    ) : (
                      <div>
                        {cartItems.map((item) => (
                          <article className="row gy-3 mb-4" key={item.product}>
                            <div className="col-lg-5">
                              <figure className="itemside me-lg-5">
                                <div className="aside">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-sm img-thumbnail"
                                  />
                                </div>
                                <figcaption className="info">
                                  <Link
                                    to={`/product/${item.product}`}
                                    className="title"
                                  >
                                    {item.name}
                                  </Link>
                                  <p
                                    style={{
                                      textTransform: "capitalize",
                                    }}
                                    className="text-muted"
                                  >
                                    {" "}
                                    {item.category}
                                  </p>
                                </figcaption>
                              </figure>
                            </div>
                            <div className="col-auto">
                              <select
                                style={{ width: "100px" }}
                                className="form-select"
                                as="select"
                                value={item.qty}
                                onChange={(e) =>
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value)
                                    )
                                  )
                                }
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <div className="col-lg-2 col-sm-4 col-6">
                              <div className="price-wrap lh-sm">
                                <var className="price h6">
                                  ${item.qty * item.price}
                                </var>{" "}
                                <br />
                                <small className="text-muted">
                                  {" "}
                                  ${item.price}{" "}
                                </small>
                              </div>
                            </div>
                            <div className="col-lg col-sm-4">
                              <div className="float-lg-end">
                                <Button
                                  type="button"
                                  variant="light"
                                  onClick={() =>
                                    removeFromCartHandler(item.product)
                                  }
                                  className="btn btn-light text-danger"
                                >
                                  {" "}
                                  <i className="fa fa-trash"></i>
                                </Button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="content-body border-top">
                  <p>
                    <i className="me-2 text-muted fa-lg fa fa-truck"></i>Entrega
                    en 1-2 semanas
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
            <aside className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h2>
                    SUBTOTAL DE (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) MANGAS
                  </h2>
                  <hr />
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-end">
                      {" "}
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}{" "}
                    </dd>
                  </dl>

                  <div className="d-grid gap-2 my-3">
                    {cartItems.length === 0 ? (
                      <Link to="/" className="btn btn-light w-100">
                        {" "}
                        Volver a la tienda{" "}
                      </Link>
                    ) : (
                      <div>
                        {/* <ListGroup.Item> */}
                        <a
                          type="button"
                          className="btn-salir-sm btn-sesion btno-sm col-12"
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                        >
                          Comprar
                        </a>
                        {/* </ListGroup.Item> */}
                      </div>
                    )}
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

export default CartScreen;
