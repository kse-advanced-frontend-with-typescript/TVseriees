import React from 'react';
import {User, initUserAPI} from './modules/clients/user';
import {ConfigurationData} from './types';

type AppContext = {
    readonly user?: User
    setUser: (user: User) => void
    cleanUser: () => void
    readonly configuration: ConfigurationData
    userAPI: ReturnType<typeof initUserAPI>
}

export const AppContext = React.createContext<AppContext>({
    setUser: (user: User) => {},
    cleanUser: () => {},
    configuration: {
        countries: new Map(),
        languages: new Map(),
        genres: new Map(),
        code_languages: new Map()
    },
    userAPI: {} as ReturnType<typeof initUserAPI>
});