import React from 'react';
import styles from './style.css';
import {Poster} from '../Poster/Poster';


export const SeriesPictures: React.FC<{name: string, paths: string[]}> = ({name, paths})=>{
    return <div className={styles.picturesContainer}>
        <h2>Pictures</h2>
        <div className={styles.pictures}>
            {paths.map((path, index)=>(
                <Poster key={index} path={path} name={`${name} picture ${index}`} layout='small-horizontal'/>
            ))}
        </div>

    </div>;
};