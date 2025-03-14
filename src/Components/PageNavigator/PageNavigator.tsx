import React, {useState} from 'react';
import styles from './style.css';
import classNames from 'classnames';

type PageNavigatorProps = {
    pages: number,
    onPageChange?: (page: number) => void
}

type SubNavType = {
    type: 'active' | 'normal',
    index: number,
    onClick: ()=>void
}
export const PageNavigator: React.FC<PageNavigatorProps> = ({pages, onPageChange})=>{
    const [active, setActive] = useState(1);

    const changePage = (page: number)=>{
        if(page >=1 && page <=pages){
            setActive(page);
            onPageChange?.(page);
        }
    };
    return <div className={styles.tabs}>

    </div>;
};

const SubNav: React.FC<SubNavType> = ({type, index, onClick})=>{
    return <a className={classNames(styles.subnav,{
            [styles.active]: type === 'active'
        }
        )} href='#'>{index}</a>;
};