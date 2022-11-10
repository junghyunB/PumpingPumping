import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import epochM1Reducer from "./epochM1Reducer";
import epochM2Reducer from "./epochM2Reducer";
import TicketM2Reducer from "./TicketM2Reducer";
import TicketReducer from "./TicketReducer";
import userDataReducer from "./userDataReducer";

export default combineReducers({
    account : accountReducer,
    ticket : TicketReducer,
    epochM1 : epochM1Reducer,
    user : userDataReducer,
    epochM2 : epochM2Reducer,
    ticketM2 : TicketM2Reducer
})