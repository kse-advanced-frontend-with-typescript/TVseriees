import React from 'react';
import styles from './style.css';


export const AddMoreButton: React.FC<{onClick: ()=>void;}> =({ onClick})=>{
    return <button className={styles.button}  onClick={onClick}>Show more</button>;
};