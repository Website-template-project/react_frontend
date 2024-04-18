import classNames from 'classnames';
import styles from './footer.module.scss';
import FacebookIcon from '../../assets/facebook.svg?react';
import TwitterxIcon from '../../assets/twitterx.svg?react';
import DiscordIcon from '../../assets/discord.svg?react';
import YoutubeIcon from '../../assets/youtube.svg?react';
import MediumIcon from '../../assets/medium.svg?react';
import GithubIcon from '../../assets/github.svg?react';

export interface FooterProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Footer = ({ className }: FooterProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.details}>
                <div>Contact Jane Doe</div>
                <div className={styles.small}>
                    Mail: info@mysite.com
                    <br />
                    Tel: 123-456-7890
                    <br />
                    500 Terry Francine Street,
                    <br />
                    San Francisco, CA 94158
                </div>
            </div>
            <div className={styles.social}>
                <a href="/">
                    <TwitterxIcon className={styles.icon} />
                </a>
                <a href="/">
                    <FacebookIcon className={styles.icon} />
                </a>
                <a href="/">
                    <DiscordIcon className={styles.icon} />
                </a>
                <a href="/">
                    <YoutubeIcon className={styles.icon} />
                </a>
                <a href="/">
                    <MediumIcon className={styles.icon} />
                </a>
                <a href="/">
                    <GithubIcon className={styles.icon} />
                </a>
            </div>
        </div>
    );
};
