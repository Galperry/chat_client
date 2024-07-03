import { useDispatch } from 'react-redux';
import { selectRoom } from '../actions';

export const RoomCard = ({ room, selectedRoom }) => {
  const dispatch = useDispatch();
  const onSelectRoom = () => {
    dispatch(selectRoom(room._id));
  };

  return (
    <li
      onClick={onSelectRoom}
      key={room._id}
      className={`list-group-item list-group-item-action ${
        room._id === selectedRoom ? 'active' : ''
      }`}
    >
      {room.name}
    </li>
  );
};
