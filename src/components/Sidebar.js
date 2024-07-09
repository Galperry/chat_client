import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, getRoomList } from '../actions';
import { useEffect } from 'react';
import { RoomCard } from './RoomCard';

export const Sidebar = ({ selectedRoom }) => {
  const rooms = useSelector((state) => state.room.roomList);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getRoomList());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div className="roomlist-container">
        <h5>Room list</h5>
        <div className="list-group">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} selectedRoom={selectedRoom} />
          ))}
        </div>
      </div>

      <div className="actions-container">
        <button onClick={logout} type="button" className="btn btn-secondary">
          Log Out
        </button>
      </div>
    </div>
  );
};
