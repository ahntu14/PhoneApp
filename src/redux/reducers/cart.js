const initialState = {
    cartProduct: [],
};

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                cartProduct: [...state.cartProduct, action.payload],
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                cartProduct: state.cartProduct.filter((item) => item !== action.payload),
            };
        default:
            return state;
    }
};

export default favoriteReducer;
