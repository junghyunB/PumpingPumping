function metaMaskNetworkAct() {
    return async (dispatch) => {
        try {
            const response = await window.ethereum.request({ method: 'net_version' });
            dispatch({type : "METAMASK_NETWORK", payload : response})
        } 
        catch(error) {
            console.error(error)
        }
    }
}

export const metaMaskNetworkAction = {metaMaskNetworkAct}