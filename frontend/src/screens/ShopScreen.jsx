import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import LoaderProduct from "../components/LoaderProduct";
import Message from "../components/Message";
import PaginateProducts from "../components/PaginateProducts";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import CheckboxCategory from "../components/CheckboxCategory";
import CheckboxEditorial from "../components/CheckboxEditorial";

function ShopScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && (
        <div>
          <section className="bg-nav padding-y-sm">
            <div className="container">
              <ol className="breadcrumb ondark mb-0">
                <li className="breadcrumb-item">
                  <Link to="/">Inicio</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Tienda
                </li>
              </ol>
            </div>
          </section>
        </div>
      )}
      {loading ? (
        <div>
          <section class="padding-y">
            <div class="container">
              <div class="row">
                <aside class="col-lg-3">
                  <button
                    class="btn btn-outline-secondary mb-3 w-100  d-lg-none"
                    data-bs-toggle="collapse"
                    data-bs-target="#aside_filter"
                  >
                    Mostrar
                  </button>

                  <div id="aside_filter" class="collapse card d-lg-block mb-5">
                    <article class="filter-group">
                      <header class="card-header">
                        <a
                          href="#"
                          class="title"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse_aside1"
                        >
                          <i class="icon-control fa fa-chevron-down"></i>{" "}
                          Categorías
                        </a>
                      </header>
                      <div class="collapse show" id="collapse_aside1"></div>
                    </article>

                    <article class="filter-group">
                      <header class="card-header">
                        <a
                          href="#"
                          class="title"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse_aside_brands"
                        >
                          <i class="icon-control fa fa-chevron-down"></i>{" "}
                          Editoriales
                        </a>
                      </header>
                      <div
                        class="collapse show"
                        id="collapse_aside_brands"
                      ></div>
                    </article>
                  </div>
                </aside>
                <main class="col-lg-9">
                  <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                    <strong class="d-block py-2">
                      {products.length} Artículos encontrados{" "}
                    </strong>
                  </header>
                  <LoaderProduct />
                  <hr />
                </main>
              </div>
            </div>
          </section>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <section class="padding-y">
            <div class="container">
              <div class="row">
                <aside class="col-lg-3">
                  <button
                    class="btn btn-outline-secondary mb-3 w-100  d-lg-none"
                    data-bs-toggle="collapse"
                    data-bs-target="#aside_filter"
                  >
                    Mostrar
                  </button>

                  <div id="aside_filter" class="collapse card d-lg-block mb-5">
                    <article class="filter-group">
                      <header class="card-header">
                        <Link
                          class="title"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse_aside1"
                        >
                          <i class="icon-control fa fa-chevron-down"></i>{" "}
                          Categorías
                        </Link>
                      </header>
                      <div class="collapse show" id="collapse_aside1">
                        <div class="card-body">
                          <ul class="list-menu">
                            <CheckboxCategory />
                          </ul>
                        </div>
                      </div>
                    </article>

                    <article class="filter-group">
                      <header class="card-header">
                        <Link
                          class="title"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse_aside_brands"
                        >
                          <i class="icon-control fa fa-chevron-down"></i>{" "}
                          Editoriales
                        </Link>
                      </header>
                      <div class="collapse show" id="collapse_aside_brands">
                        <div class="card-body">
                          <ul class="list-menu">
                            <CheckboxEditorial />
                          </ul>
                        </div>
                      </div>
                    </article>
                  </div>
                </aside>
                <main class="col-lg-9">
                  <header class="d-sm-flex align-items-center pb-3">
                    <SearchBox />
                  </header>
                  <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                    <strong class="d-block py-2">
                      {products.length} Artículos encontrados{" "}
                    </strong>
                  </header>
                  <div className="row">
                    {products.map((product) => (
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div>
                          <Product product={product} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <PaginateProducts
                    page={page}
                    pages={pages}
                    keyword={keyword}
                  />

                  {products.length === 0 && (
                    <div className="text-center">
                      <h3>No hay artículos para mostrar</h3>
                    </div>
                  )}

                  <hr />
                </main>
              </div>
            </div>
          </section>
        </div>
      )}
      {!keyword && <div></div>}
    </div>
  );
}

export default ShopScreen;
