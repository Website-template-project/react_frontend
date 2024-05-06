import classNames from 'classnames';
import styles from './header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/vite.svg'
export interface HeaderProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Header = ({ className }: HeaderProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <NavLink to="/">
                <img src={Logo}/>
            </NavLink>
            <div className={styles.menu}>
                <NavLink
                    to="/login"
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    Sign in
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                >
                    About
                </NavLink>
            </div>
        </div>
    );
};
