import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
function ProductItem({ item }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.productReducer);
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    // dispatch({ type: "CALCULATE_TOTAL" });
  };
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }
  return (
    <>
      <div className="product">
        <img src={item.image} alt="" />
        <div>
          <h3>{item.name}</h3>
          <div className="price">₹ {Math.floor(item.price)}</div>
          <div className="fast">
            {item.fastDelivery ? "Fast Delivery" : "4 Days Delivery"}
          </div>
          <div>
            {item &&
              [...Array(5)].map((i, index) => {
                if (index < item.ratings) {
                  return <AiFillStar className="fill-star" />;
                } else {
                  return <AiOutlineStar className="out-line-star" />;
                }
              })}
          </div>
          <div>
            {cart.some((val) => val.id === item.id) ? (
              <button id="danger" onClick={()=>removeFromCart(item.id)}>Remove From Cart</button>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(item)}
                disabled={!item.inStock}
              >
                {!item.inStock ? "Out of Stock" : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
