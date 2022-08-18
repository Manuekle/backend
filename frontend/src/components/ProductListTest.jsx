import React from "react";
import ProductTest from "./ProductTest";

function ProductListTest(props) {
    const { products } = props;
    const renderProducts = products.map(({ _id, category }) => {
        return (
          <li key={_id}>
            <ProductTest category={category} />
          </li>
        );
      });
  return (
    <ul>{renderProducts}</ul>
  );
}
export default ProductListTest;