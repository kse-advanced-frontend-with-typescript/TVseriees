import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';

export const Rating: React.FC<{averageVote: number, voteCount: number}> = ({averageVote, voteCount})=>{
    return <div className={styles.rating}>
        <div className={styles.group}><Icon topic='star' size='medium'/>
            <p>{averageVote}/10</p>
        </div>
        <div className={styles.group}><Icon topic='vote' size='medium'/>
            <p>{voteCount} votes</p>
        </div>
    </div>;

};