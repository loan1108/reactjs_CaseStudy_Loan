import React, { useState } from "react";
import { Formik } from "formik";
import singUpUserSchema from "../../validateSchema/signUpUserSchema";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../../api/axiosClient";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./signup.css";
export default function SignUp() {
  const navigate = useNavigate();
  const [signUpUser] = useState({
    id: "",
    userName: "",
    address: "",
    password: "",
    phone: "",
  });
  return (
    <div style={{ margin: "50px" }}>
      <Formik
        initialValues={signUpUser}
        enableReinitialize
        validationSchema={singUpUserSchema}
        onSubmit={(values) => {
          const userId = uuidv4();
          async function createUser() {
            await axiosClient.post("/users", { ...values, id: userId });
            window.localStorage.setItem(
              "loginUser",
              JSON.stringify({ ...values, id: userId })
            );
            alert("Đăng nhập thành công.Đi đến màn dashboard!");
            navigate(`${routes.web.home}`);
          }
          createUser();
        }}
      >
        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
          <form className="signup" onSubmit={handleSubmit} autoComplete="off">
            <h1>Tạo tài khoản</h1>
            <h2>
              Bạn đã có tài khoản chưa? <Link to={routes.web.login}>Tạo tài khoản</Link>
            </h2>

            <div className="signup__field">
            <label className="signup__label" htmlFor="userName">
                Tên đăng nhập
              </label>
              <input
                className="signup__input"
                type="text"
                id="username"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              {errors.userName && (
                <p style={{ color: "red" }}>{errors.userName}</p>
              )}
            </div>

            <div className="signup__field">
            <label className="signup__label" htmlFor="address">
                Địa chỉ
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
            <label className="signup__label" htmlFor="phone">
                Số điện thoại
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
              
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </div>

            <div className="signup__field">
            <label className="signup__label" htmlFor="password">
                Mật khẩu
              </label>
              <input
                className="signup__input"
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>

            <button>Đăng kí</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
