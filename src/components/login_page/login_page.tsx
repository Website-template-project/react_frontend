import classNames from 'classnames';
import styles from './login_page.module.scss';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export interface LoginProps {
    className?: string;
}
export const Login = ({ className }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const [token, setToken, removeToken] = useCookies(['Cookies']);
    const isDisabled = username.length === 0 || password.length === 0;
    useEffect(() => {}, [token]);
    const loginClicked = () => {};
    const registerClicked = () => {};
    return (
        <div className={classNames(styles.LoginBox, className)}>
            <header className={classNames(styles.loginheader, className, styles.LoginBox)}>
                {isLoginView ? <h1></h1> : <h1>Register</h1>}
            </header>
            Login
            <div className="login-container">
                <label htmlFor="username">Username</label>
                <br />
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    id="password"
                    type="password"
                    placeholder="Description"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                <br />
                {isLoginView ? (
                    <button onClick={loginClicked} disabled={isDisabled}>
                        Login
                    </button>
                ) : (
                    <button onClick={registerClicked} disabled={isDisabled}>
                        Register
                    </button>
                )}
                {isLoginView ? (
                    <p onClick={() => setIsLoginView(false)}>
                        You don't have an account? Register here!
                    </p>
                ) : (
                    <p onClick={() => setIsLoginView(true)}>
                        You already have an account? Login here
                    </p>
                )}
            </div>
        </div>
    );
};
