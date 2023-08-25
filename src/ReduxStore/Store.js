import { createStore } from "redux";
import reducer from "./Reducer";

export let defaultState = {
    product:[],
    userdata:JSON.parse(sessionStorage.getItem('user'))||"",
    wishlist:JSON.parse(sessionStorage.getItem('wishlist'))||"",
    loggedIn:(sessionStorage.getItem('user') === null) ? false : true,
    notifications:[],
    adminLoggedIn:(sessionStorage.getItem('admin') === null) ? false : true,
    buyproduct:[],
}

const store = createStore(reducer,defaultState);

export default store;