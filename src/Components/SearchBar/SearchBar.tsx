import React, {useState} from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {Icon} from '../Icon/Icon';

export const SearchBar: React.FC = ()=>{
    const [isExtended, extend] = useState(false);
    const toggle = ()=>{
        extend(!isExtended);
    };

    return <><div className={styles.searchBar}>
        <Icon topic='search' size='mini'/>
        <input type='text' placeholder='search here ...'/>
        <MiniButton topic='arrow' size='mini' onClick={toggle}/>
    </div>
        {isExtended }
    </>;
};