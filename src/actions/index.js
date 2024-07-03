import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  GET_ROOM_LIST,
  SELECT_ROOM,
  GET_USER_LIST,
} from '../constants/action-types';
import { config } from '../configuration';

export const loginUser = (userCredentials) => (dispatch) => {
  const username = userCredentials.username;
  const password = userCredentials.password;
  axios
    .post(config.URL.USERS.LOG_IN, { username, password })
    .then((response) => {
      if (response.data.isSucceed) {
        dispatch({
          type: LOGIN_USER,
          payload: { username, userId: response.data.userId },
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: { message: response.data.message },
        });
      }
    });
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});

export const getUserList = () => (dispatch) => {
  axios.get(config.URL.USERS.GET_USER_LIST).then((response) => {
    console.log(response);
    if (response.data.isSucceed) {
      dispatch({
        type: GET_USER_LIST,
        payload: { userList: response.data.userList },
      });
    } else {
      console.log(response.data?.message);
    }
  });
};

export const getRoomList = () => (dispatch) => {
  axios.get(config.URL.ROOMS.GET_ROOM_LIST).then((response) => {
    if (response.data.isSucceed) {
      dispatch({
        type: GET_ROOM_LIST,
        payload: { roomList: response.data.roomList },
      });
    } else {
      dispatch({ type: LOGIN_ERROR });
    }
  });
};

export const selectRoom = (selectedId) => ({
  type: SELECT_ROOM,
  payload: { selectedId },
});
