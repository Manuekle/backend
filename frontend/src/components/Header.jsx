import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

import img from "../assets/images/manganiacos.jpg";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header className="section-header border-bottom">
        <section className="header-top-light border-bottom">
          <div className="container">
            <nav className="d-flex justify-content-between align-items-center flex-column flex-md-row top_bar_content">
              <div className="nav ml-auto">
                <span className="title social_title">Visítanos</span>
                <a
                  target="_blank"
                  href="https://www.facebook.com/Manganiacos-Company-Colombia-100972065815130/?ref=page_internal"
                  className="nav-link p-2"
                >
                  <i
                    style={{ fontSize: "14px !important" }}
                    className="fab fa-lg fa-facebook"
                  ></i>
                </a>
              </div>
            </nav>
          </div>
        </section>
      </header>
      <header className="section-header border-bottom">
        <nav className="navbar navbar-expand-lg" style={{ background: "#333" }}>
          <div className="container">
            <Link to="/" className="mr-auto">
              <img
                src={img}
                className="rounded-circle"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>

            <div className="order-lg-last flex-shrink-0">
              {userInfo ? (
                <div>
                  <Link to="/cart">
                    <i className="fas fa-shopping-cart icon-store"></i>
                  </Link>
                  <Link to="/profile">
                    <i className="fas fa-store icon-store"></i>
                  </Link>
                </div>
              ) : (
                <Link to="/login">
                  <i className="fas fa-user-circle icon-store"></i>
                </Link>
              )}
            </div>

            <div className="collapse navbar-collapse" id="navbar_main">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link nav-link-header" to="/">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-header" to="/products">
                    Tienda
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link nav-link-header" to="/contact">
                    Contactanos
                  </Link>
                </li> */}

                <li className="nav-item">
                  <Link className="nav-link nav-link-header" to="/faq">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
