import { Type } from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';
import { getImagePath } from '../../getImagePath';
import {PicturesProps} from "../../../types";

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

export const actorAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const get = async (id: string): Promise<ActorResponse> => {
        const fetchedActorData = await getData(api_key, fetchAPI, getUrl(id));
        const actorData = convertToType(fetchedActorData, ActorSchema);
        const fetchedTVData = await getData(api_key, fetchAPI, getUrl(`${id}/tv_credits`));
        const tvData = convertToType(fetchedTVData, ActorTvSchema);
        const fetchedImages = await getData(api_key, fetchAPI, getUrl(`${id}/images`));
        const imagesData = convertToType(fetchedImages, ImagesSchema);
        return {
            name: actorData.name,
            image: actorData.profile_path? getImagePath(actorData.profile_path): '',
            series: tvData.cast,
            images: imagesData.profiles
                .filter(profile => profile.file_path)
                .map(profile => getImagePath(profile.file_path!))
        };
    };


    return {
        get
    };
};