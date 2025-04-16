import {FilterState} from '../types';

export const setNewPageInQueryParams = (page: number, searchParams: URLSearchParams) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    return newParams;
};

export const setNewQueryParams = (key: keyof FilterState, value: string, searchParams: URLSearchParams) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    return newParams;
};