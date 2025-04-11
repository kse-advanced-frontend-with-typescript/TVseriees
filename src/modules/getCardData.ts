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
    // Calculate start and end indices for the current page
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, collection.length);

    // Make sure we're not trying to access beyond the array bounds
    if (startIndex >= collection.length) {
        return [];
    }

    console.log(`Fetching page ${page} - Items ${startIndex} to ${endIndex - 1} of ${collection.length}`);

    // Fetch the series data for the current page
    const fetchPromises = collection.slice(startIndex, endIndex).map(async (id) => {
        try {
            const res = await seriesAPI.getDetails(id);
            return {
                id: res.id,
                name: res.name,
                poster_path: res.poster_path,
                voteCount: res.vote_count,
                averageVote: res.vote_average
            };
        } catch (error) {
            console.error(`Error fetching details for series ${id}:`, error);
            // Return a placeholder for failed requests
            return {
                id,
                name: 'Failed to load',
                poster_path: null,
                voteCount: 0,
                averageVote: 0
            };
        }
    });

    return await Promise.all(fetchPromises);
};