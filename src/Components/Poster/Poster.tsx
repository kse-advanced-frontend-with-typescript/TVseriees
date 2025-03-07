import React from 'react';
import styles from './style.css';

export const Poster: React.FC<{path: string, name: string}> = ({path, name})=>{
    return <img className={styles.poster} src={path} alt={name + ' poster'}/>;
};

