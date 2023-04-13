import React from "react";
import { useGetAllMessagesQuery } from "../../redux/store";
import { nanoid } from "nanoid";
import "../../styles/adminMessages.css";
import { useUpdateMessageStatusMutation } from "../../redux/store";

const AdminMessages = () => {
  const { data, error, isFetching } = useGetAllMessagesQuery();
  const [updateMessageStatus, results] = useUpdateMessageStatusMutation();

  if (data) {
    console.log(data);
  }

  const changeReadStatus = (id) => {
    updateMessageStatus({ id: id });
  };

  return (
    <div className="messages_wrapper">
      <h2 className="messages_main-title">Messages</h2>
      <div className="messages_container">
        <div className="messages-titles">
          <div className="message_date-title">Date</div>
          <div className="message_email-title">Email</div>
          <div className="message_text-title">Message</div>
          <div className="message_status-title">Status</div>
        </div>
        {data &&
          data.map((message) => (
            <div
              className={`message-item ${
                message.isRead ? "status-read" : "status-unread"
              }`}
              key={nanoid(7)}
            >
              <div className="message-date">
                {new Date(message.createdAt).toISOString().slice(0, 10)}
              </div>
              <div className="message_sender-email">{message.email}</div>
              <div className="message_text-message">{message.message}</div>
              <div className="message_status-container">
                <p className="message_status">
                  {message.isRead ? "Read" : "Unread"}
                </p>
                <button
                  className="message_change_status-btn"
                  onClick={() => changeReadStatus(message._id)}
                >
                  Mark as {message.isRead ? "unread" : "read"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminMessages;
