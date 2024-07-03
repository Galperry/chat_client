import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ChatContent = ({ roomId }) => {
  const dispatch = useDispatch();
  const [myMsg, setMyMsg] = useState('');
  const userId =
    useSelector((state) => state.user.userId) ||
    sessionStorage.getItem('userId');

  const socket = useMemo(() => io('ws://localhost:8080'), []);

  //   useEffect(() => {
  //     dispatch();
  //   }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Message from server', data);
    });
  }, [socket]);

  const sendMsg = () => {
    socket.emit('message', { content: myMsg, userId, roomId });
  };

  const changeMsg = (e) => {
    setMyMsg(e.target.value);
  };

  return (
    <div className="chat-content">
      <div className="conversation-container"></div>
      <div className="send-msg-container">
        <textarea onInput={changeMsg} value={myMsg} />
        <button
          className="btn btn-success"
          onClick={sendMsg}
          disabled={myMsg.length === 0}
        >
          Send
        </button>
      </div>
    </div>
  );
};
