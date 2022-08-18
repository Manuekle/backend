import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product(props) {

  const {product} = props;
  return (
    <figure className="card card-product-grid">
      <div className="img-wrap">
        <Link to={`/product/${product._id}`}>
          <img className="imgs" src={product.image} alt={product.name} />
        </Link>
      </div>
      <figcaption className="info-wrap">
        <span className="topbar">
          {product.countInStock > 0 ? (
            <span className="badge bg-success"> Disponible </span>
          ) : (
            <span className="badge bg-danger"> No Disponible </span>
          )}
        </span>

        {product.category}

        <p className="title">{product.name}</p>
        <div className="rating-wrap">
          <Rating value={product.rating} color={"#ff8100"} />
        </div>
      </figcaption>

      <div className="bottom-wrap">
        <Link to={`/product/${product._id}`} className="float-end cart-shop">
          <i className="fas fa-cart-plus"></i>
        </Link>
        <div className="price-wrap lh-sm">
          <strong className="price"> ${product.price} </strong> <br />
          <small className="text-muted">$10 / per month </small>
        </div>
      </div>
    </figure>
  );
}

export default Product;
