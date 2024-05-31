import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../components/utils/Services";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/message/${chat?._id}`);

            if (response.error) {
                return console.log("Error getting messages...", response.error);
            }

            const lastMessage = response[response?.length - 1];
            setLatestMessage(lastMessage);
        };

        getMessages();
    }, [newMessage, notifications]);

    return { latestMessage };
};