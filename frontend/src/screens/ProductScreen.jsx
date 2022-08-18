import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  listTopProducts,
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

import avatar from "../assets/images/avatar.jpg";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products } = productTopRated;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listTopProducts());
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      {loading ? (
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
                  <Link to="/profile">Tienda</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </div>
          </section>
          <section className="padding-y shadow-sm">
            <div className="container">
              <div className="card">
                <div className="content-body">
                  <div className="row">
                    <aside className="col-lg-5">
                      <article className="gallery-wrap">
                        <a className="img-big-wrap">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="rounded"
                          />
                        </a>
                      </article>
                    </aside>
                    <div className="col-lg-4">
                      <article>
                        <h2 className="title mb-1"> {product.name} </h2>
                        <p className="text-success">
                          {product.countInStock > 0 ? (
                            <span className="badge bg-success">Disponible</span>
                          ) : (
                            <span className="badge bg-danger">
                              No Disponible
                            </span>
                          )}
                        </p>
                        <div className="rating-wrap mb-2">
                          {/* <b className="label-rating text-warning"> 4.5</b>
                          <i className="dot"></i> */}
                          <span className="label-rating text-muted">
                            <i
                              className="fa fa-comment"
                              style={{ marginRight: "10px" }}
                            ></i>
                            {product.numReviews} Comentarios
                          </span>
                        </div>
                        <div className="rating-wrap mb-2">
                          <span
                            className="label-rating text-muted"
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            <i
                              className="fa fa-tag"
                              style={{ marginRight: "10px" }}
                            ></i>
                            {product.category}
                          </span>
                        </div>

                        <p>{product.description}</p>
                      </article>
                    </div>
                    <aside className="col-lg-3">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <div className="mb-3">
                            <var className="price h5">
                              Precio: ${product.price}
                            </var>
                          </div>
                          {product.countInStock > 0
                            ? ""
                            : "Lo siento esta producto no esta disponible"}

                          <form>
                            <div className="d-flex align-items-center mb-3">
                              {product.countInStock > 0 && (
                                <select
                                  style={{ width: "100px" }}
                                  className="form-select"
                                  as="select"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              )}
                            </div>
                          </form>
                          {product.countInStock > 0 ? (
                            <div className="mb-4">
                              <a
                                onClick={addToCartHandler}
                                className="btn-salir-sm btn-sesion btno-sm col-12"
                                disabled={product.countInStock == 0}
                                type="button"
                              >
                                Añadir al carrito
                              </a>
                            </div>
                          ) : (
                            ""
                          )}

                          <ul className="list-icon">
                            <li>
                              <i className="icon fa fa-truck"></i> Envíos a todo
                              el país
                            </li>
                            <li>
                              <i className="icon fa fa-lock"></i> Pago Seguro
                            </li>
                            <li>
                              <i className="icon fa fa-star"></i> Producto
                              Original
                            </li>
                          </ul>
                        </div>
                      </div>
                    </aside>
                  </div>
                  <section className="padding-y">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="card mb-4">
                            <div className="card-body">
                              <h5 className="card-title">Comentarios </h5>
                              <hr />
                              {product.reviews.length == 0 ? (
                                <p>No hay comentarios</p>
                              ) : (
                                <div>
                                  {product.reviews.map((review) => (
                                    <blockquote
                                      className="border-bottom"
                                      key={review._id}
                                    >
                                      <div className="float-lg-end d-flex mb-3">
                                        <div className="btn-group d-inline-flex me-2">
                                          <button
                                            className="btn btn-light btn-sm float-end"
                                            data-bs-toggle="tooltip"
                                            data-bs-title="Like"
                                          >
                                            <i className="fa fa-thumbs-up"></i>
                                          </button>
                                          <button
                                            className="btn btn-light btn-sm float-end"
                                            data-bs-toggle="tooltip"
                                            data-bs-title="Dislike"
                                          >
                                            <i className="fa fa-thumbs-down"></i>
                                          </button>
                                        </div>
                                        <button className="btn btn-light btn-sm float-end ">
                                          <i className="fa fa-ellipsis-v"></i>
                                        </button>
                                      </div>
                                      <div className="icontext">
                                        <img
                                          src={avatar}
                                          className="img-xs icon rounded-circle"
                                        />
                                        <div className="text">
                                          <h6 className="mb-0">
                                            {review.name}
                                          </h6>
                                          <div className="rating-wrap">
                                            <ul className="rating-stars">
                                              <Rating
                                                value={review.rating}
                                                color={"#ff8100 "}
                                              />
                                            </ul>
                                            <b className="dot"></b>
                                            <small className="label-rating text-muted">
                                              comentado el{" "}
                                              {review.createdAt.substring(
                                                0,
                                                10
                                              )}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-3">
                                        <p>{review.comment}</p>
                                      </div>
                                    </blockquote>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">Comentar </h5>
                              {loadingProductReview && <Loader />}
                              {successProductReview && (
                                <Message variant="success">
                                  Review Submitted
                                </Message>
                              )}
                              {errorProductReview && (
                                <Message variant="danger">
                                  {errorProductReview}
                                </Message>
                              )}
                              {userInfo ? (
                                <form onSubmit={submitHandler}>
                                  <div className="mb-3">
                                    <textarea
                                      className="form-control"
                                      placeholder="Escribe un comentario"
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    ></textarea>
                                  </div>

                                  <div className="row mb-3 gy-2 gx-3 align-items-center">
                                    <div className="col-lg-3">
                                      <select
                                        className="form-select"
                                        value={rating}
                                        onChange={(e) =>
                                          setRating(e.target.value)
                                        }
                                      >
                                        <option value="">Calificar</option>
                                        <option value="1">😠</option>
                                        <option value="2">😟</option>
                                        <option value="3">😐</option>
                                        <option value="4">🙂</option>
                                        <option value="5">😀</option>
                                      </select>
                                    </div>
                                  </div>

                                  <button
                                    disabled={loadingProductReview}
                                    type="submit"
                                    class="exp-btn"
                                  >
                                    <a
                                      type="button"
                                      className="btn-salir-sm btn-sesion btno-sm col-12"
                                    >
                                      Enviar
                                    </a>
                                  </button>
                                </form>
                              ) : (
                                <Message variant="info">
                                  Por Favor{" "}
                                  <Link to="/login">Inicia Sesion</Link> para
                                  escribir un comentario
                                </Message>
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <article class="card">
                            <div class="card-body">
                              <h5 class="card-title mb-3">
                                Mangas Recomendados
                              </h5>
                              <hr />
                              {products.map((rated) => (
                                <article class="itemside mb-3" key={rated._id}>
                                  <Link
                                    to={`/product/${rated._id}`}
                                    class="aside"
                                  >
                                    <img
                                      src={rated.image}
                                      alt={rated.name}
                                      class="img-md img-thumbnail"
                                    />
                                  </Link>
                                  <div class="info">
                                    <Link
                                      to={`/product/${rated._id}`}
                                      class="title mb-1"
                                    >
                                      {" "}
                                      {rated.name}{" "}
                                    </Link>
                                    <div class="price"> ${rated.price}</div>
                                  </div>
                                </article>
                              ))}
                            </div>
                          </article>
                        </div>
                      </div>

                      <br />
                      <br />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
