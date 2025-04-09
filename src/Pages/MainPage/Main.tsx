import React, {useContext, useEffect, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {SortOptions} from '../../ExampleData';
import {Pagination} from '../../Components/Pagination/Pagination';
import styles from './style.css';
import {SerieGetRequestType} from '../../modules/clients/series';
import {useLocation, useParams, useSearchParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';
import {Collection, FilterState, Serie} from '../../types';
import {AppContext} from '../../context';
import {SerieCards} from '../../Components/SerieCards/SerieCards';

type PageState = {
    loading: boolean,
    error: boolean,
    totalPages: number,
    totalResults: number,
    pageToFetch: number,
    series: Serie[],
    currentPage: number
}
export const Main: React.FC = () => {
    const {request_type} = useParams();
    const requestType: SerieGetRequestType = request_type as SerieGetRequestType  ?? 'trending';
    const context = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const getFilterState = (): FilterState =>({
        genre: searchParams.get('genre') ?? '',
        language: searchParams.get('language') ?? '',
        country: searchParams.get('country') ?? '',
        sortOption: searchParams.get('sortOption') ?? '',
        year: searchParams.get('year') ?? '',
        name: searchParams.get('name') ?? ''
    });

    const [state, setState] = useState<PageState>({
        loading: true,
        error: false,
        totalPages: 0,
        totalResults: 0,
        pageToFetch: Number(searchParams.get('page') ?? 1),
        series: [],
        currentPage: 1
    });


    const handleFilterChange = (key: keyof FilterState, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set(key, value);
        else newParams.delete(key);
        newParams.set('page', '1');
        setSearchParams(newParams);
    };
    const fetchData = async () => {
        setState(prev => ({...prev, loading: true, pageToFetch: Number(searchParams.get('page') ?? 1)}));

        try {
            const filters = getFilterState();
            let response;
            if (filters.name) response = await context.seriesAPI.getByName(state.pageToFetch, filters.name, filters.year);
            else if (filters.year || filters.country || filters.language || filters.genre || filters.sortOption) {
                const dataToPass: FilterState = {
                    language: context.configuration.languages.get(filters.language) ?? '',
                    country: context.configuration.countries.get(filters.country) ?? '',
                    genre: context.configuration.genres.get(filters.genre) ?? '',
                    year: filters.year,
                    name: filters.name,
                    sortOption: SortOptions.get(filters.sortOption) ?? ''
                };
                response = await context.seriesAPI.getDynamic(state.pageToFetch, dataToPass);
            } else response = await context.seriesAPI.get(state.pageToFetch, requestType);

            setState(prev => ({
                ...prev,
                totalPages: response.total_pages,
                totalResults: response.total_results,
                error: false,
                loading:false,
                series: state.pageToFetch === 1 ? response.results : [...prev.series, ...response.results]
            }));

        } catch (err) {
            console.log(err);
            setState(prev => ({
                ...prev,
                error:true,
                loading: false
            }));
        }
    };

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        setSearchParams(newParams);
        setState(prev => ({
            ...prev,
            series: [],
            currentPage: page
        }));
    };

    const handleNextPage = () => {
        const nextPage = Math.min(state.pageToFetch + 1, state.totalPages);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', nextPage.toString());
        setSearchParams(newParams);
    };

    useEffect(()=>{
        setState(prev => ({...prev, pageToFetch: 1}));
        setState(prev=> ({...prev, series: [], currentPage: 1}));
    }, [requestType]);

    useEffect(() => {
       fetchData();
    }, [location, context.configuration]);

    const onUserButtonClick = async (serie_id: number, collection: Collection, add?: boolean)=>{
        try{
            setState(prev => ({...prev, loading: true}));
            if(add) await context.userAPI.addSerie(context.user!._id, serie_id, collection);
            else await context.userAPI.removeSerie(context.user!._id, serie_id, collection);
            setState(prev => ({...prev, loading: false}));
        }
        catch(e){
            console.log(e);
            setState(prev => ({...prev, loading: false, error: true}));
        }
    };

    return <>
        {state.loading && (<Icon topic='loading' size='big'/>)}
        {state.error  && (<Icon topic='error' size='big'/>)}
        {!state.error  && (
            <div className={styles.mainPage}>
                <SearchField
                    genres={Array.from(context.configuration.genres.keys())}
                    languages={Array.from(context.configuration.languages.keys())}
                    countries={Array.from(context.configuration.countries.keys())}
                    sortOptions={Array.from(SortOptions.keys())}
                    filter={getFilterState()}
                    onFilterChange={handleFilterChange}
                />
                {state.series.length > 0 && (
                    <SerieCards>
                        {state.series.map((serie, index) =>
                            <SeriesCard
                                authorized={!!context.user}
                                key={`${serie.id}-${index}`}
                                id={serie.id}
                                imagePath={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''}
                                name={serie.name}
                                topicOfCard='usual'
                                onIconClick={onUserButtonClick}
                            />
                        )}
                    </SerieCards>
                )}

                {state.totalPages > 1 && (
                    <Pagination
                        pageCount={state.totalPages}
                        onPageSelect={handlePageChange}
                        onClick={handleNextPage}
                        page={state.currentPage}
                    />
                )}
            </div>)}
    </>;
};