import React, {FormEvent, useRef, useState} from 'react';
import styles from './style.css';
import { AuthorizationButton } from '../AuthorizationButton/AuthorizationButton';

type RegisterFormProps = {
    onSubmit: (username: string, email: string, password: string)=>void,
    processing: boolean,
    error: string
}
export const RegisterForm: React.FC<RegisterFormProps> = ({onSubmit, processing, error}) => {
    const form = useRef<HTMLFormElement>(null);
    const [passwordError, setPasswordError] = useState(error || '');

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!form.current)return;
        const formData: FormData = new FormData(form.current);
        const username = formData.get('username')!.toString();
        const email = formData.get('email')!.toString();
        const password = formData.get('password')!.toString();
        const confirmPassword = formData.get('confirmPassword')!.toString();

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
        }
        setPasswordError('');
        onSubmit(username, email, password);
        console.log('Form submitted', formData);
        alert('Signed up');
    };

    return (
            <form className={styles.form} onSubmit={submit}>
                {passwordError && (<p className={styles.errorMessage}>{passwordError}</p>)}
                <input
                    type='text'
                    id='username'
                    placeholder='username...'
                    required
                />
                <input
                    type='email'
                    id='email'
                    placeholder='email...'
                    required
                />
                <input
                    type='password'
                    id='password'
                    placeholder='password...'
                    minLength={8}
                    required
                />
                <input
                    type='password'
                    id='confirmPassword'
                    placeholder='confirm password...'
                    minLength={8}
                    required
                />
                <AuthorizationButton warning={false} type='sign' form={true} onClick={()=>submit} disabled={processing}/>
            </form>
    );
};