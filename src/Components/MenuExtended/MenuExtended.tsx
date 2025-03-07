import React, {useState} from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';



type MenuExtendedProps ={
    links: string[],
    onClose: ()=>void
}
export const MenuExteded: React.FC<MenuExtendedProps>=({links, onClose})=>{
    return <div className={styles.menu}>
        <div className={styles.menuTop}>
            <h3>Menu</h3>
            <MiniButton topic='cross' size='medium' onClick={onClose}/>
        </div>

        <ul className={styles.menuItems}>
        {links.map((link, index)=>{
            return <li key={index}><a href='#'>{link}</a></li>;
        })}
    </ul></div>;
};