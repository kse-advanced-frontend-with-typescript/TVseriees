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
import {Icon} from "../../Components/Icon/Icon";

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

type MainState = {
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
    const [mainState, setMainState] = useState<MainState>({
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
                setMainState(prev => ({
                    ...prev,
                    errorLoadingOptions: err instanceof Error ? err.message : 'An error occurred, sorry:((('
                }));

            })
            .finally(() => {
                setMainState(prev => ({...prev, loading: false}));
            });
    }, []);

    const [series, setSeries]  = useState<SeriesToShow>({
        series: [],
        currentPage: 1
    });
    useEffect(() => {
        setMainState(prev => ({...prev, pageToFetch: 1}));
        setSeries({series: [], currentPage: 1}
        );
    }, [requestType]);


    useEffect(() => {
        setMainState(prev => ({...prev, loading: true}));
        seriesAPI(process.env.API_KEY ?? '', fetch).get(mainState.pageToFetch, requestType).then(res => {
            setMainState(prev => ({
                ...prev,
                series: res.results,
                totalPages: res.total_pages,
                totalResults: res.total_results,
                error: ''
            }));
            setSeries(prev => ({...prev, series: [...prev.series, ...res.results]}));
        }).catch(err => {
            setMainState(prev => ({
                ...prev,
                errorFetchingSeries: err instanceof Error ? err.message : 'An error occurred, sorry:((('
            }));
        }).finally(() => {
            setMainState(prev => ({...prev, loading: false}));
        });
    }, [mainState.pageToFetch, requestType]);


    return <>
        {mainState.loading && (<Icon topic='loading' size='big'/>)}
        {mainState.errorFetchingSeries || mainState.errorLoadingOptions && (<Icon topic='error' size='big'/>)}
        {!mainState.errorFetchingSeries && !mainState.errorLoadingOptions && (
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
                            imagePath={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                            name={serie.name}
                            topicOfCard='usual'
                            onStarClick={() => alert(`Star clicked for ${serie.name}`)}
                            onHeartClick={() => alert(`Heart clicked for ${serie.name}`)}
                            onCircleClick={() => alert(`Circle clicked for ${serie.name}`)}
                        />
                    )}
                </div>
            )}

            {mainState.totalPages > 0 && (
                <Pagination
                    pageCount={mainState.totalPages}
                    onPageSelect={(page: number) =>  {
                        setMainState(prev => ({...prev, pageToFetch: page}));
                        setSeries({currentPage: page, series: []});
                    }}
                    onClick={() => {
                        setMainState(prev =>({...prev, pageToFetch: Math.min(prev.pageToFetch + 1, mainState.totalPages)}));} }
                    page={series.currentPage}
                />
            )}
        </div>)}
    </>;
};