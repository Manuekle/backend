import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import FormContainer from "../components/FormContainer";
import {
  listCategories,
  listProductDetails,
  updateProduct,
} from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [editorial, setEditorial] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const [categories, setCategories] = useState([]);
  const [editorials, setEditorials] = useState([]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setEditorial(product.editorial);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }

    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });

    axios.get("/api/editorials").then((res) => {
      setEditorials(res.data);
    });
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        editorial,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
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
              Editar Productos
            </li>
          </ol>
        </div>
      </section>
      <br />
      <div className="container col-lg-6 col-md-8">
        <article className="card">
          <div className="card-body">
            <h2 className="card-title"> Editar Producto </h2>
            {/* <hr /> */}
            <aside className="col-lg-12">
              <div className="card mb-4">
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                  <Message variant="danger">{errorUpdate}</Message>
                )}
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <article className="card-body">
                    <form onSubmit={submitHandler}>
                      <div className="row mb-4">
                        <label className="col-3 col-form-label">Nombre</label>
                        <div className="col-9">
                          <input
                            className="form-control"
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label className="col-3 col-form-label">Stock</label>
                        <div className="col-9">
                          <input
                            type="number"
                            placeholder="Enter stock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label className="col-3 col-form-label">Precio</label>
                        <div className="col-9">
                          <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label className="col-3 col-form-label">
                          Imagen <br />
                          <small className="text-muted">(Max 10 mb)</small>
                        </label>

                        <div className="col-9">
                          <div className="gallery-uploader-wrap">
                            <label
                              style={{ width: "100px", height: "100px" }}
                              className="uploader-img"
                            >
                              {image === "Image was uploaded" ? (
                                <div>
                                  <i class="fas fa-check"></i>
                                </div>
                              ) : (
                                <>
                                  <img
                                    onChange={(e) => setImage(e.target.value)}
                                    src={image}
                                    value={image}
                                    alt="product"
                                  />
                                </>
                              )}
                            </label>

                            <label
                              style={{ width: "100px", height: "100px" }}
                              className="uploader-img"
                            >
                              <input
                                type="file"
                                id="image-file"
                                label="Choose File"
                                custom
                                onChange={uploadFileHandler}
                                name="lorem"
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#999"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M16.83 4L15 2H9L7.17 4H2v16h20V4h-5.17zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                              </svg>
                            </label>
                            {uploading && <Loader />}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label className="col-3 col-form-label">
                          Descripción
                        </label>
                        <div className="col-9">
                          <textarea
                            className="form-control"
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label className="col-3 col-form-label">Brand</label>
                        <div className="col-9">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label className="col-3 col-form-label">
                          Categoria
                        </label>
                        <div className="col-9">
                          <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Seleccione una categoria</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <label className="col-3 col-form-label">
                          Editorial
                        </label>
                        <div className="col-9">
                          <select
                            className="form-control"
                            value={editorial}
                            onChange={(e) => setEditorial(e.target.value)}
                          >
                            <option value="">Seleccione una editorial:</option>
                            {editorials.map((editorial) => (
                              <option key={editorial._id} value={editorial._id}>
                                {editorial.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-9 offset-3">
                          <button type="submit" class="exp-btn">
                            <a
                              type="button"
                              className="btn-salir btn-sesion btno"
                            >
                              Actualizar
                            </a>
                          </button>
                        </div>
                      </div>
                    </form>
                  </article>
                )}
              </div>
            </aside>
          </div>
        </article>
      </div>
      <br />
    </div>
  );
}

export default ProductEditScreen;
