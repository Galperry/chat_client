import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';

export const MessageCard = ({ message, currentUser }) => {
  const formattedDate = DateTime.fromMillis(message.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );

  const sentBy = useSelector(
    (state) =>
      state.user.userList.find((user) => user.id === message.userId)?.name ||
      'Deleted User'
  );
  const isMe = currentUser === message.userId;

  return (
    <div className={`msg-card ${isMe ? 'my-msg' : ''}`}>
      <div className="msg-details">
        <span className="sent-by">{sentBy}</span>
        <span className="msg-date">{formattedDate}</span>
      </div>
      <div className="message-content">
        <span>{message.content}</span>
        {isMe && message.isRead && (
          <span>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 74.46"
            >
              <g fill="#32b8e4">
                <path d="M1.87,47.2a6.33,6.33,0,1,1,8.92-9c8.88,8.85,17.53,17.66,26.53,26.45l-3.76,4.45-.35.37a6.33,6.33,0,0,1-8.95,0L1.87,47.2ZM30,43.55a6.33,6.33,0,1,1,8.82-9.07l25,24.38L111.64,2.29c5.37-6.35,15,1.84,9.66,8.18L69.07,72.22l-.3.33a6.33,6.33,0,0,1-8.95.12L30,43.55Zm28.76-4.21-.31.33-9.07-8.85L71.67,4.42c5.37-6.35,15,1.83,9.67,8.18L58.74,39.34Z" />
              </g>
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};
