import React from 'react';
import styles from './style.css';

export const Overview: React.FC<{overview: string}> = ({overview})=>{
    return   <div className={styles.overview} >
        <h3>Overview</h3>
        <article> {overview}</article>
    </div>;
};