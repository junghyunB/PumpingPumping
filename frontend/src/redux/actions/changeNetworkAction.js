function changeNetworkAct() {
    return async (dispatch) => {
        try {
            const metamaskChainId = await window.ethereum.chainId;
            const response = await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{ chainId: "0x3e9"}] });
            dispatch({type : "METAMASK_CHAINID", payload : {metamaskChainId}});
        } 
        catch(switchError) {
            if (switchError.code === 4902) {
                try {
                 const response = await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: '0x3e9',
                        chainName: 'Klaytn Baobab',
                        nativeCurrency: {
                            symbol:"KLAY",
                            decimals: 18
                        },
                        rpcUrls: ["https://api.baobab.klaytn.net:8651/"],
                        blockExplorerUrls: ["https://baobab.scope.klaytn.com/"]
                      },
                    ],
                  });                
                } catch (addError) {
                }
              }
        }
    }
}

export const changeNetworkAction = {changeNetworkAct}