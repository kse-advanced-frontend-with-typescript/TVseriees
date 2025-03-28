import React, {FormEvent, useEffect, useRef, useState} from 'react';
import styles from './style.css';
import {AuthorizationButton} from '../AuthorizationButton/AuthorizationButton';

export const LogInForm: React.FC<{onSubmit: (email: string, password: string)=>void, passError?: string}> = ({onSubmit, passError}) => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [passwordError, setPasswordError] = useState(passError || '');

    useEffect(() => {
        if(passError) setPasswordError(passError);
    }, [passError]);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Signed in');
        if(email.current && password.current){
            onSubmit(email.current.value, password.current.value);
            console.log(email.current.value);
            console.log(password.current.value);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={submit}>
                {passwordError && (
                    <p className={styles.errorMessage}>
                        {passwordError}
                    </p>
                )}
                <input
                    ref={email}
                    type='email'
                    id='email'
                    placeholder='your email...'
                    required
                    aria-label='Email'
                />
                <input
                    ref={password}
                    type='password'
                    id='password'
                    placeholder='password...'
                    minLength={8}
                    required
                    aria-label='Password'
                />
                <AuthorizationButton
                    warning={false}
                    type='log-in'
                    form={true}
                />
            </form>
        </>
    );
};