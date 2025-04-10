import React, {useContext} from 'react';
import styles from '../UserButtons/style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {Collection, userMap} from '../../types';
import {AppContext} from '../../context';

type ButtonStates = {
    star: boolean;
    heart: boolean;
    circle: boolean;
};
type UserButtonsProps ={
    id: number,
    onIconClick: (serie_id: number, collection: Collection, add: boolean) => void;
    bigger?: boolean
}

export const UserButtons: React.FC<UserButtonsProps> = ({onIconClick, bigger, id}) => {
   const context = useContext(AppContext);
    const [topic, setTopic] = React.useState<ButtonStates>({
        star: context.userCollections.towatch.includes(id),
        heart: context.userCollections.favorites.includes(id),
        circle: context.userCollections.watched.includes(id),
    });
    const onClick = (type: keyof ButtonStates) => {
        setTopic(previousState => ({
            ...previousState,
            [type]: !previousState[type]
        }));
        onIconClick(id, userMap.get(String(type)) as Collection, topic[type]);
    };
    return (
        <div className={styles.buttons}>
            <MiniButton
                topic={topic.star ? 'star' : 'empty-star'}
                size={bigger? 'premedium': 'mini'}
                onClick={() => onClick('star')}
            />
            <MiniButton
                topic={topic.heart ? 'heart' : 'empty-heart'}
                size={bigger? 'premedium': 'mini'}
                onClick={() => onClick('heart')}
            />
            <MiniButton
                topic={topic.circle ? 'circle' : 'empty-circle'}
                size={bigger? 'premedium': 'mini'}
                onClick={() => onClick('circle')}
            />
        </div>
    );
};