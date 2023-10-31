import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Formik } from "formik";
import axiosClient from "../api/axiosClient";
import { useParams } from "react-router-dom";
import userSchema from "../validateSchema/userSchema";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Components/Loading";
import LoginRequest from "../Components/LoginRequest";
export default function Payment() {
  const [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Tiền mặt",
    boughtProducts: [],
  });
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const data = await axiosClient.get(
        `/users/${userId}?_embed=cartProducts`
      );
      setLoading(false);
      let productsToCheckOut = data.cartProducts.filter(book=> book.quantity!==0)
      console.log(productsToCheckOut)
      setReceiver({
        ...receiver,
        name: data.userName,
        phone: data.phone,
        address: data.address,
        boughtProducts:productsToCheckOut
      });
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  if (!loginUser) {
    return <LoginRequest />;
  } else {
    return (
      <div style={{ margin: "50px" }}>
        {loading && <Loading />}
        <Header user={loginUser} />
        <div>
          <Formik
            initialValues={receiver}
            enableReinitialize
            validationSchema={userSchema}
            onSubmit={() => {
              alert("Đơn hàng đã được xác nhận");
              async function addReceiver() {
                await axiosClient.post(`/receivers`, {
                  id: uuidv4(),
                  userId: userId,
                  boughtTime: new Date().toUTCString(),
                  ...receiver,
                });
              }
              addReceiver();
              const newReceiver = { ...receiver };
              newReceiver.boughtProducts.forEach((product) => {
                axiosClient.delete(`/cartProducts/${product.id}`);
                axiosClient.patch(`/products/${product.productId}`, {
                  inventory: product.productInventory - product.quantity,
                });
              });
              navigate(`${routes.web.history}/${userId}`);
            }}
          >
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
              <form
                className="signup"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <h1>Thông tin người nhận</h1>

                <div className="signup__field">
                  <label className="signup__label" htmlFor="name">
                    Họ tên người nhận
                  </label>
                  <input
                    className="signup__input"
                    type="text"
                    id="username"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                <div className="signup__field">
                  <label className="signup__label" htmlFor="phone">
                    Số điện thoại người nhận
                  </label>
                  <input
                    className="signup__input"
                    type="number"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.phone && (
                    <p style={{ color: "red" }}>{errors.phone}</p>
                  )}
                </div>
                <div className="signup__field">
                  <label className="signup__label" htmlFor="address">
                    Địa chỉ người nhận
                  </label>
                  <input
                    className="signup__input"
                    type="text"
                    name="address"
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.address && (
                    <p style={{ color: "red" }}>{errors.address}</p>
                  )}
                </div>

                <div className="signup__field">
                  <label className="signup__label" htmlFor="payment">
                    Phương thức thanh toán
                  </label>
                  <input
                    className="signup__input"
                    type="text"
                    disabled
                    name="payment"
                    value={values.payment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <button type="submit">Đăng kí</button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
