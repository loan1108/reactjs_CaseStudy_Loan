import React from "react";

export default function Navbar(props) {

  function handleSubmit(){}
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light  "
      style={{ paddingLeft: "20px",paddingRight:"20px" }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" >
              <span className="sr-only"> Văn học nước ngoài</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" >
              Văn học Việt Nam
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 " onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{
              width: "500px",
              display: "inline-block",
              marginRight: "20px",
            }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
