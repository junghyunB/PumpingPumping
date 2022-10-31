import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import modalReducer from "./modalReducer";
import TicketReducer from "./TicketReducer";

export default combineReducers({
    account : accountReducer,
    ticket : TicketReducer,
    modal : modalReducer,
})