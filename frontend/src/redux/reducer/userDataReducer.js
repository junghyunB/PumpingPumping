let initialState = {
  userM1TicketNumList: [],
  myRatio: 0,
  myTicketAmount: 0,
  claimSuccess: false,
  isclaimM1: 0,
  innerWidth: 0,
};

function userDataReducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_M1TICKET_NUMLIST":
      return { ...state, userM1TicketNumList: payload.userM1TicketNumList };
    case "GET_MY_RATIO":
      return { ...state, myRatio: payload.myRatio };
    case "GET_MY_TICKET_AMOUNT":
      return { ...state, myTicketAmount: payload.myTicketAmount };
    case "CLAIM_REWARD_M1":
      return { ...state, claimSuccess: payload.claimSuccess };
    case "GET_ISCLAIM_REWARD":
      return { ...state, isclaimM1: payload.isclaimM1 };
    case "INNER_WIDTH":
      return { ...state, innerWidth: payload };
    default:
      return { ...state };
  }
}

export default userDataReducer;
