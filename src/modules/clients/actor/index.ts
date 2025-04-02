import { Type } from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';
import { getImagePath } from '../../getImagePath';

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

export type ActorResponse = {
    name: string;
    image: string;
    series: Array<{ id: number; name: string }>;
};

export const actorAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const get = async (id: string): Promise<ActorResponse> => {
        const fetchedActorData = await getData(api_key, fetchAPI, getUrl(`${id}?language=en-US`));
        const actorData = convertToType(fetchedActorData, ActorSchema);
        const fetchedTVData = await getData(api_key, fetchAPI, getUrl(`${id}/tv_credits?language=en-US`));
        const tvData = convertToType(fetchedTVData, ActorTvSchema);
        return {
            name: actorData.name,
            image: getImagePath(actorData.profile_path || ''),
            series: tvData.cast
        };
    };

    return {
        get
    };
};