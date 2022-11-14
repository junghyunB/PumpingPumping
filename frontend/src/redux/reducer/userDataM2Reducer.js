
let initialState = {
    myTicketCountM2: 0,
    myTicketInfoM2: [[]],
    myTicketDetailM2: [],
    detailState: false,
  };
  
  function userDataM2Reducer(state = initialState, action) {
    let { type, payload } = action;
  
    switch (type) {
      case "GET_MY_TICKET_COUNTM2":
        return { ...state, myTicketCountM2: payload.myTicketCountM2 };
      case "GET_MY_TICKET_INFOM2":
        return { ...state, myTicketInfoM2: payload.myTicketInfoM2 };
      case "GET_MY_TICKET_DETAILM2":
        return { ...state, myTicketDetailM2: payload };
      case "DETAIL_STATE":
        return { ...state, detailState: true };
      case "CLOSE_DETAIL":
        return { ...state, detailState: false };
        default:
        return { ...state };
    }
  }
  
  export default userDataM2Reducer;
  