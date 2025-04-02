import React, {useState} from 'react';
import styles from './style.css';
import {MenuExtended} from '../MenuExtended/MenuExtended';
import {Links} from '../Footer/Footer';


export const MenuButton: React.FC<{authorized: boolean, links: Links}> = ({authorized, links})=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return <><button className={styles.menuComponent} onClick={()=>setIsMenuOpen(true)}>
        <div className={styles.menu}>
            <Line/>
            <Line/>
            <Line/>
        </div>
    <p className={styles.menuText}>Menu</p>
    </button>
    {isMenuOpen && <MenuExtended authorized={authorized} links={links} onClose={()=>setIsMenuOpen(false)}/>}
    </>;
};

const Line: React.FC = ()=>{
    return <div className={styles.line}></div>;
};