import React from 'react';
import styles from './style.css';

type ImageProp ={
    imagePath: string;
}
export const MiniButton: React.FC<ImageProp> = ({imagePath})=>{
    return <button className={styles.miniButton}><img src={imagePath}/></button>;
};