import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import routes from "../routes";
import Loading from "../Components/Loading";
export default function YourCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchCartProducts() {
      setLoading(true);
      const data = await axiosClient.get("/cartProducts?_expand=product");
      setLoading(false);
      setCartProducts([...data]);
    }
    fetchCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));
  let total = 0;
  cartProducts &&
    cartProducts.forEach((cartProduct) => {
      total += cartProduct.product.price * cartProduct.quantity;
    });
  function increaseQuantity(cartProduct) {
    const index = cartProducts.findIndex(
      (product) => product.id === cartProduct.id
    );
    if (cartProduct.quantity < cartProduct.product.inventory) {
      [...cartProducts][index].quantity = cartProduct.quantity + 1;
      setCartProducts([...cartProducts]);
    }
  }
  function decreaseQuantity(cartProduct) {
    const index = cartProducts.findIndex(
      (product) => product.id === cartProduct.id
    );
    if (cartProduct.quantity > 0) {
      [...cartProducts][index].quantity = cartProduct.quantity - 1;
      setCartProducts([...cartProducts]);
    }
  }
  function handleDeleteCartProduct(cartProduct) {
    const newCartsProduct = cartProducts.filter(
      (product) => product.id !== cartProduct.id
    );
    setCartProducts([...newCartsProduct]);
    async function deleteCartProduct() {
      setLoading(true);
      await axiosClient.delete(`/cartProducts/${cartProduct.id}`);
    }
    setLoading(false);
    deleteCartProduct();
  }
  return (
    <div style={{ margin: "50px" }}>
      {loading && <Loading />}
      <Header user={loginUser} />
      <div>
        <h1>Giỏ hàng của bạn</h1>
        {total === 0 ? (
          <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng còn lại</th>
                <th scope="col">Số lượng</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts &&
                cartProducts.map((cartProduct) => (
                  <tr key={cartProduct.id}>
                    <td>{cartProduct.product.title}</td>
                    <td>{`${cartProduct.product.price.toLocaleString()} VNĐ`}</td>
                    <td>{cartProduct.product.inventory}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className={`btn btn-outline-${
                            cartProduct.quantity !==
                            cartProduct.product.inventory
                              ? "primary"
                              : "secondary"
                          }`}
                          disabled={
                            cartProduct.quantity ===
                            cartProduct.product.inventory
                              ? "disable"
                              : ""
                          }
                          onClick={() => increaseQuantity(cartProduct)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                        <input
                          type="button"
                          value={cartProduct.quantity}
                          min="0"
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                        />
                        <button
                          type="button"
                          className={`btn btn-outline-${
                            cartProduct.quantity !== 0 ? "primary" : "secondary"
                          }`}
                          onClick={() => decreaseQuantity(cartProduct)}
                        >
                          <i className="bi bi-dash-lg"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <span
                        onClick={() => handleDeleteCartProduct(cartProduct)}
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          style={{ fontSize: "25px" }}
                          className="bi bi-trash-fill"
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <p>Tổng: {`${total.toLocaleString()} VNĐ`}</p>
        <button
          className="btn btn-primary"
          type="button"
          disabled={total === 0 ? "disabled" : ""}
          onClick={() =>
            navigate(`${routes.web.payment}/${cartProducts[0].userId}`)
          }
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
