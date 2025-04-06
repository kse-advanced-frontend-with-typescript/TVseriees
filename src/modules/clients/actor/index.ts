import {Static, Type} from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';

export const getUrl = (urlPart: string) => `https://api.themoviedb.org/3/person/${urlPart}`;

const ActorSchema = Type.Object({
    name: Type.String(),
    profile_path: Type.Union([Type.String(), Type.Null()])
});

const ActorTvSchema = Type.Object({
    cast: Type.Array(Type.Object({
        id: Type.Number(),
        name: Type.String()
    }))
});


export type ActorTV = Static<typeof ActorTvSchema>;
export type ActorData = Static<typeof ActorSchema>;

export const actorAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const getActor = async (id: string): Promise<ActorData> => {
        const fetchedActorData = await getData(api_key, fetchAPI, getUrl(id));
        return  convertToType(fetchedActorData, ActorSchema);
    };

    const getActorTVs = async (id: string): Promise<ActorTV> => {
        const fetchedTVData = await getData(api_key, fetchAPI, getUrl(`${id}/tv_credits`));
       return  convertToType(fetchedTVData, ActorTvSchema);
    };

    return {
        getActor,
        getActorTVs
    };
};