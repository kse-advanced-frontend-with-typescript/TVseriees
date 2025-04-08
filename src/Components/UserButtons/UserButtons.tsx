import React from 'react';
import styles from '../UserButtons/style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {UsualCardProps} from '../../types';

type ButtonStates = {
    star: boolean;
    heart: boolean;
    circle: boolean;
};

export const UserButtons: React.FC<UsualCardProps & {bigger?: boolean}> = ({onHeartClick, onStarClick, onCircleClick, bigger}) => {
    const [topic, setTopic] = React.useState<ButtonStates>({
        star: false,
        heart: false,
        circle: false,
    });
    const onClick = (type: keyof ButtonStates, callback: ()=>void) => {
        setTopic(previousState => ({
            ...previousState,
            [type]: !previousState[type]
        }));
        callback();
    };
    return (
        <div className={styles.buttons}>
            <MiniButton
                topic={topic.star ? 'star' : 'empty-star'}
                size={bigger? 'premedium': 'mini'}
                onClick={() => onClick('star', onStarClick)}
            />
            <MiniButton
                topic={topic.heart ? 'heart' : 'empty-heart'}
                size={bigger? 'premedium': 'mini'}
                onClick={() => onClick('heart', onHeartClick)}
            />
            <MiniButton
                topic={topic.circle ? 'circle' : 'empty-circle'}
                size={bigger? 'premedium': 'mini'}
                onClick={() => onClick('circle', onCircleClick)}
            />
        </div>
    );
};