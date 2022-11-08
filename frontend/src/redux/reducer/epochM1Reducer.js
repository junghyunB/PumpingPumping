
let initialState = {
  epoch: 0,
  dashboardM1: [],
  epochWinner: "",
  pickWinner: false,
};

function epochM1Reducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "GET_CURRENT_EPOCH":
      return { ...state, epoch: payload.epoch };
    case "GET_DASHBOARD_M1" :
      return { ...state, dashboardM1:payload.dashboardM1};
    case "GET_EPOCH_WINNER" :
      return { ...state, epochWinner:payload.epochWinner};
    case "SUCCESS_PICK_WINNER" :
      return { ...state, pickWinner:payload.pickWinner};
    default:
      return { ...state };
  }
}

export default epochM1Reducer;
