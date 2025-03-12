import React from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {AuthorizationButton} from '../AuthorizationButton/AuthorizationButton';



type MenuExtendedProps ={
    links: string[],
    onClose: ()=>void,
    authorized: boolean
}
export const MenuExtended: React.FC<MenuExtendedProps>=({links, onClose, authorized})=>{
    return <div className={styles.menu}>
        <div className={styles.menuTop}>
            <h3>Menu</h3>
            <MiniButton topic='cross' size='medium' onClick={onClose}/>
        </div>

        <ul className={styles.menuItems}>
        {links.map((link, index)=>{
            return <li key={index}><a href='#'>{link}</a></li>;
        })}
    </ul>
        <div className={styles.auth}>
            <AuthorizationButton type={authorized? 'log-out' : 'log-in'} form={false} onClick={()=>alert('clicked')}/>
            {!authorized && <AuthorizationButton type={'sign'} form={false} onClick={()=>alert('clicked')}/>}
        </div>

    </div>;
};