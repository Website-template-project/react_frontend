import classNames from 'classnames';
import styles from './header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
export interface HeaderProps {
    className?: string;
}
const countryCodeToEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };
export const Lang = ()=>{
    const [cookie,setCookies] = useCookies("Sciengcookies");
    const [lang,setLang] = useState(cookie.lang || 'en-US');
    return (
      <NavLink
          to="/lang"
          className={({ isActive }) => classNames({ [styles.active]: isActive })}
      >
            {lang.slice(0,2).toUpperCase() + " " + countryCodeToEmoji(lang.slice(-2))}
      </NavLink>);
}