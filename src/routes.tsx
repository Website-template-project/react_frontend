import { RouteObject } from 'react-router-dom';
import { SiteWrapper } from './components/site-wrapper/site-wrapper';
import { HomePage } from './components/home-page/home-page';
import { About } from './components/about/About.1';
import { Login }from './components/login_page/login_page';
import {Lang} from './components/lang/lang-page';
import {User} from './components/user_page/user_page';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <SiteWrapper />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <About /> },
            { path: 'login', element: <Login />},
            { path: 'lang', element: <Lang />},
            { path: 'user', element: <User />},
        ],
    },
];
