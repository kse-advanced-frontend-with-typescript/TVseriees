import React, {useContext, useEffect, useRef, useState} from 'react';
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
    onDelete: (serie_id: number, collection: Collection) => void;
    onAdd: (serie_id: number, collection: Collection) => void;
    bigger?: boolean
}

export const UserButtons: React.FC<UserButtonsProps> = ({onDelete, onAdd, bigger, id}) => {
    const context = useContext(AppContext);

    const [buttonStates, setButtonStates] = useState<ButtonStates>({
        star: context.userCollections.towatch.has(id),
        heart: context.userCollections.favorites.has(id),
        circle: context.userCollections.watched.has(id),
    });
    console.log(`Buttons for serie with id ${id}:  ${buttonStates.circle} ${buttonStates.heart} ${buttonStates.star}`);

    useEffect(() => {
        setButtonStates({
            star: context.userCollections.towatch.has(id),
            heart: context.userCollections.favorites.has(id),
            circle: context.userCollections.watched.has(id),
        }) ;
        console.log('User collections: ', context.userCollections);
    }, [context.userCollections]);

    const onClick = (type: keyof ButtonStates) => {
        const currentState = buttonStates[type];
        if(currentState) onDelete(id, userMap.get(String(type)) as Collection);
        else onAdd(id, userMap.get(String(type)) as Collection);

        setButtonStates({...buttonStates, [type]: !currentState}) ;
    };

    return (
        <div className={styles.buttons}>
            <MiniButton
                topic={buttonStates.star ? 'star' : 'empty-star'}
                size={bigger ? 'premedium' : 'mini'}
                onClick={() => onClick('star')}
            />
            <MiniButton
                topic={buttonStates.heart ? 'heart' : 'empty-heart'}
                size={bigger ? 'premedium' : 'mini'}
                onClick={() => onClick('heart')}
            />
            <MiniButton
                topic={buttonStates.circle ? 'circle' : 'empty-circle'}
                size={bigger ? 'premedium' : 'mini'}
                onClick={() => onClick('circle')}
            />
        </div>
    );
};
