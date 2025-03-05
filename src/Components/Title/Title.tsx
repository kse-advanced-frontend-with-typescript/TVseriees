import React, {ReactNode} from 'react';
import styles from './style.css';
type TitleProps ={
    children: ReactNode
}

export const Title: React.FC<TitleProps> = ({children})=>{
    return <header className={styles.header}>{children}</header>;
};