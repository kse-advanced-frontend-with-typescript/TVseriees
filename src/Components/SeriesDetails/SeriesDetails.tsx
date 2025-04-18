import React from 'react';
import styles from './style.css';
import {Rating} from '../Rating/Rating';

type SeriesDetailsProps = {
    episode_run_time: number,
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
        actor: string
    }[]
};

export const SeriesDetails: React.FC<SeriesDetailsProps> = (props) => {
    return (
        <div className={styles.detailItems}>
            <h2>{props.name}</h2>
            <Details {...props}/>
            <Rating averageVote={props.vote_average} voteCount={props.vote_count} size='usual'/>
        </div>
    );
};

const Details: React.FC<SeriesDetailsProps> = (props) => {
    return (
        <div>
            <DetailItem label='Original title:' value={props.original_name}/>
            <DetailItem label='Release date:' value={props.first_air_date}/>
            <DetailItem label='Countries:' value={props.production_countries.join(', ')}/>
            <DetailItem label='Genres:' value={props.genres.join(', ')}/>
            <DetailItem label='Created by:' value={props.created_by.join(', ')}/>
            <DetailItem label='Original language:' value={props.original_language}/>
            <DetailItem label='Number of seasons:' value={props.number_of_seasons.toString()}/>
            <DetailItem label='Number of episodes:' value={props.number_of_episodes.toString()}/>
            <DetailItem label='Episode runtime (minutes):' value={props.episode_run_time.toString()}/>
            <DetailItem label='Production companies:' value={props.production_companies.join(', ')}/>
            <SeriesCast cast={props.cast}/>
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

const SeriesCast: React.FC<{cast: { id: number, actor: string }[]}> = ({cast}) => {
    return (
        <div className={styles.item}>
            <h5 className={styles.label}>Cast:</h5>
            <p>
                {cast.map((obj, index) => (
                    <>
                        {index > 0 && ', '}
                        <a key={obj.id} className={styles.link} href='#'>{obj.actor}</a>
                    </>
                ))}
            </p>
        </div>
    );
};

