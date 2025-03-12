import React, { FormEvent, useState } from 'react';
import styles from './style.css';
import {AuthorizationButton} from "../AuthorizationButton/AuthorizationButton";
import {MiniButton} from "../MiniButton/MiniButton";

export const LogInForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    //const [passwordError, setPasswordError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));

    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Signed in');
        console.log(formData);
    };

    const [show, setShow] = useState(false);
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
                        <AuthorizationButton
                            type='log-in'
                            form={true}
                            onClick={()=>submit}
                        />
                    </form>
            )}
        </>
    );
};