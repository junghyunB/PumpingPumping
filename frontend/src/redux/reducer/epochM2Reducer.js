
let initialState = {
    epochM2: 0,
    dashBoardDataM2:[],
    pickWinnerM2:false,
    targetDateM2: "11 17 2122 14:25:15",
  };
  
  function epochM2Reducer(state = initialState, action) {
    let { type, payload } = action;
  
    switch (type) {
      case "GET_CURRENT_M2EPOCH":
        return { ...state, epochM2: payload.epochM2 };
      case "GET_DASHBOARDM2_DATA":
        return { ...state, dashBoardDataM2: payload.dashBoardDataM2 };
      case "SUCCESS_PICK_WINNERM2":
        return { ...state, pickWinnerM2: payload.pickWinnerM2 };
      case "TIMERM2_END":
        return { ...state, targetDateM2 : payload };
      default:
        return { ...state };
    }
  }
  
  export default epochM2Reducer;
  