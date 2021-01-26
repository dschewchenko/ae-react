import {combineReducers} from "redux";
import imageReducer from './image'
import userReducer from "./user";

const rootReducer = combineReducers({
    images: imageReducer,
    user: userReducer,
});

export default rootReducer;
