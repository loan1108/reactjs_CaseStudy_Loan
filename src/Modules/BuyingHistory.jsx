import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import routes from "../routes";
import Loading from "../Components/Loading";
import LoginRequest from "../Components/LoginRequest";
export default function BuyingHistory() {
 
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const data = await axiosClient.get(`users/${loginUser.id}?_embed=receivers`);
      setLoading(false);
      setBoughtProducts({ ...data });
      
    }
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));
  if (!loginUser) {
    return <LoginRequest />;
  } else {
    return (
      <div style={{ margin: "50px" }}>
        {loading && <Loading />}
        <Header user={boughtProducts} />
        <div>
          <h1>Lịch sử mua hàng</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Thời gian mua</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {boughtProducts &&
                boughtProducts.receivers &&
                boughtProducts.receivers.map(
                  (receiver) =>
                    receiver.boughtProducts &&
                    receiver.boughtProducts.map((boughtProduct) => (
                      <tr key={boughtProduct.id}>
                        <td>{boughtProduct.productTitle}</td>
                        <td>{boughtProduct.quantity}</td>
                        <td>
                          {`${(
                            boughtProduct.quantity + boughtProduct.productPrice
                          ).toLocaleString()} VNĐ`}
                        </td>
                        <td>{receiver.boughtTime}</td>
                        <td>
                          <Link
                            to={`${routes.web.detail}/${boughtProduct.productId}`}
                            className="btn btn-primary"
                            type="button"
                          >
                            Mua lại
                          </Link>
                        </td>
                      </tr>
                    ))
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
