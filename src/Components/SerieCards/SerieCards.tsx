import React, {ReactNode} from 'react';
import styles from './style.css';

export const SerieCards: React.FC<{children: ReactNode}> = ({children})=>{
    return <div className={styles.seriesContainer}>{children}</div>;
};

