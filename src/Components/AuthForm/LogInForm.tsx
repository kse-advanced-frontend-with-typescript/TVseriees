import React, {FormEvent, useRef} from 'react';
import styles from './style.css';
import {AuthorizationButton} from '../AuthorizationButton/AuthorizationButton';

export const LogInForm: React.FC<{
    onSubmit: (email: string, password: string) => void,
    passError: boolean,
    processing: boolean
}> = ({onSubmit, passError, processing}) => {
    const formRef = useRef<HTMLFormElement>(null);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!formRef.current) return;
        const formData: FormData = new FormData(formRef.current);
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';
        onSubmit(email, password);
    };

    return (
        <form className={styles.form} onSubmit={submit} ref={formRef}>
            {passError && (<p className={styles.errorMessage}>Login or password is incorrect!</p>)}
            <input
                name='email'
                type='email'
                id='email'
                placeholder='your email...'
                required
                aria-label='Email'
            />
            <input
                name='password'
                type='password'
                id='password'
                placeholder='password...'
                minLength={5}
                required
                aria-label='Password'
            />
            <AuthorizationButton
                warning={false}
                type='log-in'
                form={true}
                disabled={processing}
            />
        </form>
    );
};