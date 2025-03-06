import React from 'react';
import styles from './style.css';
import envelope from '../../../images/envelope.png';
import call from '../../../images/call.png';

type ContactProp = {
    typeOfContact: 'email' | 'telephone',
    contact: string
}

type ContactsProps = {
    contacts: ContactProp[];
}

const myContacts: ContactProp[] = [
    { typeOfContact: 'email', contact: 'margarit.fil@gmail.com' },
    { typeOfContact: 'telephone', contact: '+38 097 151 9327' }
];

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return <footer className={styles.footer}>
        <div className={styles.footerItems}>
            <div className={styles.aboutSection}>
                <h4>Mooovieeess</h4>
                <p>Discover and explore your favorite movies from around the world.</p>
            </div>
            <Contacts  contacts={myContacts}/>
        </div>
        <p className={styles.copyright}>&copy; {currentYear} Mooovieeess. All rights reserved.</p>

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
        <img  src={typeOfContact === 'email' ? envelope : call} alt={typeOfContact} />
        <p>{contact}</p>
    </li>;
};