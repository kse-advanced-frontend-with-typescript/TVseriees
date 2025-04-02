import React from 'react';
import {Link} from 'react-router';
import {Links} from '../Footer/Footer';
import styles from './style.css';
import classNames from 'classnames';

export const LinksSection: React.FC<{links: Links, style: 'menu' | 'footer'}> = ({links, style}) => {
    return (
        <div>
            <ul className={classNames(styles.links, {
                [styles.footer]: style === 'footer',
                [styles.menu]: style === 'menu'
            })}>
                {links.links.map((link, index) => (
                    <li key={`link-${index}`} className={styles.link}>
                        <Link to={`/${link.request_type}`}>{link.name}</Link>
                    </li>
                ))}
                {links.userLinks.map((link, index) => (
                    <li key={`userlink-${index}`} className={styles.link}>
                        <Link to={`/${link}`}>{link}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};