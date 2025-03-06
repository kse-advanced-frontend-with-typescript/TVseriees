import React from 'react';
import styles from './style.css';
import search from '../../../images/search.png';
import arrow from '../../../images/down-arrow.png';
import classNames from 'classnames';

type IconProps ={
    topic: 'search' | 'arrow';
    size: 'mini' | 'medium' ;
}
export const Icon: React.FC<IconProps> = ({topic, size})=>{
    return  <img
        className={classNames({
            [styles.mini]: size === 'mini',
            [styles.medium]: size === 'medium'
        })}
        src={topic === 'search' ? search : arrow}
        alt={topic === 'search' ? 'Search icon' : 'Down arrow icon'}
    />;
};