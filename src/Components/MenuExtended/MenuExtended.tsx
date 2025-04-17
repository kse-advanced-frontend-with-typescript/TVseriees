import React from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {AuthorizationButton} from '../AuthorizationButton/AuthorizationButton';
import classNames from 'classnames';



type MenuExtendedProps ={
    links: string[],
    personalizedLinks?: string[],
    onClose: ()=>void,
    authorized: boolean
}


export const MenuExtended: React.FC<MenuExtendedProps>=({links, personalizedLinks = [], onClose, authorized})=>{
    return <div className={styles.menu}>
        <div className={styles.menuTop}>
            <h3>Menu</h3>
            <MiniButton topic='cross' size='medium' onClick={onClose}/>
        </div>

        <Links links={links}/>
        {authorized && <Links className='pers' links={personalizedLinks}/>}
        <div className={styles.auth}>
            <AuthorizationButton warning={false} type={authorized? 'log-out' : 'log-in'} form={false} onClick={()=>alert('clicked')}/>
            {!authorized && <AuthorizationButton type={'sign'} onClick={()=>alert('clicked')}/>}
        </div>

    </div>;
};

const Links: React.FC<{className?: string, links: string[]}> = ({className, links}) => {
    return (
        <ul className={classNames(styles.menuItems, className && styles[className])}>
            {links.map((link, index) => {
                return <li key={index}><a href='#'>{link}</a></li>;
            })}
        </ul>
    );
};