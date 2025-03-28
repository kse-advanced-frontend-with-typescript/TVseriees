import React, {useEffect, useState} from 'react';
import styles from './style.css';
import classNames from 'classnames';
import {MiniButton} from '../MiniButton/MiniButton';

type PageNavigatorProps = {
    activePage: number,
    pages: number[]
    onPageChange: (page: number)=>void
    onLeftArrowClick: () => void,
    onRightArrowClick: () => void,
    buttonStates: {
        leftArrow: boolean,
        rightArrow: boolean
    }

}

type PageItemProps = {
    type: 'active' | 'normal',
    index: number,
    onClick: ()=>void,
}

const determinePageToShow = (activePage: number, pageCount: number): number[] =>{
    if(pageCount <= 5 || activePage <= 3) return Array.from({length: Math.min(5, pageCount)}, (_, i)=>i+1);
    if(activePage > pageCount - 3) return Array.from({length: 5}, (_, i)=> pageCount - 4 + i);
    return [activePage-2, activePage-1, activePage, activePage+1, activePage+2];
};

export const PageParentComponent: React.FC<{page: number, pageCount: number, onPageSelect: (page: number)=>void}> = ({page, pageCount, onPageSelect}) => {
    const [currentPage, setCurrentPage] = useState(page);
    const [visiblePages, setVisiblePages] = useState(determinePageToShow(page, pageCount));
    const [buttonStates, setButtonStates] = useState({
        leftArrow: visiblePages[0] > 1,
        rightArrow: visiblePages[visiblePages.length - 1] < pageCount
    });
    const handlePageChange = (newPage: number) => {
        onPageSelect(newPage);
        setCurrentPage(newPage);
        setVisiblePages(determinePageToShow(newPage, pageCount));
    };

    const handleLeftArrowClick = () => {
        if (visiblePages[0] <= 1) return;
        setVisiblePages(visiblePages.map(p => p - 1));
    };

    const handleRightArrowClick = () => {
        if (visiblePages[visiblePages.length - 1] >= pageCount) return;
        setVisiblePages(visiblePages.map(p => p + 1));
    };

    useEffect(() => {
        setButtonStates({
            leftArrow: visiblePages[0] === 1,
            rightArrow: visiblePages[visiblePages.length - 1] === pageCount
        });
    }, [visiblePages, pageCount]);
    return <PageNavigator
                pages={visiblePages}
                activePage={currentPage}
                onPageChange={handlePageChange}
                onLeftArrowClick={handleLeftArrowClick}
                onRightArrowClick={handleRightArrowClick}
                buttonStates={buttonStates}
            />;
};

const PageNavigator: React.FC<PageNavigatorProps> = ({activePage, onPageChange, pages, onLeftArrowClick, onRightArrowClick, buttonStates}) => {
    return <div className={styles.pages}>
        <MiniButton topic='left-caret' isDisabled={buttonStates.leftArrow} size='medium' onClick={onLeftArrowClick}/>
        {pages.map(page => (
            <PageItem
                key={page}
                onClick={() => onPageChange(page)}
                type={page === activePage ? 'active' : 'normal'}
                index={page}
            />
        ))}
        <MiniButton topic='right-caret' isDisabled={buttonStates.rightArrow} size='medium' onClick={onRightArrowClick}/>
    </div>;
};

const PageItem: React.FC<PageItemProps> = ({type, index, onClick})=>{
    return <a className={classNames(styles.page,{
            [styles.active]: type === 'active'
        }
    )} href='#' onClick={e=>{
        e.preventDefault();
        onClick();
    }}>{index}</a>;
};