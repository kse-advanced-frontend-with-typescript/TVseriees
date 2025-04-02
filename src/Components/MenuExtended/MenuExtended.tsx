import React from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {AuthorizationButton} from '../AuthorizationButton/AuthorizationButton';
import {Link} from 'react-router';
import {Links} from '../Footer/Footer';
import {LinksSection} from '../LinkSection/LinkSection';



type MenuExtendedProps ={
    links: Links,
    onClose: ()=>void,
    authorized: boolean
}


export const MenuExtended: React.FC<MenuExtendedProps>=({links,  onClose, authorized})=>{
    return <div className={styles.menu}>
        <div className={styles.menuTop}>
            <h3>Menu</h3>
            <MiniButton topic='cross' size='medium' onClick={onClose}/>
        </div>

        <LinksSection links={links} style={'menu'}/>
        <div className={styles.auth}>
            {authorized && <AuthorizationButton type={'log-out'} onClick={()=>alert('clicked')}/>}
            {!authorized && <div className={styles.auth}>
                <Link to={'sign'}><AuthorizationButton type={'sign'}/></Link>
                <Link to={'login'}><AuthorizationButton type={'log-in'}/></Link>
            </div>
            }
        </div>

    </div>;
};

