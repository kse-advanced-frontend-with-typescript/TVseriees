import React from 'react';
import styles from './style.css';

type SeriesCardProps ={
    imagePath: string,
    name: string,
    year: number
}

export const SeriesCard: React.FC<SeriesCardProps> = ({imagePath, name, year})=>{
    return <div className={styles.seriesCard}>
        <img src={imagePath} alt={name + ' image'}/>
        <h3 >{name}</h3>
        <p>{year}</p>
    </div>;
};