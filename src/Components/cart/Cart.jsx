import React, { useEffect, useState } from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

function Cart() {
  const { cart } = useSelector((state) => state.productReducer);
  // const { total } = useSelector((state) => state.productReducer);
  console.log("cartttt", cart);
  const dispatch = useDispatch();
const [total,setTotal] = useState(0)
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0))
  }, [cart]);

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    // dispatch({ type: "CALCULATE_TOTAL" });
  };

  const handleQuantity = (id, e) => {
    dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        id,
        quantity: e.target.value,
      },
    });

    // dispatch({ type: "CALCULATE_TOTAL" });
  };

  return (
    <div className="cart-products">
      <div className="products-detail">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="cart-product">
              <div className="cart-product-image">
                <img src={item.image} alt="" />
              </div>
              <div className="cart-product-name">{item.name}</div>
              <div className="cart-product-price">
                ₹ {Math.floor(item.price)}
              </div>
              <div className="cart-product-rating">
                {[...Array(5)].map((i, index) => {
                  return index < item.ratings ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  );
                })}
              </div>
              <div className="cart-quantity">
                <select
                  className="select"
                  value={item.qty}
                  onChange={(e) => handleQuantity(item.id, e)}
                >
                  {[...Array(item.inStock)].map((i, index) => (
                    <option value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>
              <div className="cart-product-delete">
                <AiFillDelete
                  className="cart-delete-item"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <h1 className="empty">Cart is Empty!</h1>
        )}
      </div>

      <div className="total">
        <h1>Subtotal ({cart.length}) items</h1>
        <h3>Total: ₹ {total}</h3>
        <div className="btn">
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
