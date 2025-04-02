import React, { FormEvent, useState } from 'react';
import styles from './style.css';
import { AuthorizationButton } from '../AuthorizationButton/AuthorizationButton';

type SignUpFormProps= {
    onSubmit: (username: string, email: string, password: string)=>void
}
export const SignUpForm: React.FC<SignUpFormProps> = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));

        if (id === 'password' || id === 'confirmPassword') {
            setPasswordError('');
        }
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
        }
        setPasswordError('');
        onSubmit(formData.username, formData.email, formData.password);
        console.log('Form submitted', formData);
        alert('Signed up');
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
                        type='text'
                        id='username'
                        placeholder='username...'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='email'
                        id='email'
                        placeholder='email...'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        id='password'
                        placeholder='password...'
                        value={formData.password}
                        minLength={8}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        id='confirmPassword'
                        placeholder='confirm password...'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength={8}
                        required
                    />

                    <AuthorizationButton
                        warning={false}
                        type='sign'
                        form={true}
                        onClick={()=>submit}
                    />
                </form>

        </>
    );
};