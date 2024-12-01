import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URLS, ORDER } from "../appConstants";

const MyOrders = () => {
  const [myOrdersList, setMyOrdersList] = useState([]);
  const isFrontendOnly = useSelector((state) => state.isFrontendOnly);

  const fetchMyOrders = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(API_URLS.GET_MY_ORDERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    if (response.ok) {
      const res = await response.json();
      if (res.orderData && res.orderData.length > 0) {
        setMyOrdersList(res.orderData.reverse());
      }
    } else {
      alert(ORDER.FETCH_ERROR_MSG);
    }
  };

  useEffect(() => {
    if (isFrontendOnly) {
      return;
    }
    fetchMyOrders();
  }, []);

  return (
    <div>
      <table className="order-table">
        My Orders
        <hr />
        {myOrdersList.length > 0
          ? myOrdersList.map((item, index) => (
              <div key={index}>
                <div style={{ marginTop: "25px" }} />
                <tr>
                  <th> Order #{myOrdersList.length - index}</th>
                </tr>

                <tr>
                  <th> Date: {item.orderDate}</th>
                </tr>
                <div style={{ marginBottom: "2px" }} />
                <tr className="bg-success">
                  <td>Name</td>
                  <td>Quantity</td>
                  <td>Price</td>
                </tr>
                {item.data.map((data) => (
                  <>
                    <tr>
                      <td> {data.name}</td>
                      <td> {data.quantity}</td>
                      <td> {data.price}</td>
                    </tr>
                  </>
                ))}
                <div style={{ marginBottom: "25px" }} />
              </div>
            ))
          : "No data to show"}
      </table>
    </div>
  );
};

export default MyOrders;
