import {Link, Route, Routes} from 'react-router';
import React, {useEffect, useState} from 'react';
import {Footer} from './Components/Footer/Footer';
import {Main} from './Pages/MainPage/Main';
import {Header} from './Components/Header/Header';
import {MenuButton} from './Components/MenuButton/MenuButton';
import {links, myContacts} from './ExampleData';
import {AuthorizationButton} from './Components/AuthorizationButton/AuthorizationButton';
import {LoginPage} from './Pages/AuthPage/LoginPage';
import {RegistrationPage} from './Pages/AuthPage/RegistrationPage';
import {MiniButton} from './Components/MiniButton/MiniButton';
import styles from './main.css';
import {SeriePage} from './Pages/SeriePage/SeriePage';
import {ActorPage} from './Pages/ActorPage/ActorPage';
import {User, initUserAPI} from './modules/clients/user';
import {AppContext} from './context';
import {initSearchAPI} from './modules/clients/searchData';
import {ConfigurationData, UserCollections} from './types';
import {Warning} from './Components/Warning/Warning';
import {initSeriesAPI} from './modules/clients/series';
import {createReverseMap} from './modules/createReverseMap';
import {initActorAPI} from './modules/clients/actor';
import {UserSpecificPage} from './Pages/UserSpecificPage/UserSpecificPage';

export const App: React.FC = ()=>{
    const [state, setState] = useState<{user?: User, loading: boolean, error: boolean}>({
            user: undefined,
            loading: true,
            error: false
    });
    const [warning, setWarning] = useState<boolean>(false);

    const userAPI = initUserAPI(process.env.REST_API_KEY!, fetch);
    const seriesAPI = initSeriesAPI(process.env.API_KEY!, fetch);
    const actorAPI = initActorAPI(process.env.API_KEY!, fetch);

    const [configuration, setConfiguration] = useState<ConfigurationData>({
        countries: new Map(),
        languages: new Map(),
        genres: new Map(),
        code_languages: new Map()
    });

    const [userCollections, setUserCollections] = useState<UserCollections>({
        favorites:  new Map(),
        towatch: new Map(),
        watched:  new Map(),
    });
    const setUser = (user: User) =>{
        const token = user.token;
        console.log('Token in set user', token);
        console.log('User in set user', user);
        userAPI.saveToken(token);
        setState({
            ...state,
            user
        });
    };


    useEffect(() => {
        if(!state.user?._id)return;
        setState(prev => ({...prev, loading: true}));
        Promise.all([
            userAPI.getSeries(state.user._id, 'favorites'),
            userAPI.getSeries(state.user._id, 'towatch'),
            userAPI.getSeries(state.user._id, 'watched'),
        ]).then(([favorites, toWatch, watched]) => {
            setUserCollections({favorites: favorites, towatch: toWatch, watched: watched});
            setState(prev => ({...prev, error: false, loading: false }));
        })
        .catch(err => {
            console.error('Error loading user collection:', err);
            setState(prev => ({...prev, error: true, loading: false}));
        });
    }, [state.user]);

    const cleanUser = () => {
        setState({
            ...state,
            user: undefined
        });
        userAPI.cleanToken();
    };

    useEffect(() => {
        const token = userAPI.restoreToken();
        if (!token) return;
        userAPI.getUserByToken(token).then(user => {
            setUser(user);
        }).catch(console.error);
    }, []);


    useEffect(() => {
        const api = initSearchAPI(process.env.API_KEY ?? '', fetch);
        Promise.all([
            api.getCountries(),
            api.getLanguages(),
            api.getGenres()
        ]).then(([countries, languages, genres]) => {
            setConfiguration({genres: genres, countries: countries, languages: languages, code_languages: createReverseMap(languages)});
            setState(prev => ({...prev, error: false, loading: false}));
        })
        .catch(err => {
            console.error('Error loading configuration:', err);
            setState(prev => ({...prev, error: true, loading: false}));
        });
    }, []);

    return (
        <AppContext.Provider value={{
            user: state.user,
            setUser,
            cleanUser,
            userAPI,
            configuration,
            seriesAPI,
            actorAPI,
            userCollections
        }}>
            {warning && <Warning
                onClick={()=>{
                        setWarning(false);
                        cleanUser();
                }}
                onCancel={()=>setWarning(false)}
                purpose='log-out'
                message={'Are you sure about logging out?'}
            />}
            <div className={styles.wrapper}><Header part='main'>
            <Header part='left'> <MenuButton authorized={!!state.user} links={links}/></Header>
            <h1>TVSerieees</h1>
            <Header part='right'>
                <Link to={'/'}><MiniButton topic='search' size='premedium'/></Link>
                {state.user?._id ? (
                    <>
                        <h2>{state.user.username}</h2>
                        <AuthorizationButton type={'log-out'} onClick={()=> setWarning(true)}/>
                    </>
                ) : (
                    <>
                        <Link to={'/login'}><AuthorizationButton type={'log-in'} /></Link>
                        <Link to={'/sign'}><AuthorizationButton type={'sign'} /></Link>
                    </>
                )}

            </Header>
        </Header>
            <div className={styles.contentArea}>
                <Routes>
                    <Route path='/' element={<Main />}/>
                    <Route path='/:request_type' element={<Main />}/>
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='sign' element={<RegistrationPage/>}/>
                    <Route path='serie/:id' element={<SeriePage/>}/>
                    <Route path='actor/:id' element={<ActorPage/>}/>
                    <Route path='user/:request_type' element={<UserSpecificPage/>}/>
                </Routes>
            </div>
            <Footer links={links} authorized={!!state.user} contacts={myContacts}/>
        </div>
        </AppContext.Provider>
    );
};