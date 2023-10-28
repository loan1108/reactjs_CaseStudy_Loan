import actionTypes from "../actionTypes";
const state = [];
const productsReducer = (initialState = state, action) => {
  // console.log(initialState)
  switch (action.type) {
    case actionTypes.PRODUCTS_FETCH_SUCCEEDED:
      return [...action.payload];
    // case actionTypes.ADD_TO_CART:
    //     const index = [...initialState].findIndex(product=>action.payload.id ===product.id);
    //     // [...initialState][index].quantity = action.payload.quantity;
    //     return[...initialState]
    // case actionTypes.CHECK_OUT_SUCCEDDED:
    //     return[...action.payload]
    default:
      return initialState;
  }
};
export default productsReducer;
