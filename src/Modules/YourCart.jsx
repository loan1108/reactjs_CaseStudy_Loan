import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import routes from "../routes";
import Loading from "../Components/Loading";
import LoginRequest from "../Components/LoginRequest";
// import { v4 as uuidv4 } from "uuid";
export default function YourCart() {
  const [cartProductsByUser, setCartProductsByUser] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let total = 0;
  useEffect(() => {
    async function fetchCartProductsByUser() {
      setLoading(true);
      const data = await axiosClient.get(
        `/users/${loginUser.id}?_embed=cartProducts`
      );
      setLoading(false);
      setCartProductsByUser({ ...data }.cartProducts);
    }
    fetchCartProductsByUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));

  cartProductsByUser &&
    cartProductsByUser.forEach((product) => {
      total += product.productPrice * product.quantity;
    });
  function increaseQuantity(product) {
    const index = cartProductsByUser.findIndex(
      (book) => product.id === book.id
    );
    if (product.quantity < product.productInventory) {
      [...cartProductsByUser][index].quantity = product.quantity + 1;
      setCartProductsByUser([...cartProductsByUser]);
    }
  }
  function decreaseQuantity(product) {
    const index = [...cartProductsByUser].findIndex(
      (book) => product.id === book.id
    );
    if (product.quantity > 0) {
      [...cartProductsByUser][index].quantity = product.quantity - 1;
      setCartProductsByUser([...cartProductsByUser]);
    }
  }
  function handleDeleteCartProduct(product) {
    const newCartsProduct = [...cartProductsByUser].filter(
      (book) => product.id !== book.id
    );
    setCartProductsByUser([...newCartsProduct]);
    async function deleteCartProduct() {
      setLoading(true);
      await axiosClient.delete(`/cartProducts/${product.id}`);
      setLoading(false);
    }

    deleteCartProduct();
  }
  function checkOut(products) {
    products.forEach((product) => updateCartProducts(product));
    async function updateCartProducts(book) {
      setLoading(true);
      await axiosClient.patch(`/cartProducts/${book.id}`, {
        ...book,
      });
      setLoading(false);
    }
    navigate(`${routes.web.payment}/${loginUser.id}`);
  }
  if (!loginUser) {
    return <LoginRequest />;
  } else {
    return (
      <div style={{ margin: "50px" }}>
        {loading && <Loading />}
        <Header user={loginUser} />
        <div>
          <h1>Giỏ hàng của bạn</h1>
          {cartProductsByUser.length === 0 ? (
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
                {cartProductsByUser &&
                  cartProductsByUser.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productTitle}</td>
                      <td>{`${product.productPrice.toLocaleString()} VNĐ`}</td>
                      <td>{product.productInventory}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic outlined example"
                        >
                          <button
                            type="button"
                            className={`btn btn-outline-${
                              product.quantity !== product.productInventory
                                ? "primary"
                                : "secondary"
                            }`}
                            disabled={
                              product.quantity === product.productInventory
                                ? "disable"
                                : ""
                            }
                            onClick={() => increaseQuantity(product)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                          <input
                            type="button"
                            value={product.quantity}
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
                              product.quantity !== 0 ? "primary" : "secondary"
                            }`}
                            onClick={() => decreaseQuantity(product)}
                          >
                            <i className="bi bi-dash-lg"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <span
                          onClick={() => handleDeleteCartProduct(product)}
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
            onClick={() => checkOut(cartProductsByUser)}
          >
            Thanh toán
          </button>
        </div>
      </div>
    );
  }
}
