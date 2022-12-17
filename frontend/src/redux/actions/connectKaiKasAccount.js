function getKaiKasAccount() {
  return async (dispatch) => {
    try {
      const accounts = await window.klaytn.enable();
      let accountKaiKas = accounts[0];
      if (localStorage.getItem("metamaskAccount") === null) {
        localStorage.setItem("kaikasAccount", accountKaiKas);
      }
      dispatch({ type: "GET_KAIKAS_ACCOUNT", payload: { accountKaiKas } });
    } catch (error) {
      console.error(error);
    }
  };
}

export const connectKaiKasAccount = { getKaiKasAccount };
