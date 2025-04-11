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
    error: boolean,
    details?: SerieDetails,
    reviews?: Review,
    images?: string[],
    seasons?: Season[],
    recommended?: Recommended
}

export const SeriePage: React.FC = () => {
    const context = useContext(AppContext);
    const [state, setState] = useState<PageState>({
        loading: true,
        error: false
    });
    const {id} = useParams<string>();
    useEffect(() => {
        if(!id)return ;
        const seriesId = parseInt(id);
        setState(prev => ({...prev, loading: true}));
        Promise.all([
            context.seriesAPI.getDetails(seriesId),
            context.seriesAPI.getReviews(seriesId),
            context.seriesAPI.getImages(seriesId),
            context.seriesAPI.getRecommended(seriesId)
        ]).then(([detailsData, reviewsData, imagesData, recommendedData]) => {
            setState(prev => ({
                ...prev,
                details: detailsData,
                reviews: reviewsData,
                images: imagesData,
                recommended: recommendedData,
                error: false
            }));

            if (detailsData && detailsData.number_of_seasons) {
                const seasonPromises = Array.from(
                    { length: detailsData.number_of_seasons },
                    (_, index) =>  context.seriesAPI.getSeason(seriesId, index + 1)
                );

                Promise.all(seasonPromises)
                    .then(allSeasonsData => {
                        setState(prev => ({
                            ...prev,
                            seasons: allSeasonsData,
                        }));
                    })
                    .catch(err => {
                        console.log(err);
                        setState(prev => ({
                            ...prev,
                            error: true
                        }));
                    });
            }
        })
            .catch(err => {
                console.log(err);
                setState(prev => ({
                    ...prev,
                    error:true
                }));
            })
            .finally(() => {
                setState(prev => ({...prev, loading: false}));
            });
    }, [id]);


    const onDelete = async (serie_id: number, collection: Collection)=>{
        try{
            setState(prev => ({...prev, loading: true}));
            const _id = context.userCollections[collection].get(serie_id);
            if(!_id)return;
            await context.userAPI.removeSerie(_id, collection);
            context.userCollections[collection].delete(serie_id);
            setState(prev => ({...prev, loading: false}));
        }
        catch(e){
            console.log(e);
            setState({loading: false, error: true});
        }
    };

    const onAdd = async (serie_id: number, collection: Collection)=>{
        try{
            setState(prev => ({...prev, loading: true}));
            const _id: string = await context.userAPI.addSerie(context.user!._id, serie_id, collection);
            context.userCollections[collection].set(serie_id, _id);
            setState(prev => ({...prev, loading: false}));
        }
        catch(e){
            console.log(e);
            setState(prev => ({...prev, loading: false, error: true}));
        }
    };

    return (
        <div className={style.seriePage}>
            {state.loading && <Icon topic='loading' size='big'/>}
            {state.error &&  <Icon topic='error' size='big'/>}
            {
                !state.loading && !state.error && state.details && (
                    <>
                        <div className={style.details}>
                            <Poster
                                path={state.details.poster_path? state.details.poster_path: defaultImage}
                                name={state.details.name}
                                layout='vertical'
                            />
                            <SeriesDetails
                                id={state.details.id}
                                authorized={!!context.user}
                                cast={state.details.cast}
                                episode_run_time={state.details.episode_run_time}
                                first_air_date={state.details.first_air_date}
                                created_by={state.details.created_by}
                                genres={state.details.genres}
                                name={state.details.name}
                                number_of_episodes={state.details.number_of_episodes}
                                number_of_seasons={state.details.number_of_seasons}
                                original_language={context.configuration.code_languages.get(state.details.original_language) ?? 'unknown'}
                                original_name={state.details.original_name}
                                production_companies={state.details.production_companies}
                                production_countries={state.details.production_countries}
                                vote_average={state.details.vote_average}
                                vote_count={state.details.vote_count}
                                onAdd={onAdd}
                                onDelete={onDelete}

                            />
                        </div>
                        {state.details.overview.length > 0 && <Overview overview={state.details.overview}/>}
                        {state.seasons && (<Seasons seasons={state.seasons}/>)}
                        {state.images && state.images.length>0 && (<Pictures name={state.details.name} paths={state.images}/>)}
                        {state.reviews && state.reviews.results.length > 0 && (<Reviews reviews={state.reviews.results}/>)}
                        {state.recommended && state.recommended.results.length > 0 && <RecommendedTVs series={state.recommended.results}/>}
                    </>
                )
            }
        </div>
    );
};