import React from 'react';
import {Poster} from '../../Components/Poster/Poster';
import {SeriesDetails} from '../../Components/SeriesDetails/SeriesDetails';
import {Seasons} from '../../Components/Seasons/Seasons';
import {Reviews} from '../../Components/Reviews/Reviews';
import {Button} from '../../Components/Button/Button';
import {exampleSeasonsData, poster, reviews, details} from '../../ExampleData';
import {Pagination} from "../../Components/Pagination/Pagination";


export const SeriePage: React.FC = ()=>{
    return <>
        <Poster path={poster.path} name={poster.name} layout='vertical'/>
        <SeriesDetails episode_run_time={details.episode_run_time} first_air_date={details.first_air_date} created_by={details.created_by} genres={details.genres} name={details.name} number_of_episodes={details.number_of_episodes} number_of_seasons={details.number_of_seasons} original_language={details.original_language} original_name={details.original_name} production_companies={details.production_companies} production_countries={details.production_countries} vote_average={details.vote_average} vote_count={details.vote_count} cast={details.cast}/>
        <Seasons seasons={exampleSeasonsData}/>
        <Reviews reviews={reviews}/>
        <Button purpose='Show more' onClick={()=>alert('Show more!')}/>
        <Pagination
            pageCount={50}
            onPageSelect={(page) => alert(`Page ${page} selected`)}
            onClick={() => alert('Show more!')}
            page={4}
        />
    </>;
};