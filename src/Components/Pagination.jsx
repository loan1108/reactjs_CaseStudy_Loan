import React from "react";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actionTypes";
export default function Pagination() {
  const products = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch()
  const perPage = 10;
  function changePage(e){
    console.log(+e.target.getAttribute("page"))
    dispatch({type:actionTypes.CHANGE_PAGE, payload:+e.target.getAttribute("page")})
  }
  function createPage() {
    const totalPages = Math.ceil(products.length / perPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          className={`page-item`}
          style={{ cursor: "pointer" }}
          key={i}
        >
          <a className="page-link" page={i} onClick={changePage}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">{createPage()}</ul>
    </nav>
  );
}
