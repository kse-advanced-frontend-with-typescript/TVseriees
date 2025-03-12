import React from 'react';
import styles from './style.css';


type TabsProps = {
    pages: number
}

type TabType = {
    type: 'active' | 'normal'
    onClick: ()=>void
}
export const Tabs: React.FC<TabsProps> = ({pages})=>{
    return <div className={styles.tabs}>


    </div>;
};