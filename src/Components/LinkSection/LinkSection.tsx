import React from 'react';
import { Link } from 'react-router';
import styles from './style.css';
import classNames from 'classnames';
import {Links} from '../../types';

export const LinksSection: React.FC<{ links: Links, style: 'menu' | 'footer', authorized: boolean }> = ({ links, style, authorized }) => {
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
                {authorized && links.userLinks.map((link, index) => (
                    <li key={`userlink-${index}`} className={styles.link}>
                        <Link to={`/user/${link.request_type}`}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
