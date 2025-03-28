import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';

export type ContactProp = {
    typeOfContact: 'email' | 'call',
    contact: string
}

const myContacts: ContactProp[] = [
    { typeOfContact: 'email', contact: 'margarit.fil@gmail.com' },
    { typeOfContact: 'call', contact: '+38 097 151 9327' }
];
const links: string[] = [
    'top-rated',
    'on the air in the next 7 days',
    'popular',
    'to-watch',
    'watched',
    'favorite'
];

type FooterProps = {
    links: string[]
    contacts: ContactProp[]

}
export const Footer: React.FC<FooterProps> = ({links, contacts}) => {
    const currentYear = new Date().getFullYear();
    return <footer className={styles.footer}>
        <div className={styles.footerItems}>
            <div className={styles.aboutSection}>
                <h4>TV Serieees</h4>
                <p>Discover and explore your favorite TV series from around the world.</p>
            </div>
            <Links links={links}/>
            <Contacts  contacts={contacts}/>
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
    </ul></div>;
};

const Contact: React.FC<ContactProp> = ({typeOfContact, contact}) => {
    return <li className={styles.contact}>
        <Icon topic={typeOfContact == 'call' ? 'call' : 'envelope' } size='mini'/>
        <p>{contact}</p>
    </li>;
};

const Links: React.FC<{links: string[]}> = ({links})=>{
    return <div>
        <h4>Links</h4>
        <ul className={styles.links}>

            {links.map((link, index)=>
                    <React.Fragment key={index}>
                    <li className={styles.link}><a href='#'>{link}</a></li>
                    </React.Fragment>
            )}
        </ul>
    </div>;

};