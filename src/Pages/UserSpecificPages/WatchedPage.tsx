import React from 'react';
import {seriesData} from '../../ExampleData';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';


export const WatchedPage: React.FC = ()=>{
    return <>
        <div className="series-container">
            {/*{seriesData.map((serie, index) =>*/}
            {/*    <SeriesCard key={index} imagePath={serie.imagePath} name={serie.name} topicOfCard='favourites'*/}
            {/*                onStarClick={() => alert(`Star clicked for ${serie.name}`)}*/}
            {/*               />*/}
            {/*)}*/}
        </div>

    </>;
};