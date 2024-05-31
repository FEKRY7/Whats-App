import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UseChat from '../components/chat/UseChat'; // Corrected import name
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats.js'
import ChatBox from '../components/chat/ChatBox.js';

const Chats = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

  return (
    <Container>
      <PotentialChats/>
      {userChats?.length < 1 ? null : (
        <Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
            {isUserChatsLoading ? <p>Loading chats...</p> : null} {/* Moved loading check inside JSX */}
            {userChats?.map((chat, index) => (
              <div key={index} onClick={()=>updateCurrentChat(chat)}>
                <UseChat chat={chat} user={user} /> {/* Corrected component name to UseChat */}
              </div>
            ))}
          </Stack>
          <ChatBox/>
        </Stack>
      )}
    </Container>
  );
};

export default Chats;
