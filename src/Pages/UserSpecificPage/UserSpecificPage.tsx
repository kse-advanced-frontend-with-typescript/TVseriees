import React, { useContext, useEffect, useState } from 'react';
import { SeriesCard } from '../../Components/SeriesCard/SeriesCard';
import {useParams, useSearchParams} from 'react-router';
import { AppContext } from '../../context';
import { SerieCards } from '../../Components/SerieCards/SerieCards';
import { Collection, Serie } from '../../types';
import { Pagination } from '../../Components/Pagination/Pagination';
import { Icon } from '../../Components/Icon/Icon';
import { Button } from '../../Components/Button/Button';
import { Warning } from '../../Components/Warning/Warning';
import styles from './style.css';
import {getCardData} from '../../modules/getCardData';
import {setNewPageInQueryParams} from '../../modules/NewQueryParams';

type Card = Serie & {
    voteCount: number
    averageVote: number
}

type PageState = {
    error: boolean,
    loading: boolean,
    series: Card[],
    pageToFetch: number,
    currentPage: number
}

export const UserSpecificPage: React.FC = () => {
    const { request_type } = useParams();
    const context = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState<PageState>({
        error: false,
        loading: false,
        series: [],
        pageToFetch: Number(searchParams.get('page') ?? 1),
        currentPage: 1
    });

    const PER_PAGE = 20;
    const startWith = (state.currentPage - 1) * PER_PAGE;
    const [warning, setWarning] = useState<boolean>(false);
    const sizeOfMap = context.userCollections[request_type as Collection].size;
    const numberOfPages = sizeOfMap / PER_PAGE;

    const getCardsToRender = async () => {
        if (!context.user || !context.user._id) {
            return;
        }
        setState(prev => ({ ...prev, loading: true }));
        try {
            const result = await getCardData(
                startWith,
                PER_PAGE,
                Array.from(context.userCollections[request_type as Collection ?? 'favorites'].keys()),
                context.seriesAPI
            );

            setState(prev => ({
                ...prev,
                series: state.pageToFetch === 1 ? result : [...prev.series, ...result],
                error: false,
                loading: false
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
            setState(prev => ({ ...prev, loading: true, pageToFetch: 1, currentPage: 1 }));
            const _id = context.userCollections[collection as Collection].get(serie_id);
            if(!_id)return;
            await context.userAPI.removeSerie(_id, collection);
            context.userCollections[collection as Collection].delete(serie_id);
            setState(prev => ({ ...prev, error: false, loading: false }));
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
            await context.userAPI.removeAll(Array.from(context.userCollections[request_type as Collection].values()), request_type as Collection);
            context.userCollections[request_type as Collection] = new Map();
            setState(prev => ({...prev, series: [], pageToFetch: 1, loading: false,  currentPage: 1}));
            setWarning(false);
        } catch (e) {
            console.error(e);
            setState(prev => ({...prev, error: true, loading: false}));
        }
    };


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
                                {state.series.map((card, index) => (
                                    <SeriesCard
                                        key={card.name + index}
                                        imagePath={card.poster_path ?? ''}
                                        name={card.name}
                                        id={card.id}
                                        onDelete={handleIconClick}
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
                    onPageSelect={(page: number)=>{
                        setSearchParams(setNewPageInQueryParams(page, searchParams));
                        setState(prev => ({...prev, series: [], currentPage: page}));
                    }}
                    onClick={() => setSearchParams(setNewPageInQueryParams(Math.min(state.pageToFetch + 1, context.userCollections[request_type as Collection].size), searchParams))}
                    page={state.currentPage}
                />
            )}
        </>
    );
};