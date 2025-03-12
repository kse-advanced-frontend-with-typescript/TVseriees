import React from 'react';
import styles from './style.css';
import search from './icons/search.png';
import arrow from './icons/down-arrow.png';
import star from './icons/star.png';
import vote from './icons/vote.png';
import call from './icons/call.png';
import envelope from './icons/envelope.png';
import cross from './icons/cross.png';
import emptyStar from './icons/empty-star.png';
import blackCross from './icons/black-cross.png';
import classNames from 'classnames';

type IconProps ={
    topic: 'search' | 'arrow' | 'star' | 'vote' | 'cross' | 'envelope' | 'call' | 'empty-star' | 'black-cross';
    size: 'mini' | 'medium' ;
}
export const Icon: React.FC<IconProps> = ({topic, size})=>{
    const getSource = () => {
        switch(topic) {
            case 'search': return search;
            case 'arrow': return arrow;
            case 'star': return star;
            case 'vote': return vote;
            case 'envelope': return envelope;
            case 'call': return call;
            case 'cross': return cross;
            case 'empty-star': return emptyStar;
            case 'black-cross' : return blackCross;
        }
    };
    return (
        <img
            className={classNames({
                [styles.mini]: size === 'mini',
                [styles.medium]: size === 'medium',
            })}
            src={getSource()}
            alt={`${topic} icon`}
        />
    );
};