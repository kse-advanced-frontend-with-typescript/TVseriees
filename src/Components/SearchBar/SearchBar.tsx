import React from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {Icon} from '../Icon/Icon';

export const SearchBar: React.FC = ()=>{
    return <div className={styles.searchBar}>
        <Icon topic='search' size='mini'/>
        <input type='text' placeholder='search here ...'/>
        <MiniButton topic='arrow' size='mini'/>

    </div>;
};