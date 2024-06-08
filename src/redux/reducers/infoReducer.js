const initState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
};

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const UPDATE_NAME = 'UPDATE_NAME';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_PHONE = 'UPDATE_PHONE';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export default function updateInfo(state = initState, action) {
    switch (action.type) {
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.payload,
            };
        case UPDATE_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case UPDATE_PHONE:
            return {
                ...state,
                phone: action.payload,
            };
        case UPDATE_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        case LOG_OUT:
            return {
                ...initState,
            };

        default:
            return state;
    }
}
