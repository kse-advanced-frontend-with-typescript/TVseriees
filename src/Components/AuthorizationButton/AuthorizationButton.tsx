import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

type AuthorizationButtonProps ={
    type: 'log' | 'sign';
}

export const AuthorizationButton: React.FC<AuthorizationButtonProps> =({type})=>{
    return <button className={classNames(styles.button,{
        [styles.logIn]: type == 'log',
        [styles.signIn]: type == 'sign'

    })}> {type === 'log' ? 'Log in' : 'Sign up'}</button>;
};