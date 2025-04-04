import React from 'react';
import styles from './style.css';


export const Error: React.FC<{message: string}> = ({message}) =>{
    return <div className={styles.error}>{message}</div>;
};