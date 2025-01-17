import React, { useEffect, useState } from "react";
import { API_URLS, LOGIN_ALERT_MSG } from "../appConstants";
import { API_DATA } from "../apiConstants";
import { useSelector, useDispatch } from "react-redux";
import {
  setInitialData,
  handleQuantity,
  handleCart,
  filterFoodList,
} from "../features/foodExpressSlice";

const Cards = () => {
  const [foodCat, setFoodCat] = useState([]);

  const quantity = useSelector((state) => state.quantity);
  const price = useSelector((state) => state.price);
  const itemTotalPrice = useSelector((state) => state.itemTotalPrice);
  const cartData = useSelector((state) => state.cartData);
  const foodData = useSelector((state) => state.foodList);
  const originalFoodData = useSelector((state) => state.originalFoodList);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isFrontendOnly = useSelector((state) => state.isFrontendOnly);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        let displayData;

        if (isFrontendOnly) {
          //Code for using dummy data for 'displayData'
          displayData = API_DATA.DISPLAY_DATA;
        } else {
          //Code for calling actual API and using API response as 'displayData'
          const response = await fetch(API_URLS.DISPLAY_FOOD_DATA, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          displayData = await response.json();
        }
        if (displayData.foodData.length > 0) {
          dispatch(
            setInitialData({
              quantities: displayData.foodData.length,
              type: "SET_QUANTITY",
            })
          );

          displayData.foodData.forEach((item) => {
            let price =
              item.CategoryName === "Pizza"
                ? item.price[0].regular
                : item.price;
            dispatch(setInitialData({ price: price, type: "SET_PRICE" }));
          });

          dispatch(
            filterFoodList({
              data: displayData.foodData,
              type: "SET_FOOD_LIST",
            })
          );
        }
        if (displayData.foodCategory.length > 0) {
          setFoodCat(displayData.foodCategory);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const changeQuantity = (type, index, name) => {
    if (!isLoggedIn) {
      alert(LOGIN_ALERT_MSG);
      return;
    }

    dispatch(
      handleQuantity({
        type: type,
        index,
      })
    );

    if (quantity[index] === 1) {
      let cartIndex =
        cartData.length > 0
          ? cartData.findIndex((data) => data.name === name)
          : -1;
      if (cartIndex !== -1) {
        dispatch(
          handleCart({
            type: "REMOVE_FROM_CART",
            index: cartIndex,
          })
        );
      }
    }
  };

  const handleAddToCart = (index, name) => {
    if (!isLoggedIn) {
      alert(LOGIN_ALERT_MSG);
      return;
    }

    let cartIndex =
      cartData.length > 0
        ? cartData.findIndex((data) => data.name === name)
        : -1;

    if (cartIndex !== -1) {
      dispatch(
        handleCart({
          type: "UPDATE_TO_CART",
          name: name,
          cartIndex: cartIndex,
          index,
        })
      );
    } else {
      if (itemTotalPrice[index] > 0) {
        dispatch(
          handleCart({
            type: "ADD_TO_CART",
            name: name,
            index,
          })
        );
      } else {
        alert("Please add atleast 1 quantity to add to cart.");
      }
    }
  };

  return (
    <div className="food-card-container container">
      {foodCat.length === 0 ? (
        <h1>No data available</h1>
      ) : (
        <>
          {foodCat.map((category) => {
            const filteredItems = foodData.filter(
              (item) => item.CategoryName === category.CategoryName
            );
            return filteredItems.length > 0 ? (
              <div key={category._id}>
                <h1 className="fs-3 m-3">{category.CategoryName}</h1>
                <hr />
                <div className="row mb-3">
                  {filteredItems.map((item) => {
                    const itemIndex = originalFoodData.findIndex(
                      (element) => element._id === item._id
                    );
                    return (
                      <div className="col-md-4 mb-3" key={item._id}>
                        <div className="card food-card">
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt="img"
                            style={{ height: "240px" }}
                          />

                          <div className="card-body h-180px">
                            <h5 className="card-title fw-bold">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic outlined example"
                            >
                              <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={() =>
                                  changeQuantity(
                                    "decrement",
                                    itemIndex,
                                    item.name
                                  )
                                }
                              >
                                -
                              </button>

                              <button
                                className="btn btn-outline-success text-white bg-success"
                                disabled
                              >
                                {quantity[itemIndex]}
                              </button>

                              <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={() =>
                                  changeQuantity("increment", itemIndex)
                                }
                              >
                                +
                              </button>

                              <div style={{ marginLeft: "25px" }}>
                                Price: Rs. {price[itemIndex]}
                              </div>
                            </div>
                            <p className="card-text ml-4">
                              Total: Rs. {itemTotalPrice[itemIndex]}
                            </p>
                          </div>
                          <button
                            className="bg-success text-white fw-bold rounded-2"
                            onClick={() =>
                              handleAddToCart(itemIndex, item.name)
                            }
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </>
      )}
    </div>
  );
};

export default Cards;
