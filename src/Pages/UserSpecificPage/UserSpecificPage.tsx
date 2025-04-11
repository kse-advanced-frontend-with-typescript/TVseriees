import React, {useContext, useEffect, useMemo, useState} from 'react';
import { SeriesCard } from '../../Components/SeriesCard/SeriesCard';
import {useLocation, useParams, useSearchParams} from 'react-router';
import { AppContext } from '../../context';
import { SerieCards } from '../../Components/SerieCards/SerieCards';
import {Collection, Serie, StateWithPagination} from '../../types';
import { Pagination } from '../../Components/Pagination/Pagination';
import { Icon } from '../../Components/Icon/Icon';
import { Button } from '../../Components/Button/Button';
import { Warning } from '../../Components/Warning/Warning';
import styles from './style.css';
import {getCardData} from '../../modules/getCardData';
import {setNewPageInQueryParams} from '../../modules/NewQueryParams';
import {EmptyTitles, UserPageTitles} from '../../BusinessData';
import defaultImage from '../../Images/DefaultSerie.png';
import {createSeriesOperations} from '../../modules/createSeriesOperations';

type Card = Serie & {
    voteCount: number
    averageVote: number
}

export const UserSpecificPage: React.FC = () => {
    const { request_type } = useParams();
    const context = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [series, setSeries] = useState<Card[]>([]);
    const [state, setState] = useState<StateWithPagination>({
        error: false,
        loading: true,
        currentPage: 1,
        pageToFetch: Number(searchParams.get('page') ?? 1),
    });

    const { deleteSerie, deleteAll } = useMemo(() => createSeriesOperations(setState, context), [context]);
    const PER_PAGE = 20;
    const [warning, setWarning] = useState<boolean>(false);

    const collection = request_type as Collection;
    const sizeOfMap = context.userCollections[collection].size;
    const numberOfPages = Math.ceil(sizeOfMap / PER_PAGE);

    const getCardsToRender = async () => {
        if (!context.user || !context.user._id) return;
        if (sizeOfMap === 0) {
            setState(prev => ({ ...prev, series: [], loading: false }));
            return;
        }
        const pageToFetch = Number(searchParams.get('page') ?? 1);
        setState(prev => ({ ...prev, loading: true, pageToFetch, currentPage: pageToFetch }));
        try {
            const result = await getCardData(
                pageToFetch,
                PER_PAGE,
                Array.from(context.userCollections[collection].keys()),
                context.seriesAPI
            );
            setState(prev => ({
                ...prev,
                pageToFetch,
                error: false,
                loading: false
            }));
            setSeries(prev => pageToFetch === 1 ? result : [...prev, ...result]);
        } catch (err) {
            console.error('Error fetching cards:', err);
            setState(prev => ({...prev, error: true, loading: false}));
        }
    };

    useEffect(()=>{
        setState(prev=> ({...prev, series: [], currentPage: 1, pageToFetch: 1}));
        setSearchParams(setNewPageInQueryParams(1, searchParams));
    }, [collection]);

    useEffect(() => {
        getCardsToRender();
    }, [location, context.userCollections]);


    const handleIconClick = async (serie_id: number, collection: Collection) => {
        await deleteSerie(serie_id, collection);
        await getCardsToRender();
    };

    const deleteAllSeries = async () => {
        await deleteAll(collection);
        setSearchParams(setNewPageInQueryParams(1, searchParams));
        setState(prev => ({...prev, series: [], currentPage: 1, pageToFetch: 1}));
        setWarning(false);
    };
    return (
        <>
            {state.loading && <Icon topic='loading' size='big' />}
            {state.error && <Icon topic='error' size='big' />}
            {!state.error && (
                <>
                    {series.length === 0 && sizeOfMap === 0 && !state.loading && (
                        <h2 className={styles.empty}>{EmptyTitles.get(collection)}</h2>
                    )}
                    {(series.length > 0 || (sizeOfMap > 0 && !state.loading)) && (
                        <div className={styles.userPage}>
                            <div className={styles.userHeader}>
                                <h2>{UserPageTitles.get(collection)}</h2>
                                <Button purpose='delete all' onClick={() => setWarning(true)} disabled={context.userCollections[collection].size == 0}/>
                            </div>
                            {warning && (
                                <Warning
                                    onClick={deleteAllSeries}
                                    onCancel={() => setWarning(false)}
                                    purpose={'delete everything'}
                                    message={'Are you sure?'}
                                />
                            )}
                            <SerieCards>
                                {series.map((card, index) => (
                                    <SeriesCard
                                        key={card.name + index}
                                        imagePath={card.poster_path ?? defaultImage}
                                        name={card.name}
                                        id={card.id}
                                        onDelete={handleIconClick}
                                        topicOfCard={collection}
                                        authorized={true}
                                        voteCount={card.voteCount}
                                        averageVote={card.averageVote}
                                    />
                                ))}
                            </SerieCards>
                            {numberOfPages > 1 && (
                                <Pagination
                                    pageCount={numberOfPages}
                                    onPageSelect={(page: number)=>{
                                        setSearchParams(setNewPageInQueryParams(page, searchParams));
                                        setState(prev => ({...prev, series: [], currentPage: page}));
                                    }}
                                    onClick={() => setSearchParams(setNewPageInQueryParams(Math.min(state.pageToFetch + 1, numberOfPages), searchParams))}
                                    page={state.currentPage}
                                    disabledShowMoreButton={numberOfPages === state.pageToFetch}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};