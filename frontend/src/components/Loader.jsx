import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="nezuko">
      <img
        class="run"
        src="https://userstyles.org/style_screenshots/204108_after.gif"
        alt="nezuko"
      />
    </div>
    // <Spinner
    //   animation="border"
    //   role="status"
    //   style={{
    //     color: "#333 !important",
    //     height: "80px",
    //     width: "80px",
    //     margin: "auto",
    //     display: "block",
    //   }}
    // >
    //   <span className="sr-only">Loading...</span>
    // </Spinner>
  );
}

export default Loader;
