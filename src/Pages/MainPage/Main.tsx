import React, {useContext, useEffect, useMemo, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {SortOptions} from '../../BusinessData';
import {Pagination} from '../../Components/Pagination/Pagination';
import styles from './style.css';
import {SerieGetRequestType} from '../../modules/clients/series';
import {useLocation, useParams, useSearchParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';
import {Collection, Serie, StateWithPagination} from '../../types';
import {AppContext} from '../../context';
import {SerieCards} from '../../Components/SerieCards/SerieCards';
import {setNewPageInQueryParams, setNewQueryParams} from '../../modules/NewQueryParams';
import {getSeriesData} from '../../modules/clients/series/getSeriesData';
import {getFilterState} from '../../modules/getFilterState';
import {createSeriesOperations} from '../../modules/createSeriesOperations';

type PageState = StateWithPagination & {
    totalPages: number,
    totalResults: number,
    series: Serie[],
}

export const Main: React.FC = () => {
    const {request_type} = useParams();
    const requestType: SerieGetRequestType = request_type as SerieGetRequestType  ?? 'trending';
    const context = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const [state, setState] = useState<PageState>({
        loading: true,
        error: false,
        totalPages: 0,
        totalResults: 0,
        pageToFetch: Number(searchParams.get('page') ?? 1),
        series: [],
        currentPage: 1
    });
    const { deleteSerie, addSerie } = useMemo(
        () => createSeriesOperations(setState, context),
        [setState, context]
    );

    const fetchData = async () => {
        const pageToFetch = Number(searchParams.get('page') ?? 1);
        setState(prev => ({...prev, loading: true, pageToFetch, currentPage: pageToFetch}));
        try {
            const filters = getFilterState(searchParams);
            const response = await getSeriesData(pageToFetch, filters, requestType, context.seriesAPI, context.configuration);
            setState(prev => ({
                ...prev,
                totalPages: response.total_pages,
                totalResults: response.total_results,
                error: false,
                loading: false,
                series: pageToFetch === 1 ? response.results : [...prev.series, ...response.results]
            }));
        } catch (err) {
            console.error(err);
            setState(prev => ({...prev, error: true, loading: false}));
        }
    };

    useEffect(()=>{
        setState(prev=> ({...prev, series: [], currentPage: 1, pageToFetch: 1}));
    }, [requestType]);

    useEffect(() => {
       fetchData();
    }, [location, context.configuration]);


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
                    filter={getFilterState(searchParams)}
                    onFilterChange={(key, value) => setSearchParams(setNewQueryParams(key, value, searchParams))}
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
                                onDelete={async (serie_id: number, collection: Collection)=> await deleteSerie(serie_id, collection)}
                                onAdd={async (serie_id: number, collection: Collection)=> await addSerie(serie_id, collection)}

                            />
                        )}
                    </SerieCards>
                )}

                {state.totalPages > 1 && (
                    <Pagination
                        pageCount={state.totalPages}
                        onPageSelect={(page: number)=>{
                            setSearchParams(setNewPageInQueryParams(page, searchParams));
                            setState(prev => ({...prev, series: [], currentPage: page}));
                        }}
                        onClick={() => setSearchParams(setNewPageInQueryParams(Math.min(state.pageToFetch + 1, state.totalPages), searchParams))}
                        page={state.currentPage}
                        disabledShowMoreButton={state.totalPages === state.pageToFetch}

                    />
                )}
            </div>)}
    </>;
};