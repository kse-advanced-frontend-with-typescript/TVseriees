import React, { useContext, useEffect, useState } from 'react';
import { SeriesCard } from '../../Components/SeriesCard/SeriesCard';
import { useParams } from 'react-router';
import { AppContext } from '../../context';
import { SerieCards } from '../../Components/SerieCards/SerieCards';
import { Collection, Serie } from '../../types';
import { Pagination } from '../../Components/Pagination/Pagination';
import { Icon } from '../../Components/Icon/Icon';
import { Button } from '../../Components/Button/Button';
import { Warning } from '../../Components/Warning/Warning';
import styles from './style.css';
type Card = Serie & {
    voteCount: number
    averageVote: number
}

type PageState = {
    error: boolean,
    loading: boolean,
    series: Card[],
    pageToFetch: number,
    total: number
}

type SeriesToShow = {
    series: Card[]
    currentPage: number
}

export const UserSpecificPage: React.FC = () => {
    const { request_type } = useParams();
    const context = useContext(AppContext);
    const [state, setState] = useState<PageState>({
        error: false,
        loading: true,
        series: [],
        pageToFetch: 1,
        total: 0
    });
    const [seriesToShow, setSeriesToShow] = useState<SeriesToShow>({
        series: [],
        currentPage: 1
    });
    const PER_PAGE = 20;
    const startWith = (seriesToShow.currentPage - 1) * PER_PAGE;
    const [warning, setWarning] = useState<boolean>(false);

    const getCardsToRender = async () => {
        console.log('User id', context.user?._id);
        if (!context.user || !context.user._id) {
            console.log('User not available yet, skipping fetch');
            return;
        }
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await context.userAPI.getSeries(
                startWith,
                PER_PAGE,
                context.user!._id,
                request_type as Collection ?? 'favorites'
            );
            const fetchPromises = response.data.map(async (item) => {
                const res = await context.seriesAPI.getDetails(item.serie_id);
                return {
                    id: res.id,
                    name: res.name,
                    poster_path: res.poster_path,
                    voteCount: res.vote_count,
                    averageVote: res.vote_average
                };
            });
            const seriesDetails = await Promise.all(fetchPromises);

            setState(prev => ({
                ...prev,
                series: seriesDetails,
                total: response.totals.total,
                error: false,
                loading: false
            }));

            setSeriesToShow(prev => ({
                ...prev,
                series: state.pageToFetch === 1 ? seriesDetails : [...prev.series, ...seriesDetails]
            }));
        } catch (err) {
            console.error(err);
            setState(prev => ({
                ...prev,
                error: true,
                loading: false
            }));
        }
    };

    const handleIconClick = async (serie_id: number, collection: Collection) => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            await context.userAPI.removeSerie(context.user!._id, serie_id, collection);
            await getCardsToRender();
        } catch (e) {
            console.error(e);
            setState(prev => ({ ...prev, error: true, loading: false }));
        }
    };

    useEffect(() => {
         getCardsToRender();
    }, [state.pageToFetch, request_type]);

    const deleteAll = async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            await context.userAPI.removeAll(context.user!._id, request_type as Collection);
            setState(prev => ({...prev, series: [], pageToFetch: 1, loading: false}));
            setSeriesToShow({series: [], currentPage: 1});
            setWarning(false);
        } catch (e) {
            console.error(e);
            setState(prev => ({...prev, error: true, loading: false}));
        }
    };

    const numberOfPages = Math.ceil(state.total / PER_PAGE);

    return (
        <>
            {state.loading && <Icon topic='loading' size='big' />}
            {state.error && <Icon topic='error' size='big' />}

            {!state.error && (
                <>
                    {state.series.length === 0 && <h2 className={styles.empty}>No items in your {request_type} collection yet!</h2>}
                    {state.series.length > 0 && (
                        <>
                            <Button purpose='delete all' onClick={() => setWarning(true)} />
                            {warning && (
                                <Warning
                                    onClick={deleteAll}
                                    onCancel={() => setWarning(false)}
                                    purpose={'delete everything'}
                                    message={'Are you sure?'}
                                />
                            )}
                            <SerieCards>
                                {seriesToShow.series.map((card, index) => (
                                    <SeriesCard
                                        key={card.name + index}
                                        imagePath={card.poster_path ?? ''}
                                        name={card.name}
                                        id={card.id}
                                        onIconClick={handleIconClick}
                                        topicOfCard={request_type as Collection}
                                        authorized={true}
                                        voteCount={card.voteCount}
                                        averageVote={card.averageVote}
                                    />
                                ))}
                            </SerieCards>
                        </>
                    )}
                </>
            )}

            {numberOfPages > 1 && (
                <Pagination
                    pageCount={numberOfPages}
                    onPageSelect={(page: number) => {
                        setState(prev => ({ ...prev, pageToFetch: page }));
                        setSeriesToShow({ currentPage: page, series: [] });
                    }}
                    onClick={() => {
                        setState(prev => ({
                            ...prev,
                            pageToFetch: Math.min(prev.pageToFetch + 1, numberOfPages)
                        }));
                    }}
                    page={seriesToShow.currentPage}
                />
            )}
        </>
    );
};