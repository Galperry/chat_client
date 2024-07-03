import {
  CLEAR_LOGIN_ERROR,
  GET_USER_LIST,
  LOGIN_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
} from '../constants/action-types';

export const initialState = {
  userId: '',
  username: '',
  loginErr: '',
  userList: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const userId = action.payload.userId;
      const username = action.payload.username;
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('username', username);
      return { ...state, userId, username };
    }

    case LOGOUT_USER: {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('username');
      return initialState;
    }

    case LOGIN_ERROR: {
      const loginErr = action.payload.message;
      return { ...state, loginErr };
    }

    case CLEAR_LOGIN_ERROR: {
      return { ...state, loginErr: '' };
    }

    case GET_USER_LIST: {
      const userList = action.payload.userList;
      return { ...state, userList };
    }

    default:
      return state;
  }
};
