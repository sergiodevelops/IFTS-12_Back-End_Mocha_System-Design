import { createStore } from "redux";
import rootReducers from "../reducers/allReducers";

const store = createStore(
    rootReducers,
);

export default store;
