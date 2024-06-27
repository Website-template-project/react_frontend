import classNames from 'classnames';
import styles from './home-page.module.scss';

import React, { useEffect, useState } from 'react';
import { quotes } from '../quotes'; // Adjust the path as needed

export interface HomePageProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const HomePage: React.FC<HomePageProps> = ({ className }) => {
    const [quote, setQuote] = useState<string>('');

    useEffect(() => {
        // Generate a random number between 1 and 365
        const randomIndex = Math.floor(Math.random() * quotes.length);
        // Set the quote based on the random index
        setQuote(quotes[randomIndex]);
    }, []);

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.title}>Welcome to Scienghub</div>
            <div className={styles.paragraph}>
                <div className={styles.text}>{quote}</div>
            </div>
            <button className={styles.button}>Learn more</button>
            <img
                src="https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dwixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                alt=""
                className={styles.image}
            />
        </div>
    );
};
