import React, {useContext, useEffect, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {useParams} from 'react-router';
import {AppContext} from '../../context';
import {SerieCards} from '../../Components/SerieCards/SerieCards';
import {Collection, Serie} from '../../types';
import {Pagination} from '../../Components/Pagination/Pagination';
import {Icon} from "../../Components/Icon/Icon";
import {Button} from "../../Components/Button/Button";
import {Warning} from "../../Components/Warning/Warning";

type PageState = {
    error: boolean,
    loading: boolean,
    serie_ids: number[],
    pageToFetch: number,
    total: number
}
type SeriesToShow = {
    serie_ids: number[]
    currentPage: number
}

type Card = Serie & {
    voteCount: number
    averageVote: number
}
export const UserSpecificPage: React.FC = ()=>{
    const {request_type} = useParams();
    const context = useContext(AppContext);
    const [state, setState] = useState<PageState>({
        error: false,
        loading: true,
        serie_ids: [],
        pageToFetch: 1,
        total: 0
    });
    const [series, setSeries] = useState<SeriesToShow>({
        serie_ids: [],
        currentPage: 1
    });
    const [cards, setCards] = useState<Card[]>([]);
    const PER_PAGE = 20;
    const startWith = (series.currentPage - 1) * PER_PAGE;
    const [warning, setWarning] = useState<boolean>(false);

    const handleIconClick = async (serie_id: number, collection: Collection) => {
        try{
            setState(prev => ({ ...prev, loading: true }));
            await context.userAPI.removeSerie(context.user!._id, serie_id, collection);
            setCards(prev => prev.filter(card => card.id !== serie_id));
            setState(prev => ({ ...prev, loading: false }));
        }catch(e){
            console.error(e);
            setState(prev => ({ ...prev, error: true }));

        }
    };
    useEffect(() => {
        setState(prev => ({...prev, loading: true}));

        context.userAPI.getSeries(startWith, PER_PAGE, context.user!._id, request_type as Collection ?? 'favorites')
            .then(res => {
            const series_ids = res.data.map(item=>item.serie_id);
            setState(prev => ({
                ...prev,
                serie_ids: series_ids,
                total: res.totals.total,
                error: false
            }));
            setSeries(prev => ({
                ...prev,
                series: state.pageToFetch === 1
                    ? series_ids
                    : [...prev.serie_ids, ...series_ids]
            }));
            })
            .catch(err => {
                console.log(err);
                setState(prev => ({
                    ...prev,
                    error: true
                }));
            })
            .finally(() => {
                setState(prev => ({...prev, loading: false}));

            });
    }, [state.pageToFetch, request_type]);

    useEffect(() => {
        if (state.serie_ids.length === 0) return;
        setCards([]);
        setState(prev => ({...prev, loading: true}));
        const fetchPromises = state.serie_ids.map(id =>
            context.seriesAPI.getDetails(id)
                .then(res => ({
                    id: res.id,
                    name: res.name,
                    poster_path: res.poster_path,
                    voteCount: res.vote_count,
                    averageVote: res.vote_average
                })));
            Promise.all(fetchPromises)
                .then(results => {
                    setCards(results);
                    setState(prev => ({
                        ...prev,
                        error: false
                    }));
                })
                .catch(err => {
                    console.log(err);
                    setState(prev => ({
                        ...prev,
                        error: true
                    }));
                })
                .finally(() => {
                    setState(prev => ({...prev, loading: false}));
                });

    }, [series.serie_ids]);

    const deleteAll = async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            await context.userAPI.removeAll(context.user!._id, request_type as Collection);
            setState(prev => ({ ...prev, serie_ids: [], pageToFetch: 1, loading: false }));
            setCards([]);
            setSeries({ serie_ids: [], currentPage: 1 });
            setWarning(false);
        } catch(e) {
            console.log(e);
            setState(prev => ({ ...prev, error: true }));

        }
    };

    const numberOfPages = Math.ceil(state.total / PER_PAGE);
    return (
        <>
            {state.loading && <Icon topic='loading' size='big'/>}
            {state.error && <Icon topic='error' size='big'/>}
        
            {!state.error && (
                <>
                    <h2>{request_type}</h2>
                    {state.serie_ids.length === 0 && <h2>No items here yet!</h2>}
                    {state.serie_ids.length > 0 && (
                        <><Button purpose='delete all' onClick={()=>setWarning(true)}/>
                            {warning && <Warning onClick={deleteAll} onCancel={()=>setWarning(false)} purpose={'delete everything'} message={'Are you sure?'}/>}
                        <SerieCards>
                            {cards.map((card, index) => (
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
                        </SerieCards></>
                    )}
                </>
            )}

            {numberOfPages > 1 && (
                <Pagination
                    pageCount={numberOfPages}
                    onPageSelect={(page: number) => {
                        setState(prev => ({...prev, pageToFetch: page}));
                        setSeries({currentPage: page, serie_ids: []});
                    }}
                    onClick={() => {
                        setState(prev => ({
                            ...prev,
                            pageToFetch: Math.min(prev.pageToFetch + 1, numberOfPages)
                        }));
                    }}
                    page={series.currentPage}
                />
            )}
        </>
    );
};