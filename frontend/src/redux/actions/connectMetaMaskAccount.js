function getMetaMaskAccount() {
    return async (dispatch) => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let accountMetaMask = accounts[0]
            if(localStorage.getItem("kaikasAccount") === null) {
                localStorage.setItem("metamaskAccount", accountMetaMask);
            }
            dispatch({type : "GET_METAMASK_ACCOUNT", payload : {accountMetaMask}})
        } 
        catch(error) {
            console.error(error)
        }
    }
}

export const connectMetaMaskAccount = {getMetaMaskAccount}