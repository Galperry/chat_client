import { io } from 'socket.io-client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage, getRoomMessages, readMessages } from '../actions';
import { MessageCard } from './MessageCard';

export const ChatContent = ({ roomId }) => {
  const dispatch = useDispatch();

  const [myMsg, setMyMsg] = useState('');
  const [emitMsg, setEmitMsg] = useState(false);

  const socket = useMemo(() => io('ws://localhost:8080'), []);

  const userId =
    useSelector((state) => state.user.userId) ||
    sessionStorage.getItem('userId');
  const roomMessages = useSelector((state) => state.room.messages[roomId]);

  const onVisibilityChange = useCallback(() => {
    if (!document.hidden && emitMsg) {
      console.log('emitting now');
      socket.emit('readMessages', {
        lastTimestamp: Date.now(),
        roomId,
        userId,
      });
      setEmitMsg(false);
    }
  }, [emitMsg, roomId, userId, socket]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [onVisibilityChange]);

  useEffect(() => {
    socket.emit('getMessages', roomId, userId);

    return setMyMsg('');
  }, [dispatch, socket, roomId, userId]);

  useEffect(() => {
    socket.on('message', (data) => {
      if (data.roomId !== roomId) {
        return;
      }
      dispatch(addNewMessage(data));
      if (data.userId !== userId) {
        if (document.hidden) {
          setEmitMsg(true);
        } else {
          socket.emit('readMessages', {
            lastTimestamp: data.timestamp,
            roomId,
            userId,
          });
        }
      }
    });
    socket.on('getMessages', (data) => {
      if (data.isSucceed) {
        const messages = data.messages;
        if (data.userId !== userId) {
          return;
        }
        dispatch(getRoomMessages(roomId, messages));
        if (messages.length) {
          socket.emit('readMessages', {
            lastTimestamp: messages[messages.length - 1].timestamp,
            roomId,
            userId,
          });
        }
      }
    });
    socket.on('readMessages', (resObj) => {
      const readingUser = resObj.readingUser;
      if (readingUser !== userId) {
        dispatch(
          readMessages({
            lastTimestamp: resObj.lastTimestamp,
            readingUser,
            roomId,
          })
        );
      }
    });

    return () => {
      socket.off('message');
      socket.off('getMessages');
    };
  }, [socket, roomId, dispatch, userId]);

  useEffect(() => {
    const conversationContainer = document.getElementById('conv');
    conversationContainer.scrollTo(0, conversationContainer.scrollHeight);
  }, [roomMessages]);

  const sendMsg = () => {
    socket.emit('message', { content: myMsg, userId, roomId });
    setMyMsg('');
  };

  const changeMsg = (e) => {
    setMyMsg(e.target.value);
  };

  return (
    <div className="chat-content">
      <div id="conv" className="conversation-container">
        {roomMessages?.length ? (
          <div>
            {roomMessages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                currentUser={userId}
              />
            ))}
          </div>
        ) : (
          <div className="empty-conv">
            Write a message and start a conversation
          </div>
        )}
      </div>
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
