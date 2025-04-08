import React, {useState} from 'react';
import styles from './style.css';
import {Rating} from '../Rating/Rating';
import {Link} from 'react-router';
import {MiniButton} from '../MiniButton/MiniButton';
import {UserButtons} from '../UserButtons/UserButtons';
import {Collection} from '../../types';

export type SerieDetails = {
    id: number,
    episode_run_time: number | 'unknown',
    first_air_date: string,
    created_by: string[],
    genres: string[],
    name: string,
    number_of_episodes: number,
    number_of_seasons: number,
    original_language: string,
    original_name: string,
    production_companies: string[],
    production_countries: string[],
    vote_average: number
    vote_count: number,
    cast: {
        id: number,
        name: string
    }[] | 'unknown',
    overview: string,
    poster_path: string
};
type SeriesDetailsProps = Omit<SerieDetails, 'overview' | 'poster_path'>;
export const SeriesDetails: React.FC<SeriesDetailsProps & {authorized: boolean,  onIconClick: (serie_id: number, collection: Collection, add: boolean) => void}> = (props) => {
    return (
        <div className={styles.detailItems}>
            <h2>{props.name}</h2>
            <Details {...props}/>
            <div className={styles.buttons}>
                <Rating averageVote={props.vote_average} voteCount={props.vote_count} size='premedium'/>
                {props.authorized && <UserButtons id={props.id} onIconClick={props.onIconClick} bigger={true}/>}
            </div>
        </div>
    );
};

const getStringFromArray = (array: string[]): string => array.length > 0? array.join(', '): 'unknown';
const Details: React.FC<SeriesDetailsProps> = (props) => {
    return (
        <div>
            <DetailItem label='Original title:' value={props.original_name}/>
            <DetailItem label='Release date:' value={props.first_air_date}/>
            <DetailItem label='Countries:' value={getStringFromArray(props.production_countries)}/>
            <DetailItem label='Genres:' value={getStringFromArray(props.genres)}/>
            <DetailItem label='Created by:' value={getStringFromArray(props.created_by)}/>
            <DetailItem label='Original language:' value={props.original_language}/>
            <DetailItem label='Number of seasons:' value={props.number_of_seasons.toString()}/>
            <DetailItem label='Number of episodes:' value={props.number_of_episodes.toString()}/>
            <DetailItem label='Episode runtime (minutes):' value={props.episode_run_time.toString()}/>
            <DetailItem label='Production companies:' value={getStringFromArray(props.production_companies)}/>
            {props.cast!='unknown' && (<SeriesCast cast={props.cast}/>)}
        </div>
    );
};

const DetailItem: React.FC<{label: string, value: string}> = ({label, value}) => {
    return (
        <div className={styles.item}>
            <h5 className={styles.label}>{label}</h5>
            <p>{value}</p>
        </div>
    );
};

const SeriesCast: React.FC<{cast: { id: number, name: string }[] | 'unknown'}> = ({cast}) => {
    const [showAll, setShowAll] = useState(false);
    return (
        <div className={styles.item}>
            <div className={styles.castTitle}>
                <h5 className={styles.label}>Cast:</h5>
                {showAll && cast.length > 25 && <MiniButton topic='hidden' size='mini' onClick={() => setShowAll(false)}/>}
                {!showAll && cast.length > 25 && <MiniButton topic='plus' size='mini' onClick={() => setShowAll(true)}/>}
            </div>
                <p className={styles.castContainer}>
                {cast !== 'unknown' ? <>
                        <Cast cast={cast} start={0} end={26}/>
                        {!showAll && cast.length > 25}
                        {showAll && cast.length > 25 && <Cast cast={cast} start={26}/>}
                        </> : 'unknown'
                }
            </p>
        </div>
    );
};

const Cast: React.FC<{cast: { id: number, name: string }[], start: number, end?: number}> = ({cast})=>{
    return <>
        {cast.slice(0, 26).map((obj, index) => (
            <span key={obj.id}>
                            {index > 0 && ', '}
                <Link to={`/actor/${obj.id}`} className={styles.link}>{obj.name}</Link>
        </span>
        ))}
    </>;
};