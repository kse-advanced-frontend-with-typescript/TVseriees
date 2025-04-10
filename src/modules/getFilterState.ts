import {FilterState} from "../types";

export const getFilterState = (searchParams: URLSearchParams): FilterState =>({
    genre: searchParams.get('genre') ?? '',
    language: searchParams.get('language') ?? '',
    country: searchParams.get('country') ?? '',
    sortOption: searchParams.get('sortOption') ?? '',
    year: searchParams.get('year') ?? '',
    name: searchParams.get('name') ?? ''
});