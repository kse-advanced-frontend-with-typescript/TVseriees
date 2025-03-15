import React, {useState} from 'react';
import styles from './style.css';
import { MiniButton } from "../MiniButton/MiniButton";
import { Rating } from "../Rating/Rating";

type ButtonStates = {
    star: boolean;
    heart: boolean;
    circle: boolean;
};


type SeriesCardProps = {
    imagePath: string;
    name: string;
    voteCount?: number;
    averageVote?: number;
    topicOfCard: 'favourites' | 'to-watch' | 'watched' | 'usual';
};

export const SeriesCard: React.FC<SeriesCardProps> = ({imagePath, name, topicOfCard, voteCount=0, averageVote=0}) => {
    return (
        <div className={styles.seriesCard}>
            <img className={styles.image} src={imagePath} alt={`${name} image`}/>
            <div className={styles.h3}><h3>{name}</h3></div>
            {topicOfCard === 'usual' && (<UsualButtons/>)}
            {topicOfCard === 'favourites' && (<OtherButtons displayType="heart" voteCount={voteCount} averageVote={averageVote}/>)}
            {topicOfCard === 'to-watch' && (<OtherButtons displayType="star" voteCount={voteCount} averageVote={averageVote}/>)}
            {topicOfCard === 'watched'  && (<OtherButtons displayType="circle" voteCount={voteCount} averageVote={averageVote}/>)}
        </div>
    );
};

type OtherButtonsProps = {
    voteCount: number;
    averageVote: number;
    displayType: 'star' | 'heart' | 'circle' ;
};

const OtherButtons: React.FC<OtherButtonsProps> = ({voteCount, averageVote, displayType}) => {
    const [cardVisible, setCardVisible] = useState(true);
    return <>
    {cardVisible && (<div className={styles.buttonsRating}>
        <Rating averageVote={averageVote} voteCount={voteCount} size='small'/>
        <MiniButton topic={displayType} size='mini' onClick={()=>setCardVisible(!cardVisible)}/>
    </div>)}
    </>;

};

const UsualButtons: React.FC = () => {
    const [topic, setTopic] = React.useState<ButtonStates>({
        star: false,
        heart: false,
        circle: false,
    });
    const onClick = (type: keyof ButtonStates) => {
        setTopic(previousState => ({
            ...previousState,
            [type]: !previousState[type]
        }));
    };
    return (
        <div className={styles.buttons}>
            <MiniButton
                topic={topic.star ? 'star' : 'empty-star'}
                size='mini'
                onClick={() => onClick('star')}
            />
            <MiniButton
                topic={topic.heart ? 'heart' : 'empty-heart'}
                size='mini'
                onClick={() => onClick('heart')}
            />
            <MiniButton
                topic={topic.circle ? 'circle' : 'empty-circle'}
                size='mini'
                onClick={() => onClick('circle')}
            />
        </div>
    );
};