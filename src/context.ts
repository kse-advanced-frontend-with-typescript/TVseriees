import React from 'react';
import { User, initUserAPI } from './modules/clients/user';
import { ConfigurationData } from './types';
import { initSeriesAPI } from './modules/clients/series';
import {initActorAPI} from './modules/clients/actor';

type AppContext = {
    readonly user?: User;
    setUser: (user: User) => void;
    cleanUser: () => void;
    readonly configuration: ConfigurationData;
    userAPI: ReturnType<typeof initUserAPI>;
    seriesAPI: ReturnType<typeof initSeriesAPI>;
    actorAPI: ReturnType<typeof initActorAPI>;
};

export const AppContext = React.createContext<AppContext>({
    setUser: () => {},
    cleanUser: () => {},
    configuration: {
        countries: new Map(),
        languages: new Map(),
        genres: new Map(),
        code_languages: new Map(),
    },
    userAPI: {} as ReturnType<typeof initUserAPI>,
    seriesAPI: {} as ReturnType<typeof initSeriesAPI>,
    actorAPI: {} as ReturnType<typeof initActorAPI>

});
