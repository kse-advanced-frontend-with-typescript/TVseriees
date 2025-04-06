import {Static, Type} from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';
import { getImagePath } from '../../getImagePath';
import {PicturesProps} from '../../../types';

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

const ImagesSchema = Type.Object({
    id: Type.Number(),
    profiles:Type.Array( Type.Object({
        file_path: Type.Union([Type.String(), Type.Null()])
    }))
});

export type ActorResponse = {
    name: string;
    image: string;
    series: Array<{ id: number; name: string }>;
    images: string[]
};
export type ActorImages = Static<typeof ImagesSchema>;
export type ActorTV = Static<typeof ActorTvSchema>;
export type Actor = Static<typeof ActorSchema>;

export const actorAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const get = async (id: string): Promise<ActorResponse> => {
        const actorData = await getActor(id);
        const tvData = await getActorTVs(id);
        const imagesData = await  getActorImages(id);
        return {
            name: actorData.name,
            image: actorData.profile_path? getImagePath(actorData.profile_path): '',
            series: tvData.cast,
            images: imagesData.profiles
                .filter(profile => profile.file_path)
                .map(profile => getImagePath(profile.file_path!))
        };
    };
    const getActor = async (id: string): Promise<Actor> => {
        const fetchedActorData = await getData(api_key, fetchAPI, getUrl(id));
        return  convertToType(fetchedActorData, ActorSchema);
    };

    const getActorTVs = async (id: string): Promise<ActorTV> => {
        const fetchedTVData = await getData(api_key, fetchAPI, getUrl(`${id}/tv_credits`));
       return  convertToType(fetchedTVData, ActorTvSchema);
    };

    const getActorImages = async (id: string): Promise<ActorImages> => {
        const fetchedImages = await getData(api_key, fetchAPI, getUrl(`${id}/images`));
        return  convertToType(fetchedImages, ImagesSchema);
    };
    return {
        get,
        getActor,
        getActorTVs,
        getActorImages
    };
};