import React, {useState} from 'react';
import styles from './style.css';
import {MenuExtended} from '../MenuExtended/MenuExtended';
export const links: string[] = [ 'top-rated',
    'on the air in the next 7 days',
    'popular',
    'to-watch',
    'watched',
    'favorite'];

export const MenuButton: React.FC<{links: string[]}> = ({links})=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return <><button className={styles.menuComponent} onClick={()=>setIsMenuOpen(true)}>
        <div className={styles.menu}>
            <Line/>
            <Line/>
            <Line/>
        </div>
    <p className={styles.menuText}>Menu</p>
    </button>
    {isMenuOpen && <MenuExtended links={links} onClose={()=>setIsMenuOpen(false)}/>}
    </>;
};

const Line: React.FC = ()=>{
    return <div className={styles.line}></div>;
};