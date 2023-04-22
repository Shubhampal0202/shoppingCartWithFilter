const initialState = {
  cart: [],
  // total:0
};
console.log("reducer");
function productReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((p) => p.id !== action.payload) }
    // case "CALCULATE_TOTAL":
    //   let sum = 0;
    //   state.cart.forEach((item) => {
    //     sum = sum + item.price * item.qty
    //   })
    //   state.total = sum;
    //   return { ...state };
    case "CHANGE_QUANTITY":
    return {...state, cart:state.cart.map((item)=>item.id===action.payload.id ? {...item, qty:action.payload.quantity}:{...item})}
    default:
      return state;
  }
}
export default productReducer;
