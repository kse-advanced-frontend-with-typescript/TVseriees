import {initSeriesAPI} from './clients/series';

type CardData = {
    id: number;
    name: string;
    poster_path: string | null;
    voteCount: number;
    averageVote: number;
}

export const getCardData = async (
    page: number,
    perPage: number,
    collection: number[],
    seriesAPI: ReturnType<typeof initSeriesAPI>,
): Promise<CardData[]> => {
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, collection.length);
    if (startIndex >= collection.length) return [];
    const fetchPromises = collection.slice(startIndex, endIndex).map(async (id) => {
            const res = await seriesAPI.getDetails(id);
            return {
                id: res.id,
                name: res.name,
                poster_path: res.poster_path,
                voteCount: res.vote_count,
                averageVote: res.vote_average
            };
    });
    return await Promise.all(fetchPromises);
};