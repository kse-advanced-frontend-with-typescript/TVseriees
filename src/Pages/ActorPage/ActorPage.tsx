import React, {useEffect, useState} from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {Actor} from '../../Components/Actor/Actor';
import styles from './style.css';
import {useParams} from 'react-router';
import {actorAPI, ActorResponse} from '../../modules/clients/actor';
import {Icon} from '../../Components/Icon/Icon';
import defaultImage from '../../Images/DefaultActor.png';

type PageState = {
    loading: boolean,
    error: string,
    actor?: ActorResponse,
}

export const ActorPage: React.FC = ()=> {
    const {id} = useParams<string>();
    const [pageState, setPageState] = useState<PageState>({
        loading: true,
        error: '',
    });

    useEffect(() => {
        if (!id) return;
        setPageState(prev => ({...prev, loading: true}));
        actorAPI(process.env.API_KEY ?? '', fetch).get(id).then(res => {
            setPageState(prev => ({
                ...prev,
                actor: res,
                error: ''
            }));
        }).catch(err => {
            setPageState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred, sorry:((('
            }));
        }).finally(() => {
            setPageState(prev => ({...prev, loading: false}));
        });
    }, [id]);

    return <>
        {pageState.error && <Icon topic='error' size='big'/>}
        {pageState.loading && <Icon topic='loading' size='big'/>}
        {!pageState.loading && !pageState.error && pageState.actor && (
            <div className={styles.actorPage}>
                <Poster path={pageState.actor.image? pageState.actor.image: defaultImage} name={pageState.actor.name} layout='vertical'/>
                <Actor name={pageState.actor.name} knownFor={pageState.actor.series}/>
            </div>
        )}
    </>;

};