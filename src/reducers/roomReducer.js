import { GET_ROOM_LIST, SELECT_ROOM } from '../constants/action-types';

export const initialState = {
  roomList: [],
  selectedRoom: '',
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_LIST: {
      const roomList = action.payload.roomList;
      return { ...state, roomList };
    }

    case SELECT_ROOM: {
      const selectedRoom = action.payload.selectedId;
      return { ...state, selectedRoom };
    }

    default:
      return state;
  }
};
