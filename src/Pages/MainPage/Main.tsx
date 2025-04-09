import React, {useContext, useEffect, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {SortOptions} from '../../ExampleData';
import {Pagination} from '../../Components/Pagination/Pagination';
import styles from './style.css';
import {SerieGetRequestType} from '../../modules/clients/series';
import {useParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';
import {Collection, FilterState, Serie} from '../../types';
import {AppContext} from '../../context';
import {SerieCards} from '../../Components/SerieCards/SerieCards';

const getRequestType = (request?: string): SerieGetRequestType => {
    const validRequests = ['airing_today', 'trending', 'on_the_air', 'popular', 'top_rated'];
    if (validRequests.find(r => r === request)) return request as SerieGetRequestType;
    return 'trending';
};



type PageState = {
    loading: boolean,
    error: boolean,
    series: Serie[],
    totalPages: number,
    totalResults: number,
    pageToFetch: number
}

type SeriesToShow = {
    series: Serie[],
    currentPage: number
}

export const Main: React.FC = () => {
    const {request_type} = useParams();
    const requestType: SerieGetRequestType = getRequestType(request_type);
    const context = useContext(AppContext);
    const [filterState, setFilterState] = useState<FilterState>({
        genre: '',
        language: '',
        country: '',
        sortOption: '',
        year: '',
        name: ''
    });

    const [pageState, setPageState] = useState<PageState>({
        loading: true,
        error: false,
        series: [],
        totalPages: 0,
        totalResults: 0,
        pageToFetch: 1
    });


    const [series, setSeries] = useState<SeriesToShow>({
        series: [],
        currentPage: 1
    });

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilterState(prev => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(()=>{
        setPageState(prev => ({...prev, pageToFetch: 1}));
        setSeries({series: [], currentPage: 1});
        setFilterState({name: '', sortOption: '', genre:'', language: '', country: '', year: ''});
    }, [requestType]);

    useEffect(() => {
        setPageState(prev => ({...prev, loading: true}));

        let apiPromise;
        if (filterState.name)apiPromise = context.seriesAPI.getByName(pageState.pageToFetch, filterState.name, filterState.year);
        else if(filterState.year || filterState.country || filterState.language || filterState.genre || filterState.sortOption){
            const dataToPass: FilterState = {
                language: context.configuration.languages.get(filterState.language) ?? '',
                country: context.configuration.countries.get(filterState.country) ?? '',
                genre: context.configuration.genres.get(filterState.genre) ?? '',
                year: filterState.year,
                name: filterState.name, sortOption: SortOptions.get(filterState.sortOption) ??  ''
            };
            apiPromise = context.seriesAPI.getDynamic(pageState.pageToFetch, dataToPass);
        }else apiPromise = context.seriesAPI.get(pageState.pageToFetch, requestType);

        apiPromise
            .then(res => {
                setPageState(prev => ({
                    ...prev,
                    series: res.results,
                    totalPages: res.total_pages,
                    totalResults: res.total_results,
                    error: false
                }));

                setSeries(prev => ({
                    ...prev,
                    series: pageState.pageToFetch === 1
                        ? res.results
                        : [...prev.series, ...res.results]
                }));
            })
            .catch(err => {
                console.log(err);
                setPageState(prev => ({
                    ...prev,
                    error:true
                }));
            })
            .finally(() => {
                setPageState(prev => ({...prev, loading: false}));
            });
    }, [requestType, pageState.pageToFetch, filterState, context.configuration]);

    const onUserButtonClick = async (serie_id: number, collection: Collection, add?: boolean)=>{
        try{if(add) await context.userAPI.addSerie(context.user!._id, serie_id, collection);
        else await context.userAPI.removeSerie(context.user!._id, serie_id, collection);}
        catch(e){
            console.log(e);
            setPageState(prev => ({...prev, error: true}));

        }
    };

    return <>
        {pageState.loading && (<Icon topic='loading' size='big'/>)}
        {pageState.error  && (<Icon topic='error' size='big'/>)}
        {!pageState.error  && (
            <div className={styles.mainPage}>
                <SearchField
                    genres={Array.from(context.configuration.genres.keys())}
                    languages={Array.from(context.configuration.languages.keys())}
                    countries={Array.from(context.configuration.countries.keys())}
                    sortOptions={Array.from(SortOptions.keys())}
                    filter={filterState}
                    onFilterChange={handleFilterChange}
                />
                {series.series.length > 0 && (
                    <SerieCards>
                        {series.series.map((serie, index) =>
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

                {pageState.totalPages > 1 && (
                    <Pagination
                        pageCount={pageState.totalPages}
                        onPageSelect={(page: number) => {
                            setPageState(prev => ({...prev, pageToFetch: page}));
                            setSeries({currentPage: page, series: []});
                        }}
                        onClick={() => {setPageState(prev => ({...prev, pageToFetch: Math.min(prev.pageToFetch + 1, pageState.totalPages)}));}}
                        page={series.currentPage}
                    />
                )}
            </div>)}
    </>;
};