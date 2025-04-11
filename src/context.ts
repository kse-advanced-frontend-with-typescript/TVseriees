import React from 'react';
import { User, initUserAPI } from './modules/clients/user';
import {ConfigurationData, UserCollections} from './types';
import { initSeriesAPI } from './modules/clients/series';
import {initActorAPI} from './modules/clients/actor';

export type AppContext = {
    readonly user?: User;
    setUser: (user: User) => void;
    cleanUser: () => void;
    readonly configuration: ConfigurationData;
    userAPI: ReturnType<typeof initUserAPI>;
    seriesAPI: ReturnType<typeof initSeriesAPI>;
    actorAPI: ReturnType<typeof initActorAPI>;
    userCollections: UserCollections;

};

export const AppContext = React.createContext<AppContext>({
    setUser: (user: User) => {},
    cleanUser: () => {},
    configuration: {
        countries: new Map(),
        languages: new Map(),
        genres: new Map(),
        code_languages: new Map(),
    },
    userAPI: {} as ReturnType<typeof initUserAPI>,
    seriesAPI: {} as ReturnType<typeof initSeriesAPI>,
    actorAPI: {} as ReturnType<typeof initActorAPI>,
    userCollections:{
        favorites: new Map(),
        watched: new Map(),
        future: new Map(),
    },
});
