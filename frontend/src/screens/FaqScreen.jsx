import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";

function FaqScreen() {
  return (
    <div>
      <section className="bg-nav padding-y-sm">
        <div className="container">
          <ol className="breadcrumb ondark mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>            
            <li className="breadcrumb-item active" aria-current="page">
              FAQs
            </li>
          </ol>
        </div>
      </section>
      <section class="padding-y bg-light">
        <div class="container">
          <div class="row">
            <main class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">FAQs</h4>

                  <div class="accordion accordion-flush" id="accordion_faq">
                    <article class="accordion-item">
                      <h4 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#content_faq_1"
                        >
                          Why is botstrap ecommerce ui kit is good?
                        </button>
                      </h4>
                      <div
                        id="content_faq_1"
                        class="accordion-collapse collapse show"
                        data-bs-parent="#accordion_faq"
                      >
                        <div class="accordion-body">
                          The answer is simple just like lorem ipsum dolor sit
                          amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur.
                        </div>
                      </div>
                    </article>
                    <article class="accordion-item">
                      <h4 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#content_faq_2"
                        >
                          How can I implement to my work?
                        </button>
                      </h4>
                      <div
                        id="content_faq_2"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordion_faq"
                      >
                        <div class="accordion-body">
                          Placeholder content for this accordion, which is
                          intended to demonstrate the class. This is the second
                          item's accordion body. Let's imagine this being filled
                          with some actual content. Ut enim ad minim veniam,
                          quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                        </div>
                      </div>
                    </article>
                    <article class="accordion-item">
                      <h4 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#content_faq_3"
                        >
                          Can you give a refunds if I don’t like?
                        </button>
                      </h4>
                      <div
                        id="content_faq_3"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordion_faq"
                      >
                        <div class="accordion-body">
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. This is the third item's accordion body.
                          Nothing more exciting happening here in terms of
                          content, but just filling up the space to make it
                          look, at least at first glance, a bit more
                          representative of how this would look in a real-world
                          application.
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </main>
            <aside class="col-lg-4">
              <div class="card">
                <article class="p-4 p-xl-5 text-center">
                  <img src={avatar} class="img-avatar img-md" />
                  <h6 class="card-title mt-3">Soporte Técnico</h6>
                  <p>
                    Telefono: +57 310 5008660 <br />
                    Correo: support@manganiacos.com
                  </p>
                  <a
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=%2B573105008660&fbclid=IwAR1XaLAHq413bHzzoedPPJJxIKSVUDMAoj1_8oIEe7nUnr2Craa19sytDKo"
                    class="btn-salir-sm btn-sesion btno-sm col-6"
                  >
                    {" "}
                    Comenzar un chat{" "}
                  </a>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
export default FaqScreen;
