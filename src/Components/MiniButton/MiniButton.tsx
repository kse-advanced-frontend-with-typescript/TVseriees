import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';
type MiniButtonProps ={
    topic: 'search' | 'arrow';
    size: 'mini' | 'medium' ;

}
export const MiniButton: React.FC<MiniButtonProps> = ({topic, size})=>{
    return <button className={styles.miniButton}><Icon topic={topic} size={size}/></button>;
};