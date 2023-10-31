import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Components/Header";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import routes from "../routes";
import Loading from "../Components/Loading";
import qs from 'query-string'
import LoginRequest from "../Components/LoginRequest";
let totalPages = 1;
export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));
  const[loading, setLoading] = useState(false);

  const [queryString, setQueryString] = useState({
    _page: 1,
    _limit: 10,
    category_like: 'all',
    q: ''
  })

  useEffect(() => {
    async function fetchTotalData(){
      let totalData;
      if(queryString.category_like!=="all"){
        totalData = await axiosClient.get(`/products?category_like=${queryString.category_like}&q=${queryString.q}`)
      }else{
        totalData = await axiosClient.get(`/products?q=${queryString.q}`)
      }
      totalPages=Math.ceil(totalData.length/10)
      
    }
    fetchTotalData()
    async function fetchData() {
      setLoading(true)
      let data;
      if (queryString.category_like !== 'all') {
        data = await axiosClient.get(`/products?${qs.stringify(queryString)}`);
      }
      else {
        const filtered = {...queryString};
        delete filtered.category_like;
        data = await axiosClient.get(`/products?${qs.stringify(filtered)}`);
      }
      
      setLoading(false)
      setProducts([...data]);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString._page, queryString._limit, queryString.category_like]);

 

  function handleCategory(name) {
    setQueryString({
      ...queryString,
      _page: 1,
      category_like: name
    })
  }

  function handleChange(e) {
    setQueryString({
      ...queryString,
      q: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function fetchSearchProducts() {
      setLoading(true);
      const data = await axiosClient.get(`/products?q=${queryString.q}&page=1&limit=10`);
      setLoading(false)
      setProducts([...data]);
    }
    fetchSearchProducts();
  }


  function changePage(e) {
    console.log()
    setQueryString({
      ...queryString,
      _page: +e.target.getAttribute("page")
    })
  }

  function createPage() {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          className={`page-item ${queryString._page !==i ? "" : "active"}`}
          style={{ cursor: "pointer" }}
          key={i}
        >
          <span className={"page-link"} page={i} onClick={changePage}>
            {i}
          </span>
        </li>
      );
    }
    return pages;
  }
  if(!loginUser){
    return <LoginRequest/>
  }else{
    return (
      <div style={{ margin: "50px" }}>
        
        {loading&&<Loading/>}
        <Header user={loginUser} />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand">Khám phá kho sách</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="#navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  style={{ cursor: "pointer" }}
                  className={`nav-item ${
                    queryString.category_like === "all" ? "active" : ""
                  }`}
                  onClick={() => handleCategory('all')}
                >
                  Tất cả
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className={`nav-item ${
                    queryString.category_like === "aboard" ? "active" : ""
                  }`}
                  onClick={() => handleCategory('aboard')}
                >
                  Văn học nước ngoài
                </li>
  
                <li
                  style={{ cursor: "pointer" }}
                  className={`nav-item ${
                    queryString.category_like === "vietNam" ? "active" : ""
                  }`}
                  onClick={() => handleCategory('vietNam')}
                >
                  Văn học Việt Nam
                </li>
              </ul>
              <form className="d-flex" onSubmit={handleSubmit}>
                <input
                  className="form-control mr-sm-2"
                  name="item"
                  value={queryString.q}
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
      </div>)
  }
 
  ;
}