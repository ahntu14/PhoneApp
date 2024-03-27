const initialState = {
    selectedProduct: [],
};

export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: [...state.selectedProduct, action.payload],
            };
        case REMOVE_FAVORITE:
            return {
                ...state,
                selectedProduct: state.selectedProduct.filter((item) => item !== action.payload),
            };
        default:
            return state;
    }
};

export default favoriteReducer;
