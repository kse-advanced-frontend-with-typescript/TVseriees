import React from 'react';
import styles from './style.css';


export const Button: React.FC<{purpose: string, onClick: ()=>void;}> =({purpose, onClick})=>{
    return <button className={styles.button} onClick={onClick}>{purpose}</button>;
};