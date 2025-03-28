import {Link, Route, Routes} from 'react-router';
import React from 'react';
import {Footer} from './Components/Footer/Footer';
import {Main} from './Pages/MainPage/Main';
import {Header, HeaderRight} from './Components/Header/Header';
import {MenuButton} from './Components/MenuButton/MenuButton';
import {links, myContacts} from './ExampleData';
import {AuthorizationButton} from './Components/AuthorizationButton/AuthorizationButton';
import {Icon} from './Components/Icon/Icon';
import {LoginPage} from './Pages/AuthPage/LoginPage';
import {SignPage} from './Pages/AuthPage/SignPage';
import {MiniButton} from "./Components/MiniButton/MiniButton";

export const App: React.FC = ()=>{
    return (
        <><Header>
            <MenuButton authorized={false} links={links}/>
            <h1>TVSerieees</h1>
            <HeaderRight>
                <Link to={'/'}><MiniButton topic='search' size='medium'/></Link>
                <Link to={'/login'}><AuthorizationButton type={'log-in'} /></Link>
            <Link to={'/sign'}><AuthorizationButton type={'sign'} /></Link>
            </HeaderRight>
        </Header>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='sign' element={<SignPage/>}/>
            </Routes>
            <Footer links={links} contacts={myContacts}/>

        </>

    );
};