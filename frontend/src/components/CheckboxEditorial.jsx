import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function CheckboxEditorial() {
  const dispatch = useDispatch();

  const [editorials, setEditorials] = useState([]);
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  useEffect(() => {
    axios.get("/api/editorials").then((res) => {
      setEditorials(res.data);
    });
  }, [dispatch]);

  const handleEditorialChange = (e) => {
    const keyword = e.target.value;
    console.log(keyword);
    if (keyword) {
      history.push(`/products/?keyword=&editorial=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <div>
      {editorials.map((editorial) => (
        <li key={editorial._id}>
          <label class="form-check mb-2">
            <input
              onChange={handleEditorialChange}
              className="form-check-input"
              value={editorial.name}
              type="checkbox"
              name={editorial.name}
            />
            <span
              style={{
                textTransform: "capitalize",
              }}
              className="form-check-label"
            >
              {editorial.name}
            </span>
          </label>
        </li>
      ))}
    </div>
  );
}

export default CheckboxEditorial;
