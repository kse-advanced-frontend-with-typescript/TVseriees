import React, {useContext, useEffect, useState} from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {SerieDetails, SeriesDetails} from '../../Components/SeriesDetails/SeriesDetails';
import {Season, Seasons} from '../../Components/Seasons/Seasons';
import {Reviews} from '../../Components/Reviews/Reviews';
import {useParams} from 'react-router';
import {Overview} from '../../Components/Box/Overview';
import {Pictures} from '../../Components/SeriesPictures/Pictures';
import style from './style.css';
import {Icon} from '../../Components/Icon/Icon';
import defaultImage from '../../Images/DefaultSerie.png';
import {AppContext} from '../../context';
import {Recommended, Review} from '../../modules/clients/series';
import {Collection} from '../../types';
import {RecommendedTVs} from '../../Components/Box/Recommended';
type PageState = {
    loading: boolean,
    error: string,
    details?: SerieDetails,
    reviews?: Review,
    images?: string[],
    seasons?: Season[],
    recommended?: Recommended
}

export const SeriePage: React.FC = () => {
    const context = useContext(AppContext);
    const [pageState, setPageState] = useState<PageState>({
        loading: true,
        error: ''
    });
    const {id} = useParams<string>();
    useEffect(() => {
        if(!id)return ;
        const seriesId = parseInt(id);
        setPageState(prev => ({...prev, loading: true}));
        Promise.all([
            context.seriesAPI.getDetails(seriesId),
            context.seriesAPI.getReviews(seriesId),
            context.seriesAPI.getImages(seriesId),
            context.seriesAPI.getRecommended(seriesId)
        ]).then(([detailsData, reviewsData, imagesData, recommendedData]) => {
            setPageState(prev => ({
                ...prev,
                details: detailsData,
                reviews: reviewsData,
                images: imagesData,
                recommended: recommendedData,
                error: ''
            }));

            if (detailsData && detailsData.number_of_seasons) {
                const seasonPromises = Array.from(
                    { length: detailsData.number_of_seasons },
                    (_, index) =>  context.seriesAPI.getSeason(seriesId, index + 1)
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
    const onUserButtonClick = async ( serie_id: number, collection: Collection, add: boolean)=>{
        if(add) await context.userAPI.addSerie(context.user!._id, serie_id, collection);
        else await context.userAPI.removeSerie(context.user!._id, serie_id, collection);
    };
    return (
        <div className={style.seriePage}>
            {pageState.loading && <Icon topic='loading' size='big'/>}
            {pageState.error &&  <Icon topic='error' size='big'/>}
            {
                !pageState.loading && !pageState.error && pageState.details && (
                    <>
                        <div className={style.details}>
                            <Poster
                                path={pageState.details.poster_path? pageState.details.poster_path: defaultImage}
                                name={pageState.details.name}
                                layout='vertical'
                            />
                            <SeriesDetails
                                id={pageState.details.id}
                                authorized={!!context.user}
                                cast={pageState.details.cast}
                                episode_run_time={pageState.details.episode_run_time}
                                first_air_date={pageState.details.first_air_date}
                                created_by={pageState.details.created_by}
                                genres={pageState.details.genres}
                                name={pageState.details.name}
                                number_of_episodes={pageState.details.number_of_episodes}
                                number_of_seasons={pageState.details.number_of_seasons}
                                original_language={context.configuration.code_languages.get(pageState.details.original_language) ?? 'unknown'}
                                original_name={pageState.details.original_name}
                                production_companies={pageState.details.production_companies}
                                production_countries={pageState.details.production_countries}
                                vote_average={pageState.details.vote_average}
                                vote_count={pageState.details.vote_count}
                                onIconClick={onUserButtonClick}

                            />
                        </div>
                        {pageState.details.overview.length > 0 && <Overview overview={pageState.details.overview}/>}
                        {pageState.seasons && (<Seasons seasons={pageState.seasons}/>)}
                        {pageState.images && pageState.images.length>0 && (<Pictures name={pageState.details.name} paths={pageState.images}/>)}
                        {pageState.reviews && pageState.reviews.results.length > 0 && (<Reviews reviews={pageState.reviews.results}/>)}
                        {pageState.recommended && pageState.recommended.results.length > 0 && <RecommendedTVs series={pageState.recommended.results}/>}
                    </>
                )
            }
        </div>
    );
};