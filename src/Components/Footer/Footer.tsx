import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';

type ContactProp = {
    typeOfContact: 'email' | 'call',
    contact: string
}

type ContactsProps = {
    contacts: ContactProp[];
}

const myContacts: ContactProp[] = [
    { typeOfContact: 'email', contact: 'margarit.fil@gmail.com' },
    { typeOfContact: 'call', contact: '+38 097 151 9327' }
];

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return <footer className={styles.footer}>
        <div className={styles.footerItems}>
            <div className={styles.aboutSection}>
                <h4>TV Serieees</h4>
                <p>Discover and explore your favorite TV series from around the world.</p>
            </div>
            <Contacts  contacts={myContacts}/>
        </div>
        <p className={styles.copyright}>&copy; {currentYear} TV Serieees. All rights reserved.</p>

    </footer>;
};

const Contacts: React.FC<ContactsProps> = ({contacts}) => {
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