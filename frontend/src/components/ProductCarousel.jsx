import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    ""
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <section class="section-intro pt-3">
      <div class="container">
        <div
          class="card-banner p-5"
          style={{ minWidth: "520px", backgroundColor: "#333" }}
        >
          
          <div class="col-lg-4 order-lg-2">
            <div class="col-lg-12">
              <article
                class="card-banner p-5"
                style={{ height: "350px", backgroundColor: "#333" }}
              >
                <div style={{ maxWidth: "500px" }}>
                  <h2 class="text-white">
                    Los Mangas <br/>Mas Comprados
                    {/* {product.name} <br /> ${product.price}{" "} */}
                  </h2>
                  <p class="text-white">
                    Queremos que te guste nuestros mangas, por eso te recomendamos los mas vendidos.  <br />                    
                  </p>
                  <Link
                      to="/products"
                      class="btn-salir-sm btn-home btno-sm col-6"
                    >
                      Ver más mangas
                    </Link>
                </div>
              </article>
            </div>
          </div>

          <div class="container">
            <Carousel pause="hover">
              {products.map((product) => (
                <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className="carousel.caption"></Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>

    // <Carousel pause='hover'>
    //     {products.map(product => (
    //         <Carousel.Item key={product._id}>
    //             <Link to={`/product/${product._id}`}>
    //                 <Image src={product.image} alt={product.name} fluid />
    //                 <Carousel.Caption className='carousel.caption'>
    //                     <h4>{product.name} (${product.price})</h4>
    //                 </Carousel.Caption>
    //             </Link>
    //         </Carousel.Item>
    //     ))}
    // </Carousel>
  );
}

export default ProductCarousel;
