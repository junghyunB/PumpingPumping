let initialState = {
  accountKaiKas: "",
  accountMetaMask: "",
  kaiKasNetWork: 0,
  metamaskNetWork: null,
  metamaskChainId: "",
  klaybalance: 0,
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
    case "METAMASK_CHAINID":
      return { ...state, metamaskChainId: payload.metamaskChainId };
    case "GET_BALANCE":
      return { ...state, klaybalance: payload.klaybalance };
    default:
      return { ...state };
  }
}

export default accountReducer;
