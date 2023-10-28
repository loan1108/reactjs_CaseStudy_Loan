import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Components/Header";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import routes from "../routes";
export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState({ item: "" });
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));
  const [choosePage,setChoosePage] = useState(1);
  const [chooseCategory, setChooseCategory]= useState("all");
  const [totalPages,setTotalPages] = useState(null);
  useEffect(() => {
    fetchProducts();
    fetchProductsByPage();
    changeCategory()
  }, [choosePage,chooseCategory]);
  async function fetchProducts() {
    const data = await axiosClient.get(`/products`);
    setTotalPages(Math.ceil(data.length/10))
    setProducts([...data]);
  }
  function handleCategory(e) {
    // const category = e.target.getAttribute("category");
    setChooseCategory(e.target.getAttribute("category"))
    
  }
  function changeCategory(){
    if (chooseCategory === "all") {
      fetchProducts();
    } else {
      async function fetchProductsByCategory() {
        const data = await axiosClient.get(
          `/products?category_like=${chooseCategory}`
        );
        setTotalPages(Math.ceil(data.length/10))
        setProducts([...data]);
      }
      fetchProductsByCategory();
    }
  }
  function handleChange(e) {
    setSearchProduct({ ...setProducts, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    async function fetchSearchProducts() {
      const data = await axiosClient.get(`/products?q=${searchProduct.item}`);
      setProducts([...data]);
    }
    fetchSearchProducts();
  }
  async function fetchProductsByPage(){
    const data = await axiosClient.get(`/products?_page=${choosePage}&_limit=10`);
    setProducts([...data])
  }
  function changePage(e){
    setChoosePage(+e.target.getAttribute("page"))
    fetchProductsByPage()
  }
  function createPage() {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          className={`page-item ${choosePage===i?"active":""}`}
          style={{ cursor: "pointer" }}
          key={i}
        >
          <span className={"page-link"}  page={i} onClick={changePage}>
            {i}
          </span>
        </li>
      );
    }
    return pages;
  }
  return (
    <div style={{ margin: "50px" }}>
      <Header user={loginUser} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Khám phá kho sách</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="#navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li style={{ cursor: "pointer" }} className={`nav-item ${chooseCategory==="all"?"active":""}`} category="all" onClick={handleCategory}>
                Tất cả
              </li>
              <li
                style={{ cursor: "pointer" }}
                className={`nav-item ${chooseCategory==="aboard"?"active":""}`}
                category="aboard"
                onClick={handleCategory}
              >
                Văn học nước ngoài
              </li>

              <li
              style={{ cursor: "pointer" }}
                className={`nav-item ${chooseCategory==="vietNam"?"active":""}`}
                category="vietNam"
                onClick={handleCategory}
              >
                Văn học Việt Nam
              </li>

            </ul>
            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                className="form-control mr-sm-2"
                name="item"
                value={searchProduct.item}
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  width: "500px",
                  display: "inline-block",
                  marginRight: "20px",
                }}
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="grid-container">
        {products &&
          products.map((product) => (
            <div className="grid-item" key={product.id}>
              <div className="card" style={{ width: "18rem", height: "26rem" }}>
                <img
                  className="card-img-top"
                  style={{ height: "15rem" }}
                  src={product.image}
                  alt="Card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p>{product.price.toLocaleString()} VNĐ</p>
                </div>
                <Link
                  to={`${routes.web.detail}/${product.id}`}
                  className="btn btn-primary"
                >
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">{createPage()}</ul>
      </nav>
    </div>
  );
}
