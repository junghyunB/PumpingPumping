let initialState = {
  totalAmount: 0,
  myRatio: 0,
  totalTicketAmount: 0,
  buyTicketSuccess: false,
  winningTicketId: 0,
  myTicketAmount:0,
  
};

function TicketReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_TOTALAMOUNT":
      return { ...state, totalAmount: payload.totalAmount };
    case "GET_MY_RATIO":
      return { ...state, myRatio: payload.myRatio };
    case "GET_TOTAL_TICKET_AMOUNT":
      return { ...state, totalTicketAmount: payload.totalTicketAmount };
    case "SUCCESS_BUY_TICKET":
      return { ...state, buyTicketSuccess: payload };
    case "GET_WINNING_TICKET":
      return { ...state, winningTicketId: payload.winningTicketId };
    case "GET_MY_TICKET_AMOUNT":
      return { ...state, myTicketAmount: payload.myTicketAmount };
    default:
      return { ...state };
  }
}

export default TicketReducer;
