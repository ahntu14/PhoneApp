const initialState = {
    totalCart: 0,
};

export const ADD_TOTAL = 'ADD_TOTAL';
export const REMOVE_TOTAL = 'REMOVE_TOTAL';

const totalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOTAL:
            return {
                ...state,
                totalCart: state.totalCart + action.payload,
            };
        case REMOVE_TOTAL:
            return {
                ...state,
                totalCart: state.totalCart - action.payload,
            };
        default:
            return state;
    }
};

export default totalReducer;
