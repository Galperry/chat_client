import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatContent } from './ChatContent';
import { Sidebar } from './Sidebar';
import { getUserList } from '../actions';

import './style.scss';

export const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const selectedRoom = useSelector((state) => state.room.selectedRoom);

  return (
    <div className="chat-page">
      <div className="chat-wrapper">
        <Sidebar selectedRoom={selectedRoom} />
        <div className="main-content">
          {selectedRoom ? (
            <ChatContent roomId={selectedRoom} />
          ) : (
            <div className="no-room-selected">
              <h3>Select a room from the menu and start chatting!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
