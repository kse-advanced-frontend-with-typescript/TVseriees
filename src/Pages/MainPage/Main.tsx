import React, {useEffect, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {SortOptions} from '../../ExampleData';
import {Pagination} from '../../Components/Pagination/Pagination';
import mainStyles from '../../main.css';
import styles from './style.css';
import {SerieGetRequestType, seriesAPI} from '../../modules/clients/series';
import {Search, searchAPI} from '../../modules/clients/searchData';
import {useParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';

const getRequestType = (request?: string): SerieGetRequestType => {
    const validRequests = ['airing_today' , 'trending' , 'on_the_air' , 'popular' , 'top_rated'];
    if (validRequests.find(r => r===request))return request as SerieGetRequestType;
    return 'trending';
};

type Series = {
    id: number,
    name: string,
    poster_path: string | null
}

type PageSate = {
    loading: boolean,
    errorFetchingSeries: string,
    errorLoadingOptions: string,
    series: Series[],
    totalPages: number,
    totalResults: number,
    pageToFetch: number
}

type SeriesToShow = {
    series: Series[],
    currentPage: number
}

export const Main: React.FC = () => {
    const {request_type} = useParams();
    const requestType: SerieGetRequestType = getRequestType(request_type);
    const [pageState, setPageState] = useState<PageSate>({
        loading: true,
        errorFetchingSeries: '',
        errorLoadingOptions: '',
        series: [],
        totalPages: 0,
        totalResults: 0,
        pageToFetch: 1
    });


    const [searchOptions, setSearchOptions] = useState<Search>({
        genres: [],
        languages: [],
        countries: []
    });

    useEffect(() => {
        const api = searchAPI(process.env.API_KEY ?? '', fetch);
        Promise.all([
            api.get('countries'),
            api.get('languages'),
            api.getGenres()
        ]).then(([countries, languages, genres]) => {
            setSearchOptions({genres: genres, countries: countries, languages: languages});
        })
            .catch(err => {
                setPageState(prev => ({
                    ...prev,
                    errorLoadingOptions: err instanceof Error ? err.message : 'An error occurred, sorry:((('
                }));

            })
            .finally(() => {
                setPageState(prev => ({...prev, loading: false}));
            });
    }, []);

    const [series, setSeries]  = useState<SeriesToShow>({
        series: [],
        currentPage: 1
    });
    useEffect(() => {
        setPageState(prev => ({...prev, pageToFetch: 1}));
        setSeries({series: [], currentPage: 1}
        );
    }, [requestType]);


    useEffect(() => {
        setPageState(prev => ({...prev, loading: true}));
        seriesAPI(process.env.API_KEY ?? '', fetch).get(pageState.pageToFetch, requestType).then(res => {
            setPageState(prev => ({
                ...prev,
                series: res.results,
                totalPages: res.total_pages,
                totalResults: res.total_results,
                error: ''
            }));
            setSeries(prev => ({...prev, series: [...prev.series, ...res.results]}));
        }).catch(err => {
            setPageState(prev => ({
                ...prev,
                errorFetchingSeries: err instanceof Error ? err.message : 'An error occurred, sorry:((('
            }));
        }).finally(() => {
            setPageState(prev => ({...prev, loading: false}));
        });
    }, [pageState.pageToFetch, requestType]);


    return <>
        {pageState.loading && (<Icon topic='loading' size='big'/>)}
        {pageState.errorFetchingSeries || pageState.errorLoadingOptions && (<Icon topic='error' size='big'/>)}
        {!pageState.errorFetchingSeries && !pageState.errorLoadingOptions && (
        <div className={styles.mainPage}>
            <SearchField
                genres={searchOptions.genres}
                languages={searchOptions.languages}
                countries={searchOptions.countries}
                sortOptions={Object.values(SortOptions)}
                onFilterChange={()=>alert('Changed filter!')}
                onNameChange={()=>alert('Changed name!')}
            />
            {series.series.length > 0 && (
                <div className={mainStyles.seriesContainer}>
                    {series.series.map((serie) =>
                        <SeriesCard
                            key={serie.id}
                            id={serie.id}
                            imagePath={serie.poster_path ? `https://image.tmdb.org/t/p/original${serie.poster_path}` : ''}                            name={serie.name}
                            topicOfCard='usual'
                            onStarClick={() => alert(`Star clicked for ${serie.name}`)}
                            onHeartClick={() => alert(`Heart clicked for ${serie.name}`)}
                            onCircleClick={() => alert(`Circle clicked for ${serie.name}`)}
                        />
                    )}
                </div>
            )}

            {pageState.totalPages > 0 && (
                <Pagination
                    pageCount={pageState.totalPages}
                    onPageSelect={(page: number) =>  {
                        setPageState(prev => ({...prev, pageToFetch: page}));
                        setSeries({currentPage: page, series: []});
                    }}
                    onClick={() => {
                        setPageState(prev =>({...prev, pageToFetch: Math.min(prev.pageToFetch + 1, pageState.totalPages)}));} }
                    page={series.currentPage}
                />
            )}
        </div>)}
    </>;
};