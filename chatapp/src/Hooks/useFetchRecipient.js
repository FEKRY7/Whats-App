import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../components/utils/Services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  
  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      
        if (!recipientId) return null; // Return if recipientId is not available

        const response = await getRequest(`${baseUrl}/user/findUser/${recipientId}`);
        

        if (response.error) {
            return setError(error);
          
        }

        setRecipientUser(response); // Assuming data is the recipient user object
      
    };

    getUser();

  }, [recipientId]); 

  return { recipientUser};
};
