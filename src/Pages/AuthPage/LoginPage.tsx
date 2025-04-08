import React, {useContext, useState} from 'react';
import {LogInForm} from '../../Components/AuthForm/LogInForm';
import {AppContext} from '../../context';
import {useNavigate} from 'react-router';


export const LoginPage: React.FC = ()=>{
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const [loginError, setLoginError] = useState<string>('');
    const [processing, setProcessing] = useState<boolean>(false);
    const login = async (email: string, password:string)=>{
        setLoginError('');
        setProcessing(true);
        try{
            const user = await context.userAPI.loginUser(email, password);
            context.setUser(user);
            navigate('/');
        }catch(e){
            console.log(e);
            setLoginError(String(e));
        }finally {
            setProcessing(false);
        }
    };
    return <>
       <LogInForm onSubmit={login} passError={loginError} processing={processing}/>
    </>;
};