import React, {useEffect, useRef, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {countries, genres, languages, sortOptions} from '../../ExampleData';
import {Pagination} from '../../Components/Pagination/Pagination';
import mainStyles from '../../main.css';
import styles from './style.css';
import {seriesAPI, SeriesResult} from "../../modules/clients/series";

type Series = {
    id: number,
    name: string,
    poster_path: string | null
}

type MainState = {
    loading: boolean,
    error: string,
    series: Series[],
    total_pages: number,
    total_results: number,
    current_page: number
}

export const Main: React.FC = () => {
    const [mainState, setMainState] = useState<MainState>({
        loading: true,
        error: "",
        series: [],
        total_pages: 0,
        total_results: 0,
        current_page: 1
    });

    useEffect(() => {
        setMainState(prev => ({...prev, loading: true}));
        seriesAPI(process.env.API_KEY ?? '', fetch).get(mainState.current_page).then(res => {
            setMainState(prev => ({
                ...prev,
                series: res.results,
                total_pages: res.total_pages,
                total_results: res.total_results,
                error: ""
            }));
        }).catch(err => {
            setMainState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : "An error occurred, sorry:((("
            }));
        }).finally(() => {
            setMainState(prev => ({...prev, loading: false}));
        });
    }, [mainState.current_page]);

    return <div className={styles.mainPage}>
        <SearchField genres={genres} languages={languages} countries={countries} sortOptions={sortOptions}/>
        {mainState.loading && <div>Loading...</div>}
        {mainState.error && <div>{mainState.error}</div>}

        {!mainState.loading && !mainState.error && mainState.series.length > 0 && (
            <div className={mainStyles.seriesContainer}>
                {mainState.series.map((serie) =>
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

        {mainState.total_pages > 0 && (
            <Pagination
                pageCount={mainState.total_pages}
                onPageSelect={(page: number) =>  setMainState(prev => ({...prev, current_page: page}))}
                onClick={() => setMainState(prev =>({...prev, current_page: Math.min(prev.current_page + 1, mainState.total_pages)})) }
                page={mainState.current_page}
            />
        )}
    </div>;
};