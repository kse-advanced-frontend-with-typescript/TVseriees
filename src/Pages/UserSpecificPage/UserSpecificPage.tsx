import React, {useContext, useState} from 'react';
import {SeriesCard} from '../../Components/SeriesCard/SeriesCard';
import {useParams} from 'react-router';
import {AppContext} from '../../context';
import {SerieCards} from '../../Components/SerieCards/SerieCards';

type PageState = {
    error: boolean,
    loading: boolean,
    serie_ids: number[]
}
export const UserSpecificPage: React.FC = ()=>{
    const {request_type} = useParams();
    const context = useContext(AppContext);
    const [state, setState] = useState<PageState>({
        error: false,
        loading: true,
        serie_ids: []
    });


    return <>
        {/*<SerieCards>*/}
        {/*    */}
        {/*</SerieCards>*/}
        <div className="series-container">
            {/*{seriesData.map((serie, index) =>*/}
            {/*    <SeriesCard key={index} imagePath={serie.imagePath} name={serie.name} topicOfCard='favourites'*/}
            {/*                onStarClick={() => alert(`Star clicked for ${serie.name}`)}*/}
            {/*               />*/}
            {/*)}*/}
        </div>

    </>;
};