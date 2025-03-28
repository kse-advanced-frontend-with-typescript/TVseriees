import React from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {SearchField} from '../../Components/SearchField/SearchField';
import {countries, genres, languages, links, myContacts, seriesData, sortOptions} from '../../ExampleData';
import {Pagination} from "../../Components/Pagination/Pagination";


export const Main: React.FC = ()=>{

    return <>
        <SearchField genres={genres} languages={languages} countries={countries} sortOptions={sortOptions}/>
        <div className="series-container">
            {seriesData.map((serie, index) =>
                <SeriesCard key={index} imagePath={serie.imagePath} name={serie.name} topicOfCard='usual'
                            onStarClick={() => alert(`Star clicked for ${serie.name}`)}
                            onHeartClick={() => alert(`Heart clicked for ${serie.name}`)}
                            onCircleClick={() => alert(`Circle clicked for ${serie.name}`)}/>
            )}
        </div>
        <Pagination
            pageCount={50}
            onPageSelect={(page) => alert(`Page ${page} selected`)}
            onClick={() => alert('Show more!')}
            page={4} 
        />   
    </>;
};