import React, {useEffect, useState} from 'react';
import styles from './style.css';
import {PageParentComponent} from '../PageNavigator/PageNavigator';
import {Button} from '../Button/Button';


type PaginationProps = {
    pageCount: number,
    onPageSelect: (page: number)=>void,
    onClick: ()=>void,
    page: number
}
export const Pagination: React.FC<PaginationProps> = ({pageCount, onPageSelect, onClick, page})=>{
    return <div className={styles.pagination}>
        <PageParentComponent page={page} pageCount={pageCount} onPageSelect={onPageSelect}/>
        <Button purpose='Show more' onClick={onClick}/>
    </div>;
};