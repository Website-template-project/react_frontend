import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { ContextProvider } from './mycontext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CookiesProvider> 
            <ContextProvider>   
                <App />
            </ContextProvider>
        </CookiesProvider>
    </React.StrictMode>
);
