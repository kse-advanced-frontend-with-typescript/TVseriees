import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';
import classNames from "classnames";

export const Rating: React.FC<{averageVote: number, voteCount: number, size: 'small' | 'usual'}> = ({averageVote, voteCount, size = 'usual'}) => {
    return (
        <div className={classNames(styles.rating, {
            [styles.small]: size === 'small'
        })}>
            <div className={styles.group}>
                <Icon topic='star' size={size === 'small'? 'mini' : 'medium'}/>
                <p className={styles.text}>{averageVote}/10</p>
            </div>
            <div className={styles.group}>
                <Icon topic='vote' size={size === 'small'? 'mini' : 'medium'}/>
                <p className={styles.text}>{voteCount}</p>
            </div>
        </div>
    );
};