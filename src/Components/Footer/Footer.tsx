import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';
import {LinksSection} from '../LinkSection/LinkSection';
import {ContactProp, Links} from '../../types';

type FooterProps = {
    authorized: boolean,
    contacts: ContactProp[],
    links: Links
}

export const Footer: React.FC<FooterProps> = ({links, contacts, authorized}) => {
    const currentYear = new Date().getFullYear();
    return <footer className={styles.footer}>
        <div className={styles.footerItems}>
            <div className={styles.aboutSection}>
                <h4>TV Serieees</h4>
                <p>Discover and explore your favorite TV series from around the world.</p>
            </div>
            <div>
                <h4>Links</h4>
                <LinksSection links={links} style={'footer'} authorized={authorized}/>
            </div>
            <Contacts contacts={contacts}/>
        </div>
        <p className={styles.copyright}>&copy; {currentYear} TV Serieees. All rights reserved.</p>
    </footer>;
};

const Contacts: React.FC<{contacts: ContactProp[]}> = ({contacts}) => {
    return <div className={styles.contactsSection}>
        <h4>Contacts</h4>
        <ul>
            {contacts.map((contact, index) => (
                <Contact
                    key={index}
                    typeOfContact={contact.typeOfContact}
                    contact={contact.contact}
                />
            ))}
        </ul>
    </div>;
};

const Contact: React.FC<ContactProp> = ({typeOfContact, contact}) => {
    return <li className={styles.contact}>
        <Icon topic={typeOfContact === 'call' ? 'call' : 'envelope'} size='mini'/>
        <a href={typeOfContact==='email'? `mailto:${contact}`: `tel:${contact}`}>{contact}</a>
    </li>;
};
