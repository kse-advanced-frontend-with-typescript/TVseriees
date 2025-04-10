import {Collection} from '../types';
import {initSeriesAPI} from './clients/series';
import {initUserAPI} from './clients/user';

type CardData = {
    id: number;
    name: string;
    poster_path: string | null;
    voteCount: number;
    averageVote: number;
}

type CardDataResult = {
    series: CardData[];
    total: number;
}

export const getCardData = async (
    startWith: number,
    perPage: number,
    userId: string,
    collectionType: Collection,
    seriesAPI: ReturnType<typeof initSeriesAPI>,
    userAPI: ReturnType<typeof initUserAPI>
): Promise<CardDataResult> => {
    const seriesResponse = await userAPI.getSeries(userId, collectionType, startWith, perPage);
    const fetchPromises = seriesResponse.data.map(async (item) => {
        const res = await seriesAPI.getDetails(item.serie_id);
        return {
            id: res.id,
            name: res.name,
            poster_path: res.poster_path,
            voteCount: res.vote_count,
            averageVote: res.vote_average
        };
    });
    const series = await Promise.all(fetchPromises);
    return {
        series,
        total: seriesResponse.totals.total
    };
};