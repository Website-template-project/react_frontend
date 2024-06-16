import classNames from 'classnames';
import styles from './lang-page.module.scss';
import { useState, useEffect,useContext } from 'react';
import { useCookies } from 'react-cookie';
import ReactLoading from 'react-loading';
import beautifyCode from '../beautifyCode/beautifyCode';
import {context} from '../../mycontext';
export interface LangProps {
    className?: string;
}
export const Lang = ({ className }: LangProps) => {
    const {theme,lang,webFields,user,error,loading,toggleTheme,setLang,setError,setLoading} = useContext(context);
    const [data,setData] = useState([lang]);
    const api = import .meta.env.VITE_APP_API_URL;
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(api + '/api/lang/',{
                    method:'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data);
            }
            catch{(error:any)=>{
                setError(true);
            }
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    return (
        <div className={classNames(styles.root, className)}>
            <div className={classNames(styles['grid-container'],className)}>Set the language</div>
            {loading ? 
                <ReactLoading type = "spinningBubbles" color = "#007bff" height = {'20%'} width = {'20%'}/>:
                data.map((language)=>{
                    return(
                    <button className={classNames(styles['grid-item'],className)} onClick = {()=>{setLang(language)}} id = {language}>
                        {beautifyCode(language)}
                    </button>
                    );
                })
            }
        </div>    
    );
};
