import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header"
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
export default function Detail() {
  const navigate = useNavigate();
  const {productId} = useParams();
  const [quantity, setQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [product, setProduct] = useState({
    id: 1,
    image: "",
    title: "",
    author: "",
    price: 0,
    inventory: 0,
    category: "",
  });

  useEffect(() => {
    fetchProduct();
    fetchCartProducts();
  }, [productId]);
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"))
  async function fetchProduct() {
    const data = await axiosClient.get(`/products/${productId}`);
    setProduct(data);
  }
  async function fetchCartProducts() {
    const data = await axiosClient.get("/cartProducts");
    setCartProducts([...data]);
  }
  function increaseQuantity() {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  }
  function decreaseQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }
  function addToCart(product) {
    const index = cartProducts.findIndex(
      (cartProduct) => cartProduct.productId === product.id
    );
    if (index === -1) {
      const newCartProduct = {
        id: uuidv4(),
        quantity: quantity,
        userId: loginUser.id,
        productId: product.id,
        productPrice:product.price,
        productTitle:product.title,
        productInventory: product.inventory
      };
      setCartProducts([...cartProducts, { ...newCartProduct }]);
      async function addToCartProductsList() {
        await axiosClient.post("/cartProducts", {
          ...newCartProduct,
        });
        navigate(routes.web.cart)
      }
      addToCartProductsList();
    } else {
      const cartProductId = cartProducts[index].id;
      async function updateCartProductList() {
        await axiosClient.patch(`/cartProducts/${cartProductId}`, {
          quantity: quantity,
        });
        navigate(routes.web.cart)
      }
      updateCartProductList();
    }
  }
  return (
    <div style={{ margin: "50px" }}>
      <Header user={loginUser}/>
      <div className="container" style={{ height: "100px", marginTop: "50px" }}>
        <div className="row">
          <div className="col">
            <img
              src={product.image}
              alt="product"
              width="500px"
              height="500px"
            />
          </div>
          <div className="col">
            <div>
              <h3>{product.title}</h3>
              <h5>{`Tác giả: ${product.author}`}</h5>
            </div>
            <div>
              <p
                style={
                  quantity === product.inventory
                    ? { color: "red" }
                    : { color: "black" }
                }
              >{`Số lượng còn lại: ${product.inventory}`}</p>
              <p
                style={{ color: "#C92127", fontSize: "32px" }}
              >{`Giá: ${product.price.toLocaleString()} VNĐ`}</p>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => increaseQuantity()}
              >
                <i className="bi bi-plus"></i>
              </button>
              <input
                type="button"
                value={quantity}
                min="0"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                }}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => decreaseQuantity()}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
            <div style={{ marginTop: "30px" }}>
              <button
                type="button"
                className={`btn btn-${product.inventory!==0?"primary":"warning"}`}
                style={product.inventory===0?{color:"red",fontWeight:"bold"}:{color:"black"}}
                disabled={quantity === 0 ? "disabled" : ""}
                onClick={() => addToCart(product)}
              >
                {product.inventory !==0?"Add to cart":"Sold out"}
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
