import React, {useEffect, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {SortOptions} from '../../ExampleData';
import {Pagination} from '../../Components/Pagination/Pagination';
import mainStyles from '../../main.css';
import styles from './style.css';
import {SerieGetRequestType, seriesAPI} from '../../modules/clients/series';
import {searchAPI} from '../../modules/clients/searchData';
import {useParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';
import {FilterState} from "../../types";

const getRequestType = (request?: string): SerieGetRequestType => {
    const validRequests = ['airing_today', 'trending', 'on_the_air', 'popular', 'top_rated'];
    if (validRequests.find(r => r === request)) return request as SerieGetRequestType;
    return 'trending';
};

type Series = {
    id: number,
    name: string,
    poster_path: string | null
}

type PageState = {
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
type Search = {
    genres: Map<string, string>,
    languages:  Map<string, string>,
    countries:  Map<string, string>,
};
export const Main: React.FC = () => {
    const {request_type} = useParams();
    const requestType: SerieGetRequestType = getRequestType(request_type);

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
        errorFetchingSeries: '',
        errorLoadingOptions: '',
        series: [],
        totalPages: 0,
        totalResults: 0,
        pageToFetch: 1
    });

    const [searchOptions, setSearchOptions] = useState<Search>({
        genres: new Map(),
        languages: new Map(),
        countries: new Map()
    });

    useEffect(() => {
        const api = searchAPI(process.env.API_KEY ?? '', fetch);
        Promise.all([
            api.getCountries(),
            api.getLanguages(),
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

        const api = seriesAPI(process.env.API_KEY ?? '', fetch);
        let apiPromise;
        if (filterState.name)apiPromise = api.getByName(pageState.pageToFetch, filterState.name, filterState.year);
        else if(filterState.year || filterState.country || filterState.language || filterState.genre || filterState.sortOption){
            const dataToPass: FilterState = {
                language: searchOptions.languages.get(filterState.language) ?? '',
                country: searchOptions.countries.get(filterState.country) ??  '',
                genre: searchOptions.genres.get(filterState.genre) ??  '',
                year: filterState.year,
                name: filterState.name, sortOption: SortOptions.get(filterState.sortOption) ??  ''
            };
            apiPromise = api.getDynamic(pageState.pageToFetch, dataToPass);
        }else apiPromise = api.get(pageState.pageToFetch, requestType);

        apiPromise
            .then(res => {
                setPageState(prev => ({
                    ...prev,
                    series: res.results,
                    totalPages: res.total_pages,
                    totalResults: res.total_results,
                    error: ''
                }));

                setSeries(prev => ({
                    ...prev,
                    series: pageState.pageToFetch === 1
                        ? res.results
                        : [...prev.series, ...res.results]
                }));
            })
            .catch(err => {
                setPageState(prev => ({
                    ...prev,
                    errorFetchingSeries: err instanceof Error ? err.message : 'An error occurred, sorry:((('
                }));
            })
            .finally(() => {
                setPageState(prev => ({...prev, loading: false}));
            });
    }, [requestType, pageState.pageToFetch, filterState, searchOptions]);


    return <>
        {pageState.loading && (<Icon topic='loading' size='big'/>)}
        {pageState.errorFetchingSeries || pageState.errorLoadingOptions && (<Icon topic='error' size='big'/>)}
        {!pageState.errorFetchingSeries && !pageState.errorLoadingOptions && (
            <div className={styles.mainPage}>
                <SearchField
                    genres={Array.from(searchOptions.genres.keys())}
                    languages={Array.from(searchOptions.languages.keys())}
                    countries={Array.from(searchOptions.countries.keys())}
                    sortOptions={Array.from(SortOptions.keys())}
                    filter={filterState}
                    onFilterChange={handleFilterChange}
                />
                {series.series.length > 0 && (
                    <div className={mainStyles.seriesContainer}>
                        {series.series.map((serie, index) =>
                            <SeriesCard
                                key={`${serie.id}-${index}`}
                                id={serie.id}
                                imagePath={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''}
                                name={serie.name}
                                topicOfCard='usual'
                                onStarClick={() => alert(`Star clicked for ${serie.name}`)}
                                onHeartClick={() => alert(`Heart clicked for ${serie.name}`)}
                                onCircleClick={() => alert(`Circle clicked for ${serie.name}`)}
                            />
                        )}
                    </div>
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