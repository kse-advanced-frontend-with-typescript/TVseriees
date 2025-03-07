import React from 'react';
import styles from './style.css';


export const MenuButton: React.FC = ()=>{
    return <button className={styles.menuComponent}>
        <div className={styles.menu}>
            <Line/>
            <Line/>
            <Line/>
        </div>
    <p className={styles.menuText}>Menu</p>
    </button>;
};

const Line: React.FC = ()=>{
    return <div className={styles.line}></div>;
};