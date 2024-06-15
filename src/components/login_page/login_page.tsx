import classNames from 'classnames';
import styles from './login_page.module.scss';
import { useState, useEffect,useContext } from 'react';
import backgroundImage from '../../assets/6106991.jpg';
import {context} from '../../mycontext';
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';

export interface LoginProps {
    className?: string;
}
export const Login = ({ className }: LoginProps) => {
    const {theme,lang,webFields,user,error,loading,toggleTheme,setLang,setError,setLoading,createUser,loggingIn} = useContext(context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const [isMouseHover,setIsMouseHover] = useState(false);
    const handleMouseIn = ()=>{setIsMouseHover(true)};
    const handleMouseOut = ()=>{setIsMouseHover(false)};
    const navigate = useNavigate();
    const isDisabled = username.length === 0 || password.length === 0;
    const loginClicked = () => {
        loggingIn(username,password);
    };
    const registerClicked = () => {
        createUser(username,password);
    };
    useEffect(()=>{
        if(Object.keys(user).length !== 0){
            navigate('/user');
        }
    },[user])
    return (
        <body style={{ backgroundImage: `url(${backgroundImage})` }}>
            { loading?
            <ReactLoading type = "spinningBubbles" color = "#007bff" height = {'20%'} width = {'20%'}/>:
            <div className={classNames(styles.LoginBox, className)}>
                <header className={classNames(styles.Loginheader, className)}>
                   {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
                </header>
            <div className="login-container">
                <label htmlFor="username">Username</label>
                <br />
                <input className={classNames(styles.LoginInput, className)}
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input className={classNames(styles.LoginInput, className)}
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                <br />
                {isLoginView ? (
                    <button className={classNames(styles.LoginButton, className)} 
                    onClick={loginClicked} disabled={isDisabled}>
                        Login
                    </button>
                ) : (
                    <button className={classNames(styles.LoginButton, className)}
                    onClick={registerClicked} disabled={isDisabled}>
                        Register
                    </button>
                )}
                {isLoginView ? (
                    <p style={{ color: isMouseHover ? 'blue' : 'black' }}
                    onClick={() => setIsLoginView(false)} 
                    onMouseOver={handleMouseIn} onMouseOut = {handleMouseOut}>
                        You don't have an account? Register here!
                    </p>
                ) : (
                    <p style={{ color: isMouseHover ? 'blue' : 'black' }}
                    onClick={() => setIsLoginView(true)}
                    onMouseOver={handleMouseIn} onMouseOut = {handleMouseOut}>
                        You already have an account? Login here!
                    </p>
                )}
                {error?(
                    <p style={{color:'red'}}>Process fail</p>
                ):(
                    <p></p>
                )}
                </div>
            </div>
            }
        </body>
    );
};
