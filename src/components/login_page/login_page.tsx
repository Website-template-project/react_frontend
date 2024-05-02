import React,{useState} from 'react';
import {useCookie} from 'react-cookie'

function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [ isLoginView, setIsLoginView ] = useState(true);
    
    const isDisabled = username.length === 0 || password.length === 0;
}