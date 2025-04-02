import React from 'react';
import styles from './style.css';
import {Icon} from '../Icon/Icon';

export const SearchBar: React.FC<{onNameChange: (name: string) => void}> = ({onNameChange}) => {
    return <div className={styles.searchBar}>
        <Icon topic='search' size='mini'/>
        <input
            type='text'
            placeholder='type name ...'
            onChange={(e) => onNameChange(e.target.value)}
        />
    </div>;
};