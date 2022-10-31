let initialState = {
    totalAmount : 0,
    myTicketAmount: 0,
    buyTicketSuccess:false,
}

function TicketReducer(state=initialState,action) {
    let {type, payload} = action

    switch(type) {
        case "GET_TOTALAMOUNT" :
            return {...state, totalAmount: payload.totalAmount}
        case "GET_MYTICKETAMOUNT" : 
        return {...state, myTicketAmount: payload.myTicketAmount}
        case "SUCCESS_BUY_TICKET" : 
        return {...state, buyTicketSuccess: payload};
        default :
            return {...state}
    }
}   

export default TicketReducer