import { csrfFetch } from "./csrf";

const SET_SPOTS = 'spots/setSpots';
const SET_SINGLE_SPOT = 'spots/setSingleSpot';
const CREATE_SPOT = 'spots/createSpot'
const SET_MY_SPOTS = 'spots/setMySpots';
const REMOVE_SPOT = 'spots/removeSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const RESET_SPOT = 'spots/resetSpot'

const resetSpot = () => {
    return {
        type: RESET_SPOT
    }
}

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

const addSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
}

const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    }
}

const removeSpot = (spotId) =>  {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}

const setMySpots = (mySpots) => {
    return {
        type: SET_MY_SPOTS,
        payload: mySpots
    }
}

export const fetchSpots = () => async dispatch => {
    dispatch(resetSpot());
    let res = await csrfFetch('/api/spots');

    if (res.ok) {
        res = await res.json();
        dispatch(setSpots(res.Spots))
        return res;
    }
}

export const fetchSpotById = (spotId) => async dispatch => {
    dispatch(resetSpot());
    let res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
        res = await res.json();
        dispatch(setSingleSpot(res));
        return res;
    }
}

export const createSpot = (spotData) => async (dispatch) => {
    const { images, ...spot } = spotData;

    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spot)
    })

    if (response.ok) {
      const data = await response.json();
      dispatch(addSpot(data))

      for (let image of images) {
          await csrfFetch(`/api/spots/${data.id}/images`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(image)
          });
        }

      return data
    }
}

export const updateSpot = (spotId, spotData) => async dispatch => {

    let res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    if (res.ok) {
        const updatedSpot = await res.json();
        dispatch(editSpot(updatedSpot));
        return updatedSpot;
    }
};


export const fetchMySpots = () => async (dispatch) => {
    let res = await csrfFetch('/api/spots/current');

    if (res.ok) {
        res = await res.json();
        dispatch(setMySpots(res.Spots));
        return res
    }

}

export const deleteSpot = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(removeSpot(res))
        dispatch(fetchMySpots());
    }

}

const initialState = { spots: [], spot: null, mySpots: [] }

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPOTS:
            return { ...state, spots: action.payload }
        case RESET_SPOT:
            return { ...state, spot: null }
        case SET_SINGLE_SPOT:
            return { ...state, spot: action.payload }
        case CREATE_SPOT:
            return {
                ...state, spots: [ ...state.spots, action.payload]
            };
        case UPDATE_SPOT:
            return {
                ...state,
                mySpots: state.mySpots.map(spot => spot.id === action.payload.id ? action.payload : spot)
            }
        case REMOVE_SPOT:
            return {
                ...state,
                mySpots: state.mySpots.filter(spot => spot.id !== action.spotId)
            };
        case SET_MY_SPOTS:
            return { ...state, mySpots: action.payload}
        default:
            return state;
    }
}

export default spotsReducer;
