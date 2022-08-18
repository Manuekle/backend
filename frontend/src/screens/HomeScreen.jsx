import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import LoaderProduct from "../components/LoaderProduct";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  let keyword = history.location.search;
  console.log(keyword);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {/* {!keyword && <ProductCarousel />} */}
      
      {loading ? (
        <section className="padding-y">
          <div className="container">
            <header className="section-heading">
              <h1 className="section-title">Nuevos productos</h1>
            </header>
            <LoaderProduct />
          </div>
        </section>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>          
          <section className="padding-y">
            <div className="container">
              <header className="section-heading">
                <h1 className="section-title">Nuevos productos</h1>
              </header>
              <div className="row">
                {products.map((product) => (
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div key={product._id}>
                      <Product product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </div>           
          </section>
        </div>
      )}
      
      {!keyword && (
        <div>
          {/* <ProductCarousel /> */}
          <section class="padding-y bg-light">
            <div class="container">
              <div class="row gy-3">
                <div class="col-lg-3 col-md-6">
                  <article class="card card-body">
                    <figure class="text-center mx-lg-4">
                      <span class="rounded-circle text-secondary icon-md bg-secondary-light">
                        <i class="fa fa-star"></i>
                      </span>
                      <figcaption class="pt-3">
                        <h6 class="title">Vocational Training</h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod{" "}
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                </div>
                <div class="col-lg-3 col-md-6">
                  <article class="card card-body">
                    <figure class="text-center mx-lg-4">
                      <span class="rounded-circle text-warning icon-md bg-warning-light">
                        <i class="fa fa-thumbs-up"></i>
                      </span>
                      <figcaption class="pt-3">
                        <h6 class="title">Creative Strategy </h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod{" "}
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                </div>
                <div class="col-lg-3 col-md-6">
                  <article class="card card-body">
                    <figure class="text-center mx-lg-4">
                      <span class="rounded-circle text-success icon-md bg-success-light">
                        <i class="fa fa-box"></i>
                      </span>
                      <figcaption class="pt-3">
                        <h6 class="title">Experienced Teachers</h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod{" "}
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                </div>
                <div class="col-lg-3 col-md-6">
                  <article class="card card-body">
                    <figure class="text-center mx-lg-4">
                      <span class="rounded-circle text-danger icon-md bg-danger-light">
                        <i class="fa fa-box"></i>
                      </span>
                      <figcaption class="pt-3">
                        <h6 class="title">Experienced Teachers</h6>
                        <p class="mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod{" "}
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
