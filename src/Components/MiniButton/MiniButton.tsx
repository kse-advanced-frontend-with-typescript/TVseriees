import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';
import classNames from 'classnames';
type MiniButtonProps ={
    topic: 'search' | 'arrow' | 'cross' | 'black-cross' | 'star' | 'empty-star' | 'left-caret' | 'right-caret'
        | 'heart' | 'empty-heart' | 'empty-circle' | 'circle';
    size: 'mini' | 'medium' ;
    onClick: ()=>void;
    isDisabled?: boolean

}
export const MiniButton: React.FC<MiniButtonProps> = ({topic, size, onClick, isDisabled})=>{
    return <button className={classNames(styles.miniButton,
        {
            [styles.right]: topic=='right-caret'
        })} onClick={onClick} disabled={isDisabled}><Icon topic={topic} size={size}/></button>;
};