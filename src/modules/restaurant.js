import axios from 'axios';
import { push } from 'react-router-redux';
import configData from '../config';
export const CHANGE_MILES_REQUESTED = 'miles/CHANGE_REQUEST';
export const CHANGE_MILES = 'miles/CHANGE';
export const RESTAURANTS_REQUESTED = 'restaurant/RESTAURANT_REQUEST';
export const RESTAURANTS = 'restaurant/RESTAURANTS';

const initialState = {
  miles: 5,
  restaurants: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MILES_REQUESTED:
      return {
        ...state,
        isFetching: true
      };

    case CHANGE_MILES:
      return {
        ...state,
        miles: action.miles || 5,
        isFetching: !state.isFetching
      };

    case RESTAURANTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      };

    case RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
        isFetching: !state.isFetching
      };

    default:
      return state;
  }
};

export const changeMiles = () => {
  return dispatch => {
    dispatch({
      type: CHANGE_MILES_REQUESTED
    });

    return setTimeout(() => {
      dispatch({
        type: CHANGE_MILES,
        miles: dispatch.miles || 5
      });
      dispatch({
        type: RESTAURANTS,
        restaurants: []
      });
    }, 3000);
  };
};

export const requestRestaurant = (coords, radius = 5, done) => {
  return dispatch => {
    dispatch({
      type: RESTAURANTS_REQUESTED
    });
    const coordString = `${coords.lat + ',' + coords.lng}`;
    const config = config;
    return axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordString}&radius=${radius}&type=restaurant&key=${
          configData.pAPIKey
        }`
      )
      .then(response => {
        return dispatch({
          type: RESTAURANTS,
          restaurants: response.data.results
        });
        done();
      })
      .catch(error => {
        console.log('fet retaurants error');
      });
  };
};
