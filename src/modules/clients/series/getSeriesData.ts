import {ConfigurationData, FilterState, SerieGetRequestType} from '../../../types';
import {initSeriesAPI} from './index';
import {sortOptions} from '../../../BusinessData';

export const getSeriesData = async (
    pageToFetch: number,
    filters: FilterState,
    currentRequestType: SerieGetRequestType,
    seriesAPI: ReturnType<typeof initSeriesAPI>,
    configuration: ConfigurationData
) => {
    if (filters.name) return await seriesAPI.getByName(pageToFetch, filters.name, filters.year);
    else if (filters.year || filters.country || filters.language || filters.genre || filters.sortOption) {
        const dataToPass: FilterState = {
            language: configuration.languages.get(filters.language) ?? '',
            country: configuration.countries.get(filters.country) ?? '',
            genre: configuration.genres.get(filters.genre) ?? '',
            year: filters.year,
            name: filters.name,
            sortOption: sortOptions.get(filters.sortOption) ?? ''
        };
        return await seriesAPI.getDynamic(pageToFetch, dataToPass);
    } else return await seriesAPI.get(pageToFetch, currentRequestType);
};
