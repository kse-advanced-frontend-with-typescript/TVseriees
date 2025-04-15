import React, {FormEvent, useEffect, useRef, useState} from 'react';
import styles from './style.css';
import { AuthorizationButton } from '../AuthorizationButton/AuthorizationButton';

type RegisterFormProps = {
    onSubmit: (username: string, email: string, password: string)=>void,
    processing: boolean,
    error: string
}
export const RegisterForm: React.FC<RegisterFormProps> = ({onSubmit, processing, error}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [passwordError, setPasswordError] = useState(error || '');

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!formRef.current) return;

        const formData: FormData = new FormData(formRef.current);
        const username = formData!.get('username')!.toString();
        const email = formData.get('email')!.toString();
        const password = formData.get('password')!.toString();
        const confirmPassword = formData.get('confirmPassword')!.toString();

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
        }
        setPasswordError('');
        onSubmit(username, email, password);
    };
    useEffect(() => {
        if (error) {
            setPasswordError(error);
        }
    }, [error]);

    return (
        <form className={styles.form} onSubmit={submit} ref={formRef}>
            {passwordError && (<p className={styles.errorMessage}>{passwordError}</p>)}
            <input
                type='text'
                id='username'
                name='username'
                placeholder='username...'
                required
            />
            <input
                type='email'
                id='email'
                name='email'
                placeholder='email...'
                required
            />
            <input
                type='password'
                id='password'
                name='password'
                placeholder='password...'
                minLength={5}
                required
            />
            <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='confirm password...'
                minLength={5}
                required
            />
            <AuthorizationButton
                warning={false}
                type='sign'
                form={true}
                disabled={processing}
            />
        </form>
    );
};