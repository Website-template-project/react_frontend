import classNames from 'classnames';
import styles from './lang-page.module.scss';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ReactLoading from 'react-loading';

export interface LangProps {
    className?: string;
}
export const Lang = ({ className }: LangProps) => {
    const cookie_name = 'Sciengcookies';
    const [cookie,setCookies] = useCookies([cookie_name]);
    const [lang,setLang] = useState(cookie.Accept_Language || 'en-US');
    const [data,setData] = useState([lang]);
    const [error,setError] = useState(null);
    const api = import .meta.env.VITE_APP_API_URL;
    const [loading,setLoading] = useState(true);
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
            catch{(error)=>{
                setError(error);
                }
            }
            finally{
                setLoading(false);
            }

        }
        fetchData();
    },[]);
    useEffect(()=>{
        fetch(
            api + '/api/lang/',
        {
            method:'POST',
            headers:{
                'Accept-Language':'${lang}',
            }
        });
        setCookies(cookie_name,{
            ...cookie,
            'Accept-Language': '${lang}',
        },{
            path:'/',
        });
    },[lang]);
    if(loading){
        return (
            <div>
                <ReactLoading type = "spinningBubbles" color = "#007bff" height = {'20%'} width = {'20%'}/>
            </div>
        );
    }
    return (
        <div>
            {
                data.map((language)=>{
                    return(
                    <button onClick = {()=>{setLang(language)}} id = {language}>
                        {language}
                    </button>
                    );
                })
            }
        </div>    
    );
};
