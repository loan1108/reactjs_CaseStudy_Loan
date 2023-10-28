import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar"
import axiosClient from "../api/axiosClient";
export default function Products(props) {
  const [products,setProducts]= useState([])
  useEffect(()=>{
    async function fetchProducts(){
      const data = await axiosClient.get("/products"); 
      setProducts([...data])
    }
    fetchProducts();
  },[])
  return (
    <div>
      <Navbar products={products}/>
      <div className="grid-container">
        {products &&
          products.map((product) => (
            <div className="grid-item" key={product.id}>
              <div className="card" style={{ width: "18rem", height: "26rem" }}>
                <img
                  className="card-img-top"
                  style={{ height: "15rem" }}
                  src={product.image}
                  alt="Card image cap"
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
    </div>
  );
}
