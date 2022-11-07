import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import epochM1Reducer from "./epochM1Reducer";
import modalReducer from "./modalReducer";
import TicketReducer from "./TicketReducer";

export default combineReducers({
    account : accountReducer,
    ticket : TicketReducer,
    modal : modalReducer,
    epochM1 : epochM1Reducer,
})