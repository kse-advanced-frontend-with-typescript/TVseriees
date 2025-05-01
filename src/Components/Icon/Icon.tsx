import React from 'react';
import styles from './style.css';
import search from './icons/search.png';
import tick from './icons/down-arrow.png';
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
import loading from './icons/loading.png';
import error from './icons/error.png';
import direction from './icons/arrow.png';
import hidden from './icons/hidden.png';
import plus from './icons/plus.png';
import {IconTopic} from '../../types';
type IconProps ={
    topic: IconTopic;
    size: 'mini' | 'medium' | 'big' | 'premedium'
    mirror?: boolean;
}
export const Icon: React.FC<IconProps> = ({topic, size, mirror})=>{
    const getSource = () => {
        switch(topic) {
            case 'search': return search;
            case 'tick': return tick;
            case 'star': return star;
            case 'vote': return vote;
            case 'envelope': return envelope;
            case 'call': return call;
            case 'cross': return cross;
            case 'empty-star': return emptyStar;
            case 'black-cross' : return blackCross;
            case 'caret': return caret;
            case 'heart': return heart;
            case 'empty-heart': return emptyHeart;
            case 'empty-circle': return emptyCircle;
            case 'circle': return circle;
            case 'loading': return loading;
            case 'error': return error;
            case 'direction': return direction;
            case 'hidden': return hidden;
            case 'plus': return plus;
        }
    };
    return (
        <img
            className={classNames({
                [styles.mini]: size === 'mini',
                [styles.medium]: size === 'medium',
                [styles.mirror]: mirror,
                [styles.loading]: topic === 'loading',
                [styles.big]: size === 'big',
                [styles.premedium]: size === 'premedium'
            })}
            src={`${process.env.BASE_URL}${getSource()}`}
            alt={`${topic} icon`}
        />
    );
};