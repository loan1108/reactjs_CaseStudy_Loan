import React from "react";
import routes from "../routes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/js/dist/dropdown.js";
export default function Header(props) {
  const navigate = useNavigate();
  return (
    <div className="header d-flex justify-content-between">
      <h1>
        <Link
          to={routes.web.home}
          style={{ textDecoration: "none", color: "black" }}
        >
          HIỆU SÁCH VĂN HỌC
        </Link>
      </h1>
      <div className="d-flex justify-content-between">
        <div className="dropdown ">
          <p
            className="btn btn-info dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Welcome {props.user.userName}
          </p>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <Link
              to={`${routes.web.history}/${props.user.id}`}
              className="dropdown-item"
              style={{ textDecoration: "none", color: "black" }}
            >
              Lịch sử mua hàng
            </Link>
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem("loginUser");
                navigate(routes.web.login);
              }}
              className="dropdown-item"
              style={{ textDecoration: "none", color: "black" }}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          <Link
            to={routes.web.cart}
            className="btn btn-danger"
            style={{ float: "right" }}
          >
            <i className="bi bi-cart ">Giỏ hàng</i>
          </Link>
        </div>
      </div>
    </div>
  );
}
