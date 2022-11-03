function getMetaMaskAccount() {
    return async (dispatch) => {
        try {
            const accounts = await window.ethereum.enable();
            let accountMetaMask = accounts[0]
            localStorage.setItem("metamaskAccount", accountMetaMask);
            dispatch({type : "GET_METAMASK_ACCOUNT", payload : {accountMetaMask}})
        } 
        catch(error) {
            console.error(error)
        }
    }
}

export const connectMetaMaskAccount = {getMetaMaskAccount}