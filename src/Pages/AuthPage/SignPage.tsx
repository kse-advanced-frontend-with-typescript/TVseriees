import React, {useState} from 'react';
import {SignUpForm} from '../../Components/AuthForm/SignUpForm';


export const SignPage: React.FC = ()=>{
    const [loginError, setLoginError] = useState<string>('');
    const signin = (email: string, password:string)=>{

    };
    return <>
        <SignUpForm onSubmit={signin}/>
    </>;
};