let initialState = {
    winningNumberM2 : 0,
    winningTicketIdM2: 0,
    totalAmountM2:0,
    buyTicketM2Success: false,
    totalTicketAmountM2:0,
    tieTicketM2: [],
  };
  
  function TicketM2Reducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_WINNING_NUMBERM2":
        return { ...state, winningNumberM2: payload.winningNumberM2 };
      case "GET_WINNING_TICKETIDM2":
        return { ...state, winningTicketIdM2: payload.winningTicketIdM2 };
      case "GET_TOTAL_AMOUNTM2":
        return { ...state, totalAmountM2: payload.totalAmountM2 };
      case "SUCCESS_BUY_TICKETM2":
        return { ...state, buyTicketM2Success: payload.buyTicketM2Success };
      case "GET_TOTAL_TICKET_AMOUNTM2":
        return { ...state, totalTicketAmountM2: payload.totalTicketAmountM2 };
      case "GET_TIE_TICKETM2":
        return { ...state, tieTicketM2: payload.tieTicketM2 };
      default:
        return { ...state };
    }
  }
  
  export default TicketM2Reducer;
  