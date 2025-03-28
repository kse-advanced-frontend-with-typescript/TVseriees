import React from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {poster, actordata} from '../../ExampleData';
import {Actor} from '../../Components/Actor/Actor';


export const ActorPage: React.FC = ()=>{
    return <>
        <Poster path={poster.path} name={poster.name} layout='vertical'/>
        <Actor name={actordata.name} knownFor={actordata.knownFor}/>
    </>;
};