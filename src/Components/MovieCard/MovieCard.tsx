import React from 'react';
import styles from './style.css';

type MovieCardProps={
    imagePath: string,
    name: string,
    year: number
}

export const MovieCard: React.FC<MovieCardProps> = ({imagePath, name, year})=>{
    return <div className={styles.movieCard}>
        <img src={imagePath} alt={name + ' image'}/>
        <h3 >{name}</h3>
        <p>{year}</p>
    </div>;
};