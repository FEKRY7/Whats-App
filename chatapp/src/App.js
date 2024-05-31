import './App.css';
import { Routes,Route,Navigate } from "react-router-dom"
import Chat from './pages/Chats'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

function App() {
  const {user} = useContext(AuthContext)
return (
<ChatContextProvider user={user}>
<div className='tanders'>
<NavBar/>
 <Container>
    <Routes>      
    <Route path="/" element={user ? <Chat/> : <Login/>}/>  
    <Route path="/SignUp" element={user ? <Chat/> : <SignUp/>}/>  
    <Route path="/Login" element={user ? <Chat/> : <Login/>}/>    
    <Route path="*" element={<Navigate to='/'/>}/>  
    </Routes>
 </Container>
</div>
</ChatContextProvider>  
  );
}

export default App;
