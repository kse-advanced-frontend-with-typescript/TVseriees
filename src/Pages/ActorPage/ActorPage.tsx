import React, {useEffect, useState} from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {Actor} from '../../Components/Actor/Actor';
import styles from './style.css';
import {useParams} from 'react-router';
import {actorAPI, ActorResponse} from '../../modules/clients/actor';

type ActorPageState = {
    loading: boolean,
    error: string,
    actor?: ActorResponse,
}

export const ActorPage: React.FC = ()=> {
    const {id} = useParams<string>();
    const [actorPageState, setActorPageState] = useState<ActorPageState>({
        loading: true,
        error: '',
    });

    useEffect(() => {
        if (!id) return;

        setActorPageState(prev => ({...prev, loading: true}));
        actorAPI(process.env.API_KEY ?? '', fetch).get(id).then(res => {
            setActorPageState(prev => ({
                ...prev,
                actor: res,
                error: ''
            }));
        }).catch(err => {
            setActorPageState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'An error occurred, sorry:((('
            }));
        }).finally(() => {
            setActorPageState(prev => ({...prev, loading: false}));
        });
    }, [id]);
    return !actorPageState.loading && !actorPageState.error && actorPageState.actor && (
        <div className={styles.actorPage}>
            <Poster path={actorPageState.actor.image} name={actorPageState.actor.name} layout='vertical'/>
            <Actor name={actorPageState.actor.name} knownFor={actorPageState.actor.series}/>
        </div>
    );
};