import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
const context = createContext();

const ContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [webFields,setWebFields] = useState({});
    const [user,setUser] = useState({});
    const cookie_name = 'Scienghub';
    const [cookie,setCookies,deleteCookies] = useCookies([cookie_name]);   
    const [token,setToken] = useState(cookie['token'] || '' );
    const [lang,setLang] = useState(cookie['Accept-Language'] || 'en-US');
    const[template_headers,setTemplateheaders] = useState({
        'Content-Type':'application/json',
        'Accept-Language':lang,
    });
    //if(token !== '' || token !== null){
    //    setHeaders({
    //        ...headers,
    //        'Authortization': 'Token ' + token,
    //    })
    //}
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const api = import .meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchData = async ()=>{
            const headers = {
                ...template_headers,
                'Authorization': 'Token '+ token,
            };
            try{
                setError(false);
                setLoading(true);
                const response = await fetch(api + '/api/get_info/',{
                    method:'GET',
                    headers,
                });
                const result = await response.json();
                setUser(result);
            }
            catch{
                setError(true); 
            }
            finally{
                setLoading(false);
            }
        }
        if(token !== '' && token !== undefined && token !== null){
            fetchData();
        }
        else{
            const b = async ()=>{
                setUser({});
            }
            b();
        }
        setCookies('token',token);
    },[token]);

    useEffect(()=>{
        setCookies('Accept-Language',lang);
        setTemplateheaders({
            ...template_headers,
            'Accept-Language':lang,
        })
    },[lang]);

    const a = (username:String,password:String,endpoint:String)=>{
        const fetchToken= async ()=>{
            try{
                setError(false);
                setLoading(true);
                const headers = template_headers;
                const response = await fetch(api + endpoint,{
                    method:'POST',
                    headers,
                    body : JSON.stringify({
                        username,
                        password,
                    })
                });
                const result = await response.json();
                if(response.status === 200){
                    setToken(result['token']);
                }
                else{
                    setError(true);
                }
            }
            catch{
                setError(true);
            }
            finally{
                setLoading(false);
            }
        }
        fetchToken();
    }

    const createUser = (username:String,password:String)=>{
        a(username,password,'/api/register/');
    };

    const loggingIn = (username:String,password:String)=>{
        a(username,password,'/auth/');
    };
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const value = {theme,lang,webFields,user,error,loading,toggleTheme,setLang,setError,setLoading,createUser,loggingIn};
    return (
        <context.Provider value={value}>{children}</context.Provider>
    );
};
export {context,ContextProvider};
