import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';
type MiniButtonProps ={
    topic: 'search' | 'arrow' | 'cross';
    size: 'mini' | 'medium' ;
    onClick: ()=>void;

}
export const MiniButton: React.FC<MiniButtonProps> = ({topic, size, onClick})=>{
    return <button className={styles.miniButton} onClick={onClick}><Icon topic={topic} size={size}/></button>;
};