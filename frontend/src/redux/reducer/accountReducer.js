let initialState = {
  accountKaiKas: "",
  accountMetaMask: "",
};

function accountReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_KAIKAS_ACCOUNT":
      return { ...state, accountKaiKas: payload.accountKaiKas };
    case "GET_METAMASK_ACCOUNT":
      return { ...state, accountMetaMask: payload.accountMetaMask };
    default:
      return { ...state };
  }
}

export default accountReducer;
