import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

type AuthorizationButtonProps ={
    type: 'log-in' | 'sign' | 'log-out';
    form: boolean,
    onClick: ()=>void;
}

export const AuthorizationButton: React.FC<AuthorizationButtonProps> =({type, form, onClick})=>{
    return <button className={classNames(styles.button,{
        [styles.logIn]: type == 'log-in',
        [styles.signIn]: type == 'sign',
        [styles.logOut]: type == 'log-out',
    })}  type={form? 'submit': 'button'} onClick={onClick}> {type === 'sign' ? 'Sign up' : type === 'log-in'? 'Log in': 'Log out'}</button>;
};