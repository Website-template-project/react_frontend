import classNames from 'classnames';
import styles from './user_page.module.scss';
import { useState, useEffect,useContext } from 'react';
import {context} from '../../mycontext';
import { useNavigate } from "react-router-dom";

export interface UserProps {
    className?: string;
}
export const User = ({ className }: UserProps) => {
    const {theme,lang,webFields,user,error,loading,toggleTheme,setLang,setError,setLoading,createUser,loggingIn,loggingOut} = useContext(context);
    const navigate = useNavigate();
    const array:any[] = [];
    useEffect(()=>{
            if(Object.keys(user).length === 0){
                navigate('/login');
            }
        }
    ,[user]);
    Object.entries(user).forEach(([key, value]) => {
        array.push([key,value]);
    });
    return (
        <div>
            {array.map((tuple)=>{
                return <li>{tuple[0] + ' ' + tuple[1]}</li>;
            })}
            <button onClick = {loggingOut}>Log out</button>
        </div>);
}