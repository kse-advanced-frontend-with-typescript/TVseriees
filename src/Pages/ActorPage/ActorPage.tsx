import React from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {poster, actordata} from '../../ExampleData';
import {Actor} from '../../Components/Actor/Actor';
import styles from './style.css';

export const ActorPage: React.FC = ()=>{
    return <div className={styles.actorPage}>
        <Poster path={poster.path} name={poster.name} layout='vertical'/>
        <Actor name={actordata.name} knownFor={actordata.knownFor}/>
    </div>;
};