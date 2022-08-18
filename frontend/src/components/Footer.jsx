import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/manganiacos.jpg";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer_body">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 footer_col">
                <div className="newsletter_container d-flex flex-column align-items-start justify-content-end">
                  <div className="footer_logo mb-5">
                    <a href="#">
                      <div className="logo_text">
                        <img
                          className="rounded-circle"
                          style={{ width: "100px", height: "100px" }}
                          src={img}
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                  <div className="footer_title">Recibir Notificaciones</div>
                  <form
                    action="#"
                    id="newsletter_form"
                    className="newsletter_form"
                  >
                    <input
                      type="email"
                      className="newsletter_input"
                      placeholder="Correo Electronico"
                      required="required"
                    />
                    <button className="newsletter_button">
                      <i
                        className="fa fa-long-arrow-alt-right row"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-2 offset-lg-3 footer_col">
                <div>
                  <div className="footer_title">Acerca de Nosotros</div>
                  <ul className="footer_list ula">
                    <li>
                      <a href="#">Contactanos</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 footer_col">
                <div className="footer_title">Ayuda & Soporte</div>
                <ul className="footer_list ula">
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 footer_col clearfix">
                <div>
                  <div className="footer_title">Términos & Condiciones</div>
                  <ul className="footer_list ula">
                    <li>
                      <a href="#">Términos</a>
                    </li>
                    <li>
                      <a href="#">Condiciones</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="copyright_content d-flex flex-md-row flex-column align-items-md-center align-items-start justify-content-start">
                  <div className="cr">
                    Copyright &copy; 2022 - 2022 Todos los derechos reservados |{" "}
                    <a
                      className="manuel"
                      target="_blank"
                      href="https://github.com/Manuekle"
                    >
                      <span>
                        <i
                          className="fas fa-heart"
                          style={{ fontSize: "11px" }}
                        ></i>
                        {" "}Manuekle
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
