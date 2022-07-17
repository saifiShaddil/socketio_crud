import { createStore } from "redux";
import reducer from "./reduer";


export const store = createStore( reducer);