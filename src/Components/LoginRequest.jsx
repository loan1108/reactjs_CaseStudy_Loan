import React from "react";
import routes from "../routes";
import { Link } from "react-router-dom";
export default function LoginRequest() {
  return (
    // <div className='d-flex justify-content-center'>
    //     <h2>Bạn chưa đăng nhập</h2>
    //     <Link className='btn btn-warning' to={routes.web.login}>Di chuyển đến màn hình đăng nhập </Link>
    // </div>
    <div className="alert alert-warning" role="alert">
      Bạn chưa đăng nhập 
      <br/>
      <Link to={routes.web.login} style={{color:"red"}}>Di chuyển đến màn hình đăng nhập</Link>
    </div>
  );
}
