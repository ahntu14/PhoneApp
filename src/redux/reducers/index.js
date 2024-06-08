import { combineReducers } from 'redux';
import userInfo from './infoReducer.js';
import selectedProduct from './favorite.js';
import cartProduct from './cart.js';
import totalReducer from './totalCart.js';

const reducers = combineReducers({
    userInfo: userInfo,
    selectedProduct: selectedProduct,
    cartProduct: cartProduct,
    totalReducer: totalReducer,
});

export default function (state, action) {
    return reducers(state, action);
}
