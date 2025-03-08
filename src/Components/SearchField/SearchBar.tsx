import React, {useState} from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';

export const SearchBar: React.FC = ()=>{

    return <div className={styles.searchBar}>
        <Icon topic='search' size='mini'/>
        <input type='text' placeholder='type name ...'/>
    </div>;

};