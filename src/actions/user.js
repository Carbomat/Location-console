import {
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  SET_MESSAGE,
} from './types';

import UserService from '../services/user.service';

export default () => dispatch => UserService.getProducts().then(
  response => {
    dispatch({
      type: PRODUCTS_SUCCESS,
      payload: { products: response.data },
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({
      type: PRODUCTS_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);
