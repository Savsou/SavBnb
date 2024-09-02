import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

export const login = ({ credential, password }) => async dispatch => {
    let res = await csrfFetch("api/session", {
        method: 'POST',
        body: JSON.stringify({credential, password}),
    });

    if (res.ok) {
        res = await res.json();
        dispatch(setUser(res));
        return res;
    }
};

export const restoreUser = () => async dispatch => {
    let res = await csrfFetch('/api/session');
    if (res.ok) {
        res = await res.json();
        dispatch(setUser(res.user));
        return res;
    }
}

export const signup = (user) => async dispatch => {
    const { username, firstName, lastName, email, password } = user;
    let res = await csrfFetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });

    if (res.ok) {
        res = await res.json();
        dispatch(setUser(res));
        return res;
    }
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return res;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload}
        case REMOVE_USER:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export default sessionReducer;
