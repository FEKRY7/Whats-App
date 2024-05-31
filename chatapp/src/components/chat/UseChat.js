import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../Hooks/useFetchRecipient"; // Assuming correct import path
import avarter from "../../assets/avarter.svg";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationFunc } from "../utils/unreadNotification";
import { useFetchLatestMessage } from "../../Hooks/useFetchLetesMessage";
import moment from "moment";
const UseChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  
  const { latestMessage } = useFetchLatestMessage(chat)

  const unreadNotifications = unreadNotificationFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId == recipientUser?._id
  );
  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text)=>{
    let shortText = text.substring(0,20)

    if(text.length > 20){
      shortText = shortText + "..."
    }
    return shortText
  }

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avarter} height="35px" />
        </div>{" "}
        {/* Assuming this is the sender's initial */}
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>{" "}
          {/* Display recipient's name */}
          <div className="text">
          {latestMessage?.text && (
            <span>{truncateText(latestMessage?.text)}</span>
          )}
          </div> {/* Display chat message */}
          <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(latestMessage?.createdAt).calendar()}</div> {/* Display chat date */}
            <div
              className={
                thisUserNotifications?.length > 0
                  ? "this-user-notifications"
                  : ""
              }
            >
              {thisUserNotifications?.length > 0
                ? thisUserNotifications?.length
                : ""}
            </div>{" "}
            {/* Display chat notifications */}
            <span className={isOnline ? "user-online" : ""}></span>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default UseChat;
