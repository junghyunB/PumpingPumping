let initialState = {
  show: false,
  amount:0,
};


function modalReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "BUY_MODAL":
      return { ...state, show: payload };
    case "CLOSE_MODAL":
      return { ...state, show: payload };
    case "ADD_AMOUNT": 
      return {...state, amount: payload};
    case "SUB_AMOUNT":
      return {...state, amount: payload};
    default:
      return { ...state };
  }
}

export default modalReducer;
