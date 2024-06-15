import classNames from 'classnames';
import styles from './header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/vite.svg'
//import { Lang } from './lang';
import { useCookies } from 'react-cookie';
import { useState, useEffect, useContext } from 'react';
import beautifyCode from '../beautifyCode/beautifyCode';
import {context} from '../../mycontext';
export interface HeaderProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Header = ({ className }: HeaderProps) => {
    //const [cookie,setCookies] = useCookies("Sciengcookies");
    //const [lang,setLang] = useState(cookie.lang || 'en-US');
    const {theme,lang,webFields,user,toggleTheme,setLang} = useContext(context);
    return (
            <div className={classNames(styles.root, className)}>
                <NavLink to="/">
                  <img src={Logo}/>
                </NavLink>
                <div className={styles.menu}>
                <NavLink
                    to="/lang"
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    {beautifyCode(lang)}
                </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => classNames({ [styles.active]: isActive })}
                    >
                        About
                    </NavLink>                
                    <NavLink
                        to="/login"
                        className={({ isActive }) => classNames({ [styles.active]: isActive })}
                    >
                        Sign in
                    </NavLink>
                </div>
            </div>
    );
};
