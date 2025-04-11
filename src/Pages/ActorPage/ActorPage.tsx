import React, {useContext, useEffect, useState} from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {Actor} from '../../Components/Actor/Actor';
import styles from './style.css';
import {useParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';
import defaultImage from '../../Images/DefaultActor.png';
import {getActorData} from '../../modules/clients/actor/getActorData';
import {AppContext} from '../../context';
import {ActorResponse, State} from '../../types';

export const ActorPage: React.FC = ()=> {
    const context = useContext(AppContext);
    const {id} = useParams<string>();
    const [pageState, setPageState] = useState<State>({
        loading: true,
        error: false,
    });
    const [actor, setActor] = useState<ActorResponse>();

    useEffect(() => {
        if (!id) return;
        setPageState(prev => ({...prev, loading: true}));
        getActorData(context.actorAPI.getActor(id), context.actorAPI.getActorTVs(id)).then(res => {
            setPageState(prev => ({...prev, error: false, loading: false}));
            setActor(res);
        }).catch(err => {
            console.log(err);
            setPageState(prev => ({...prev, error: true, loading: false}));
        });
    }, [id]);

    return <>
        {pageState.error && <Icon topic='error' size='big'/>}
        {pageState.loading && <Icon topic='loading' size='big'/>}
        {!pageState.loading && !pageState.error && actor && (
               <div className={styles.actorPage}>
                <Poster path={actor.image? actor.image: defaultImage} name={actor.name} layout='vertical'/>
                <Actor name={actor.name} knownFor={actor.series}/>
            </div>

        )}
    </>;

};