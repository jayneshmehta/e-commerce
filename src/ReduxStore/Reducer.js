import { ADD_CART, ADD_WISHLIST, GET_NOTIFICATION, GET_PRODUCT, IS_ADMINLOGIN, IS_LOGIN, REMOVE_CART, REMOVE_WISHLIST, SET_WISHLIST, USER_DATA , TEMP_PRODUCT } from "./Action";

export default function reducer(state, action) {
    switch (action.type) {
        case GET_PRODUCT:
            state.product = action.payload;
            return state;
        case ADD_WISHLIST:
            state.wishlist = ([...state.wishlist, action.payload]);
            return { ...state, wishlist: state.wishlist };
        case USER_DATA:
            state.userdata = action.payload;
            return { ...state, userdata: state.userdata };

        case IS_LOGIN:
            state.loggedIn = action.payload;
            return { ...state, loggedIn: state.loggedIn };

        case IS_ADMINLOGIN:
            state.adminLoggedIn = action.payload;
            return { ...state, adminLoggedIn: state.adminLoggedIn };

        case ADD_CART:
            const found = state.buyproduct.some(items => items.id === action.payload.id);
            if (!found) {
                state.buyproduct = ([...state.buyproduct, action.payload]);
            }
            return { ...state, buyproduct: state.buyproduct };

        case REMOVE_CART:
            state.buyproduct = action.payload;
            return { ...state, buyproduct: state.buyproduct };

        case SET_WISHLIST:
            state.wishlist = action.payload;
            return { ...state, wishlist: state.wishlist };

        case REMOVE_WISHLIST:
            state.wishlist = action.payload;
            return { ...state, wishlist: state.wishlist };

        case GET_NOTIFICATION:
            state.notifications = action.payload;
            return { ...state, notifications: state.notifications };

        case TEMP_PRODUCT:
            state.tempProduct = action.payload;
            return { ...state, tempProduct: state.tempProduct };

        default:
            return state;
    }
}
