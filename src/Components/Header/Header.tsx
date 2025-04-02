import React, {ReactNode} from 'react';
import styles from './style.css';
type TitleProps ={
    children: ReactNode
}

export const Header: React.FC<TitleProps> = ({children})=>{
    return <header className={styles.header}>{children}</header>;
};

export const HeaderRight: React.FC<TitleProps> = ({children})=>{
    return <header className={styles.headerRightPart}>{children}</header>;
};