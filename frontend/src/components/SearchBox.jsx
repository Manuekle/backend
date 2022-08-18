import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/products/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <form class="mx-auto w-100 mb-3" onSubmit={submitHandler} inline>
      <div class="row g-2 w-100">
        <div class="col flex-grow">
          <div class="input-group">
            <input
              type="text"
              placeholder="Buscar tu manga favorito..."
              onChange={(e) => setKeyword(e.target.value)}
              class="form-control"
              name="q"
            />
          </div>
        </div>
        <div class="col-auto">
          <button class="btn-salir-sm btn-sesion btno-sm" type='submit'>
            <i class="fa fa-search"></i>
          </button>
        </div>        
      </div>
    </form>
  );
}

export default SearchBox;
