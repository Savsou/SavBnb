import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots';
const SET_SINGLE_SPOT = 'spots/setSingleSpot';

const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};

const setSingleSpot = (spot) => {
    return {
        type: SET_SINGLE_SPOT,
        payload: spot
    };
};

export const fetchSpots = () => async dispatch => {
    let res = await csrfFetch('/api/spots');

    if (res.ok) {
        res = await res.json();
        dispatch(setSpots(res.Spots))
        return res;
    }
}

export const fetchSpotById = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}`);

    console.log("spots.js", res)

    if (res.ok) {
        res = await res.json();
        dispatch(setSingleSpot(res));
        return res;
    }
}

const initialState = { spots: [], spot: null }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPOTS:
            return { ...state, spots: action.payload }
        case SET_SINGLE_SPOT:
            return { ...state, spot: action.payload }
        default:
            return state;
    }
}

export default spotsReducer;
