import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import routes from "../routes";

export default function BuyingHistory() {
  const { userId } = useParams();
  const [boughtProducts, setBoughtProducts] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const data = await axiosClient.get(`users/${userId}?_embed=receivers`);
      setBoughtProducts({ ...data });
    }
    fetchProduct();
  }, [userId]);
  return (
    <div style={{margin:"50px"}}>
    {boughtProducts&&<Header user={boughtProducts}/>}
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
                        {`${(boughtProduct.quantity + boughtProduct.productPrice).toLocaleString()} VNĐ`}
                      </td>
                      <td>
                        {receiver.boughtTime}
                      </td>
                      <td>
                        <Link to={`${routes.web.detail}/${boughtProduct.productId}`}className="btn btn-primary" type="button">Mua lại</Link>
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
