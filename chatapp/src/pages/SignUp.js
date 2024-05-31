// import React, { useContext } from 'react'
// import {Alert,Button,Form,Row,Col,Stack} from 'react-bootstrap'
// import { AuthContext } from '../context/AuthContext'
// const SignUp = () => {

// const {signupInfo,updateSignupInfo,signupUser,signupError,isSignupLoading} = useContext(AuthContext)    

// return (
//     <Form onSubmit={signupUser}>
//         <Row
//           style={{
//             height:"100vh",
//             justifyContent:"center",
//             paddingTop:"10%"
//           }}
//         >
//             <Col xs={6}>
//               <Stack gap={3}>
//                 <h2>SignUp</h2>

//                 <Form.Control 
//                 type='text' 
//                 placeholder='Name' 
//                 onChange={(e)=> 
//                 updateSignupInfo({...signupInfo,name:e.target.value})}
//                 />
//                 <Form.Control 
//                 type='email' 
//                 placeholder='Email'
//                 onChange={(e)=> 
//                 updateSignupInfo({...signupInfo,email:e.target.value})}
//                 />
//                 <Form.Control 
//                 type='password' 
//                 placeholder='Password'
//                 onChange={(e)=> 
//                 updateSignupInfo({...signupInfo,password:e.target.value})}
//                 />
//                 <Button variant='primary' type='submit'>
//                 {isSignupLoading ? "Creat your account" : "SignUp"}
//                 </Button>
//                   {
//                     signupError?.error && (
//                         <Alert variant='danger'>
//                     <p>{signupError?.message}</p>
//                  </Alert>
//                     )} 
//               </Stack>
//             </Col>
//         </Row>
//     </Form>
//   )
// }

// export default SignUp


import React, { useContext } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
    const { signupInfo, updateSignupInfo, signupUser, signupError, isSignupLoading } = useContext(AuthContext);

    return (
        <Form onSubmit={signupUser}>
            <Row
                style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10%"
                }}
            >
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>SignUp</h2>

                        <Form.Control
                            type='text'
                            placeholder='Name'
                            onChange={(e) =>
                                updateSignupInfo({ ...signupInfo, name: e.target.value })}
                        />
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            onChange={(e) =>
                                updateSignupInfo({ ...signupInfo, email: e.target.value })}
                        />
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            onChange={(e) =>
                                updateSignupInfo({ ...signupInfo, password: e.target.value })}
                        />
                        <Button variant='primary' type='submit' disabled={isSignupLoading}>
                            {isSignupLoading ? "Creating your account..." : "SignUp"}
                        </Button>
                        {
                            signupError?.error && (
                                <Alert variant='danger'>
                                    <p>{signupError?.message}</p>
                                </Alert>
                            )}
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};

export default SignUp;


