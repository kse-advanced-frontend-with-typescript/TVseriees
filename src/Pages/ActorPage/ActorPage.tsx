import React, {useContext, useEffect, useState} from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {Actor} from '../../Components/Actor/Actor';
import styles from './style.css';
import {useParams} from 'react-router';
import {Icon} from '../../Components/Icon/Icon';
import defaultImage from '../../Images/DefaultActor.png';
import {ActorResponse, getActorData} from '../../modules/clients/actor/getActorData';
import {AppContext} from '../../context';

type PageState = {
    loading: boolean,
    error: boolean,
    actor?: ActorResponse,
}

export const ActorPage: React.FC = ()=> {
    const context = useContext(AppContext);
    const {id} = useParams<string>();
    const [pageState, setPageState] = useState<PageState>({
        loading: true,
        error: false,
    });

    useEffect(() => {
        if (!id) return;
        setPageState(prev => ({...prev, loading: true}));
        getActorData(context.actorAPI.getActor(id), context.actorAPI.getActorTVs(id)).then(res => {
            setPageState(prev => ({
                ...prev,
                actor: res,
                error: false
            }));
        }).catch(err => {
            console.log(err);
            setPageState(prev => ({
                ...prev,
                error: true
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