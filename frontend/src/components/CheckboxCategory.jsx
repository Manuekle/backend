import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function CheckboxCategory() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const keyword = e.target.value;
    console.log(keyword);
    if (keyword) {
      history.push(`/products/?keyword=&category=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <div>
      {categories.map((category) => (
        <li key={category._id}>
          <label class="form-check mb-2">
            <input
              onChange={handleCategoryChange}
              className="form-check-input"
              value={category.name}
              type="checkbox"
              name={category.name}
            />
            <span
              style={{
                textTransform: "capitalize",
              }}
              className="form-check-label"
            >
              mangas {category.name}
            </span>
          </label>
        </li>
      ))}
    </div>
  );
}

export default CheckboxCategory;
