import React from 'react';
import styles from './style.css';
import classNames from 'classnames';
import searchIcon from '../../static/search.png';
export const SearchButton: React.FC = ()=>{
    return <button className={styles.search}><img src={searchIcon}/></button>;
}