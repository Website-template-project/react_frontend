import classNames from 'classnames';
import styles from './login_page.module.scss';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import backgroundImage from '../../assets/6106991.jpg'
import { useNavigate } from "react-router-dom";

export interface LoginProps {
    className?: string;
}
export const Login = ({ className }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const [isMouseHover,setIsMouseHover] = useState(false);
    const [token, setToken, removeToken] = useCookies(['Cookies']);
    const handleMouseIn = ()=>{setIsMouseHover(true)};
    const handleMouseOut = ()=>{setIsMouseHover(false)};

    const isDisabled = username.length === 0 || password.length === 0;
    useEffect(() => {
        //
;    }, [token]);
    const loginClicked = () => {};
    const registerClicked = () => {};
    return (
    <body style={{ backgroundImage: `url(${backgroundImage})` }}>
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
            </div>
        </div>
    </body>
    );
};
