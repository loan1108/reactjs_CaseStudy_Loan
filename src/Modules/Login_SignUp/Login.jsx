import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import loginUserSchema from "../../validateSchema/loginUserSchema";
import axiosClient from "../../api/axiosClient";
import routes from "../../routes";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [loginUser, setLoginUser] = useState({ userName: "", password: "" });
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("loginUser"))) {
      setLoginUser({
        ...loginUser,
        userName: JSON.parse(window.localStorage.getItem("loginUser")).userName,
        password: JSON.parse(window.localStorage.getItem("loginUser")).password,
      });
    } else {
      setLoginUser({ ...loginUser });
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{ margin: "50px" }}>
      <Formik
        initialValues={loginUser}
        enableReinitialize
        validationSchema={loginUserSchema}
        onSubmit={(values) => {
          async function fetchLoginUser() {
            const data = await axiosClient.get("/users");
            const index =
              data &&
              data.findIndex(
                (appUser) =>
                  appUser.userName === { ...values }.userName &&
                  appUser.password === { ...values }.password
              );
            if (index !== -1) {
              window.localStorage.setItem(
                "loginUser",
                JSON.stringify(data[index])
              );
              navigate(`${routes.web.home}`);
            } else {
              alert("Xác nhận lại tên đăng nhập và mật khẩu");
            }
          }
          fetchLoginUser();
        }}
      >
        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
          <form className="login" onSubmit={handleSubmit}>
            <h2>Chào mừng bạn</h2>
            <p>đến với hiệu sách</p>
            <div className="input-box">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                name="userName"
                value={values.userName}
                autoComplete="current-userName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && (
                <div className="error" style={{ color: "red" }}>
                  {errors.userName}
                </div>
              )}
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={values.password}
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <div className="error" style={{ color: "red" }}>
                  {errors.password}
                </div>
              )}
            </div>

            <input type="submit" value="Đăng nhập" />
            <div className="links">
              <Link to={routes.web.singup} href="#" id="register">
                Đăng kí
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
