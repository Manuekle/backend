import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function PaginateProducts({ pages, page, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  return (
    pages > 1 && (
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="pagination_shop">
              <ul class="page ula">
                {[...Array(pages).keys()].map((x) => (
                  <li>
                    <LinkContainer                      
                      key={x + 1}
                      to={`/products/?keyword=${keyword}&page=${x + 1}`}
                    >
                      <Pagination.Item active={x + 1 === page}>
                        {x + 1}
                      </Pagination.Item>
                    </LinkContainer>                    
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PaginateProducts;
