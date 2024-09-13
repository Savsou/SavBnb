import { csrfFetch } from "./csrf";

const SET_REVIEWS = 'reviews/setReviews';
const SET_SPOT_REVIEWS = 'reviews/setSpotReviews';
const SET_USER_REVIEWS = 'reviews/setUserReviews';
const ADD_REVIEW = 'reviews/addReview';
const REMOVE_REVIEW = 'reviews/removeReview';

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

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
}

const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
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
    // console.log("this is fetch", res);

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

export const postReview = (spotId, reviewData) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })

    if (res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
        dispatch(fetchReviewsSpotById(spotId));
        return newReview;
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    let res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(removeReview(reviewId));
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
        case ADD_REVIEW:
            return { ...state, spotReviews: [action.payload, ...state.spotReviews]}
        case REMOVE_REVIEW:
            return {
                ...state,
                spotReviews: state.spotReviews.filter(review => review.id !== action.reviewId)
            };
        default:
            return state;
    }
}

export default reviewsReducer;
