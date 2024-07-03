import {
  ADD_NEW_MESSAGE,
  GET_ROOM_LIST,
  GET_ROOM_MESSAGES,
  READ_MESSAGES,
  SELECT_ROOM,
} from '../constants/action-types';

export const initialState = {
  roomList: [],
  selectedRoom: '',
  messages: {},
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

    case GET_ROOM_MESSAGES: {
      const messages = action.payload.messages;
      const roomId = action.payload.roomId;

      return {
        ...state,
        messages: { ...state.messages, [roomId]: messages },
      };
    }

    case ADD_NEW_MESSAGE: {
      const newMessage = action.payload.newMessage;
      const currentList = { ...state.messages }[newMessage.roomId];

      return {
        ...state,
        messages: {
          ...state.messages,
          [newMessage.roomId]: [...currentList, newMessage],
        },
      };
    }

    case READ_MESSAGES: {
      const readingUser = action.payload.readingUser;
      const roomId = action.payload.roomId;
      const lastTimestamp = action.payload.lastTimestamp;

      const newList = { ...state.messages }[roomId].map((message) => {
        const newMsg = { ...message };
        if (
          message.userId !== readingUser &&
          message.timestamp <= lastTimestamp
        ) {
          newMsg.isRead = true;
        }
        return newMsg;
      });

      return {
        ...state,
        messages: {
          ...state.messages,
          [roomId]: [...newList],
        },
      };
    }

    default:
      return state;
  }
};
