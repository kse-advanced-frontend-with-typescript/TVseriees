import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

type SLprops ={
    type: 'log' | 'sign';
}

export const SLButton: React.FC<SLprops> =({type})=>{
    return <button className={classNames(styles.button,{
        [styles.logIn]: type == 'log',
        [styles.signIn]: type == 'sign'

    })}> {type === 'log' ? 'Log in' : 'Sign up'}</button>;
};