let initialState = {
  accountKaiKas: "",
  accountMetaMask: "",
  kaiKasNetWork: 0,
  metamaskNetWork:null,
};

function accountReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_KAIKAS_ACCOUNT":
      return { ...state, accountKaiKas: payload.accountKaiKas };
    case "GET_METAMASK_ACCOUNT":
      return { ...state, accountMetaMask: payload.accountMetaMask };
    case "KAIKAS_NETWORK":
      return { ...state, kaiKasNetWork: payload };
    case "METAMASK_NETWORK":
      return { ...state, metamaskNetWork: payload };
    default:
      return { ...state };
  }
}

export default accountReducer;
