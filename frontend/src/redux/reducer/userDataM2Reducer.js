
let initialState = {
    myTicketCountM2: 0,
  };
  
  function userDataM2Reducer(state = initialState, action) {
    let { type, payload } = action;
  
    switch (type) {
      case "GET_MY_TICKET_COUNTM2":
        return { ...state, myTicketCountM2: payload.myTicketCountM2 };
        default:
        return { ...state };
    }
  }
  
  export default userDataM2Reducer;
  