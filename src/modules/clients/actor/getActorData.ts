import {ActorData, ActorTV} from './index';
import {getImagePath} from '../../getImagePath';
import {ActorResponse} from '../../../types';

export const getActorData = async (actorData: Promise<ActorData>, tvData: Promise<ActorTV>): Promise<ActorResponse> => {
    const [actor, tv] = await Promise.all([actorData, tvData]);
    return {
        name: actor.name,
        image: actor.profile_path ? getImagePath(actor.profile_path) : '',
        series: tv.cast
    };
};