const initState = {
    email: '',
    accessToken: '',
    refreshToken: '',
};

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export default function updateInfo(state = initState, payload) {
    switch (payload.type) {
        case UPDATE_EMAIL:
            return {
                ...state,
                email: payload.email,
            };
        case ACCESS_TOKEN:
            return {
                ...state,
                accessToken: payload.accessToken,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: payload.refreshToken,
            };
        default:
            return state;
    }
}
