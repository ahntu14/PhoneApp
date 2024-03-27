import { combineReducers } from 'redux';
import info from './infoReducer.js';
import selectedProduct from './favorite.js';

const reducers = combineReducers({
    userInfo: info,
    selectedProduct: selectedProduct,
});

export default function (state, action) {
    return reducers(state, action);
}
