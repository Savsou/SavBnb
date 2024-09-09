import { csrfFetch } from "./csrf";

const SET_REVIEWS = 'reviews/setReviews';
const SET_SPOT_REVIEWS = 'reviews/setSpotReviews';
const SET_USER_REVIEWS = 'reviews/setUserReviews'

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews
    };
};

const setReviewSpot = (spotReviews) => {
    return {
        type: SET_SPOT_REVIEWS,
        payload: spotReviews
    };
};

const setUserReviews = (userReviews) => {
    return {
        type: SET_USER_REVIEWS,
        payload: userReviews
    }
}

export const fetchReviews = () => async dispatch => {
    let res = await csrfFetch('/api/reviews');

    if (res.ok) {
        res = await res.json();
        dispatch(setReviews(res.Reviews))
        return res;
    }
}

export const fetchReviewsSpotById = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    console.log("this is fetch", res);

    if (res.ok) {
        res = await res.json();
        dispatch(setReviewSpot(res.Reviews));
        return res;
    }
}

export const fetchUserReviews = () => async dispatch => {
    let res = await csrfFetch('/api/reviews/current');

    if (res.ok) {
        res = await res.json();
        dispatch(setUserReviews(res.Reviews));
        return res;
    }
}

const initialState = { reviews: [], spotReviews: [], userReviews: [] }

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, allReviews: action.payload }
        case SET_SPOT_REVIEWS:
            return { ...state, spotReviews: action.payload }
        case SET_USER_REVIEWS:
            return { ...state, userReviews: action.payload}
        default:
            return state;
    }
}

export default reviewsReducer;
