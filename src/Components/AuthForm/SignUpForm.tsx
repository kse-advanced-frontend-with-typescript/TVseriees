import React, { FormEvent, useState } from 'react';
import styles from './style.css';
import { AuthorizationButton } from '../AuthorizationButton/AuthorizationButton';
import { MiniButton } from '../MiniButton/MiniButton';

export const SignUpForm: React.FC = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
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

        console.log('Form submitted', formData);
        alert('Signed up');
    };

    return (
        <>
            {!show && (
                <form className={styles.form} onSubmit={submit}>
                    <MiniButton
                        topic='black-cross'
                        size='medium'
                        onClick={() => setShow(!show)}
                    />
                    <input
                        type='text'
                        id='name'
                        placeholder='your name...'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-label='Name'
                    />
                    <input
                        type='text'
                        id='surname'
                        placeholder='your surname...'
                        value={formData.surname}
                        onChange={handleChange}
                        required
                        aria-label='Surname'
                    />
                    <input
                        type='email'
                        id='email'
                        placeholder='your email...'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-label='Email'
                    />
                    <input
                        type='password'
                        id='password'
                        placeholder='password...'
                        value={formData.password}
                        minLength={8}
                        onChange={handleChange}
                        required
                        aria-label='Password'
                    />
                    <input
                        type='password'
                        id='confirmPassword'
                        placeholder='confirm password...'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength={8}
                        required
                        aria-label='Confirm Password'
                    />
                    {passwordError && (
                        <p className={styles.errorMessage}>
                            {passwordError}
                        </p>
                    )}
                    <AuthorizationButton
                        type='sign'
                        form={true}
                        onClick={()=>submit}
                    />
                </form>
            )}
        </>
    );
};