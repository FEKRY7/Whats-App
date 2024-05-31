import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseUrl } from "../components/utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [signupError, setSignupError] = useState(null);
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    }); 

    useEffect(()=>{
      const user = localStorage.getItem('User')

      setUser(JSON.parse(user))
      
    },[])

    const updateSignupInfo = useCallback((info) => {
        setSignupInfo(info);
    }, []);
    
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const signupUser = useCallback(async (e) => {
        e.preventDefault();
        setIsSignupLoading(true);
        setSignupError(null);
        try {
            const response = await postRequest(
                `${baseUrl}/user/SignUp`,
                JSON.stringify(signupInfo)
            );
            setIsSignupLoading(false);

            if (response.error) {
                return setSignupError(response);
            }

            // Store user data in localStorage after successful signup
            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
        } catch (error) {
            console.error("Error during signup:", error);
            setIsSignupLoading(false);
            setSignupError("An error occurred during signup");
        }
    }, [signupInfo]);
     

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);
        try {
            const response = await postRequest(
                `${baseUrl}/user/SignIn`,
                JSON.stringify(loginInfo)
            );

            setIsLoginLoading(false);

            if (response.error) {
                return setLoginError(response);
            }

            // Store user data in localStorage after successful signup
            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);

        } catch (error) {
            console.error("Error during signup:", error);
            setIsLoginLoading(false);
            setLoginError("An error occurred during signup");
        }
        
    }, [loginInfo]);



    const logoutUser = useCallback(()=>{
      localStorage.removeItem('User')
      setUser(null)
      console.log('User',user);
    },[])
    
    return (
        <AuthContext.Provider
            value={{
                user,
                signupInfo,
                updateSignupInfo,
                signupUser,
                signupError,
                isSignupLoading,
                logoutUser,
                loginUser,
                updateLoginInfo,
                loginError,
                loginInfo,
                isLoginLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
