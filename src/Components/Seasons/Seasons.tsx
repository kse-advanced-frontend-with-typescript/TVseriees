import React, { useState } from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';
import {Poster} from '../Poster/Poster';
import {Rating} from '../Rating/Rating';

export type Season = {
    index: number,
    episodes: EpisodeType[]
}
export const Seasons: React.FC<{seasons: Season[]}> = ({seasons}) => {
    return (
        <div className={styles.seasons}>
            {seasons.map((season) => (
                <SeasonTab
                    key={season.index}
                    index={season.index}
                    episodes={season.episodes}
                />
            ))}
        </div>
    );
};
type EpisodeType = {
    index: number,
    name: string,
    duration: number | 'unknown',
    averageVote: number,
    voteCount: number,
    overview: string,
    imagePath: string
}

export const SeasonTab: React.FC<Season> = ({index, episodes})=>{
    const [extended, extend] = useState(false);
    return <>
        <div className={styles.season}>
            <MiniButton topic='tick' size='medium' onClick={()=>extend(!extended)}/>
            <h2>Season {index}</h2>
            <MiniButton topic='tick' size='medium' onClick={()=>extend(!extended)}/>
        </div>
          {extended &&
            <div className={styles.episodes}>
                {episodes.map(episode => <Episode key={episode.index} episode={episode} />)}
            </div>
        }
    </>;
};


const Episode: React.FC<{episode: EpisodeType}> = ({episode}) => {
    return <div className={styles.episode}>
        <div className={styles.episodeNumber}><h3>Episode {episode.index}</h3></div>
        <div className={styles.episodeImage}>
            <Poster path={episode.imagePath} name={episode.name} layout='horizontal'/>
        </div>
        <div className={styles.episodeOverview}>
            <h2>{episode.name}</h2>
            <article>{episode.overview}</article>
            <p>
                <span style={{color: '#020f1b'}}>Duration: </span>
                <span style={{fontFamily: '"Indie Flower", cursive', fontWeight: 'bold'}}>{episode.duration} minutes</span>
            </p>
            <Rating averageVote={episode.averageVote} voteCount={episode.voteCount} size='small'/>
        </div>
    </div>;
};