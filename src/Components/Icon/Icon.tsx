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
import caret from './icons/caret.png';
import circle from './icons/circle.png';
import emptyCircle from './icons/empty-circle.png';
import heart from './icons/heart.png';
import emptyHeart from './icons/empty-heart.png';
type IconProps ={
    topic: 'search' | 'arrow' | 'star' | 'vote' | 'cross' | 'envelope' | 'call' | 'empty-star' | 'black-cross' | 'left-caret' | 'right-caret'
    | 'heart' | 'empty-heart' | 'empty-circle' | 'circle';
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
            case 'left-caret':
            case 'right-caret': return caret;
            case 'heart': return heart;
            case 'empty-heart': return emptyHeart;
            case 'empty-circle': return emptyCircle;
            case 'circle': return circle;
        }
    };
    return (
        <img
            className={classNames({
                [styles.mini]: size === 'mini',
                [styles.medium]: size === 'medium',
                [styles.mirror]: topic === 'right-caret'
            })}
            src={getSource()}
            alt={`${topic} icon`}
        />
    );
};