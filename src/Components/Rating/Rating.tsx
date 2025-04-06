import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';
import classNames from 'classnames';

export const Rating: React.FC<{averageVote: number, voteCount: number, size: 'mini' | 'premedium' | 'medium' }> = ({averageVote, voteCount, size}) => {
    return (
        <div className={classNames(styles.rating, {
            [styles.small]: size === 'mini'
        })}>
            <div className={styles.group}>
                <Icon topic='star' size={size}/>
                <p className={styles.text}>{averageVote}/10</p>
            </div>
            <div className={styles.group}>
                <Icon topic='vote' size={size}/>
                <p className={styles.text}>{voteCount}</p>
            </div>
        </div>
    );
};