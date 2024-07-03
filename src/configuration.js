const CURRENT_URL_PROTOCOL_TYPE = 'http://';
const URL_RESOURCE_NAME = {
  LOCAL: 'localhost:8080/',
  PROD: '',
};
const CURRENT_URL_RESOURCE_NAME = URL_RESOURCE_NAME.LOCAL;

const getFullUrlPath = (relativePath) => {
  return CURRENT_URL_PROTOCOL_TYPE + CURRENT_URL_RESOURCE_NAME + relativePath;
};

// eslint-disable-next-line no-unused-vars
export const config = {
  URL: {
    USERS: {
      LOG_IN: getFullUrlPath('user/login'),
      GET_USER_LIST: getFullUrlPath('user/userList'),
    },
    ROOMS: {
      GET_ROOM_LIST: getFullUrlPath('room/roomList'),
      GET_ROOM_MESSAGES: getFullUrlPath('room/getRoomMessages'),
    },
  },
};
