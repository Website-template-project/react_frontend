import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { useCookies } from 'react-cookie';

interface ContextProviderProps {
    children?: ReactNode;
}
//interface Cookies {
//    token?: string;
//    'Accept-Language'?: string;
//}
interface AppContextType {
    theme: string;
    lang: string;
    webFields: Record<string,any>;
    user: Record<string,any>;
    error: boolean;
    loading: boolean;
    toggleTheme: () => void;
    setLang: (lang:string) => void;
    setError:(error:boolean)=>void;
    setLoading:(loading:boolean)=>void;
    createUser:(username:string,password:string)=>void;
    loggingIn:(username:string,password:string)=>void;
    loggingOut:()=>void;
};
const defaultContextValue: AppContextType = {
    theme: 'light',
    lang: 'en-US',
    webFields:{},
    user:{},
    error:false,
    loading:false,
    toggleTheme:()=>{},
    setLang:()=>{},
    setError:()=>{},
    setLoading:()=>{},
    createUser: () => {},
    loggingIn: () => {},
    loggingOut:() => {},
  };

const context = createContext<AppContextType>(defaultContextValue);

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [theme, setTheme] = useState<string>('light');
    const [webFields,setWebFields] = useState<Record<string,any>>({});
    const [user,setUser] = useState<Record<string,any>>({});
    const [cookie,setCookies,deleteCookies] = useCookies(['Accept-Language','token']);  
    const [token,setToken] = useState<string>(cookie?.token || '' );
    const [lang,setLang] = useState<string>(cookie?.['Accept-Language'] || 'en-US');
    const[template_headers,setTemplateheaders] = useState<Record<string,string>>({
        'Content-Type':'application/json',
        'Accept-Language':lang,
    });
    //if(token !== '' || token !== null){
    //    setHeaders({
    //        ...headers,
    //        'Authortization': 'Token ' + token,
    //    })
    //}
    const [error,setError] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(true);
    const api = import .meta.env.VITE_APP_API_URL;
    const loggingOut = ()=>{
        setToken('');
    };
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

    const a = (username:string,password:string,endpoint:string)=>{
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
    const createUser = (username:string,password:string)=>{
        a(username,password,'/api/register/');
    }

    const loggingIn = (username:string,password:string)=>{
        a(username,password,'/auth/');
    }
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    const value = {theme,lang,webFields,user,error,loading,toggleTheme,setLang,setError,setLoading,createUser,loggingIn,loggingOut};
    return (
        <context.Provider value={value}>{children}</context.Provider>
    );
};
export {context,ContextProvider};
