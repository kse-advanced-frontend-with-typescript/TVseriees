import React, {useEffect, useState} from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {SerieDetails, SeriesDetails} from '../../Components/SeriesDetails/SeriesDetails';
import {Season, Seasons} from '../../Components/Seasons/Seasons';
import {Reviews} from '../../Components/Reviews/Reviews';
import {useParams} from 'react-router';
import {seriesAPI, Review} from '../../modules/clients/series';
import {Overview} from '../../Components/Overview/Overview';
import {SeriesPictures} from '../../Components/SeriesPictures/SeriesPictures';
import style from './style.css';
import {Icon} from "../../Components/Icon/Icon";
type PageState = {
    loading: boolean,
    error: string,
    details?: SerieDetails,
    reviews?: Review,
    images?: string[],
    seasons?: Season[],
}

export const SeriePage: React.FC = () => {
    const [pageState, setPageState] = useState<PageState>({
        loading: true,
        error: ''
    });
    const {id} = useParams<string>();
    const api = seriesAPI(process.env.API_KEY ?? '', fetch);

    useEffect(() => {
        if(!id)return ;
        const seriesId = parseInt(id);
        setPageState(prev => ({...prev, loading: true}));
        Promise.all([
            api.getDetails(seriesId),
            api.getReviews(seriesId),
            api.getImages(seriesId)
        ]).then(([detailsData, reviewsData, imagesData]) => {
            setPageState(prev => ({
                ...prev,
                details: detailsData,
                reviews: reviewsData,
                images: imagesData,
                error: ''
            }));

            if (detailsData && detailsData.number_of_seasons) {
                const seasonPromises = Array.from(
                    { length: detailsData.number_of_seasons },
                    (_, index) => api.getSeason(seriesId, index + 1)
                );

                Promise.all(seasonPromises)
                    .then(allSeasonsData => {
                        setPageState(prev => ({
                            ...prev,
                            seasons: allSeasonsData,
                        }));
                    })
                    .catch(err => {
                        setPageState(prev => ({
                            ...prev,
                            error: err instanceof Error ? err.message : 'An error occurred, sorry:((('
                        }));
                    });
            }
        })
            .catch(err => {
                setPageState(prev => ({
                    ...prev,
                    error: err instanceof Error ? err.message : 'An error occurred, sorry:((('
                }));
            })
            .finally(() => {
                setPageState(prev => ({...prev, loading: false}));
            });
    }, [id]);

    return (
        <div className={style.seriePage}>
            {pageState.loading && <Icon topic='loading' size='big'/>}
            {pageState.error && <div>{pageState.error}</div>}
            {
                !pageState.loading && !pageState.error && pageState.details && (
                    <>
                        <div className={style.details}>
                            <Poster
                                path={pageState.details.poster_path}
                                name={pageState.details.name}
                                layout='vertical'
                            />
                            <SeriesDetails
                                cast={pageState.details.cast}
                                episode_run_time={pageState.details.episode_run_time}
                                first_air_date={pageState.details.first_air_date}
                                created_by={pageState.details.created_by}
                                genres={pageState.details.genres}
                                name={pageState.details.name}
                                number_of_episodes={pageState.details.number_of_episodes}
                                number_of_seasons={pageState.details.number_of_seasons}
                                original_language={pageState.details.original_language}
                                original_name={pageState.details.original_name}
                                production_companies={pageState.details.production_companies}
                                production_countries={pageState.details.production_countries}
                                vote_average={pageState.details.vote_average}
                                vote_count={pageState.details.vote_count}
                            />
                        </div>
                        <Overview overview={pageState.details.overview}/>
                        {pageState.seasons && (<Seasons seasons={pageState.seasons}/>)}
                        {pageState.images && (<SeriesPictures name={pageState.details.name} paths={pageState.images}/>)}
                        {pageState.reviews && pageState.reviews.results.length > 0 && (<Reviews reviews={pageState.reviews.results}/>)}
                    </>
                )
            }
        </div>
    );
};