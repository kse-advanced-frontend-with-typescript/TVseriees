import React, {useState} from 'react';
import {LogInForm} from '../../Components/AuthForm/LogInForm';


export const LoginPage: React.FC = ()=>{
    const [loginError, setLoginError] = useState<string>('');
    const login = (email: string, password:string)=>{

    };
    return <>
       <LogInForm onSubmit={login} passError={loginError}/>
    </>;
};