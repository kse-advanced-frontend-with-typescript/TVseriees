import React from 'react';
import styles from './style.css';
import { MiniButton } from '../MiniButton/MiniButton';
import { Rating } from '../Rating/Rating';
import {Link} from 'react-router';
import classNames from 'classnames';
import defaultImage from '../../Images/DefaultSerie.png';

type ButtonStates = {
    star: boolean;
    heart: boolean;
    circle: boolean;
};

type SeriesCardBaseProps = {
    imagePath: string;
    name: string,
    id: number
};

type UsualCardProps = {
    onStarClick: ()=>void
    onHeartClick: ()=>void
    onCircleClick: ()=>void
};

export type SeriesCardProps =
    (SeriesCardBaseProps & UsualCardProps &{
        topicOfCard: 'usual'
    }) |
    (SeriesCardBaseProps & {
        topicOfCard: 'favourites' | 'to-watch' | 'watched'
        voteCount: number
        averageVote: number
        onIconClick: () => void;
    });

export const SeriesCard: React.FC<SeriesCardProps> = (props) => {
    const { imagePath, name, topicOfCard} = props;

    return (
        <div className={styles.seriesCard}>
            <img
                className={classNames(styles.image, {
                    [styles.defaultImage]: !imagePath
                })} src={imagePath ? imagePath : defaultImage} alt={`${name} image`}
            />
            <Link to={`/serie/${props.id}`}><div className={styles.h3}>{name}</div></Link>
            {topicOfCard === 'usual' && (<UsualButtons onCircleClick={props.onCircleClick} onHeartClick={props.onHeartClick} onStarClick={props.onStarClick}/>)}
            {topicOfCard === 'favourites' && (
                <OtherButtons
                    displayType="heart"
                    voteCount={props.voteCount}
                    averageVote={props.averageVote}
                    onButtonClick={props.onIconClick}
                />
            )}
            {topicOfCard === 'to-watch' && (
                <OtherButtons
                    displayType="star"
                    voteCount={props.voteCount}
                    averageVote={props.averageVote}
                    onButtonClick={props.onIconClick}
                />
            )}
            {topicOfCard === 'watched' && (
                <OtherButtons
                    displayType="circle"
                    voteCount={props.voteCount}
                    averageVote={props.averageVote}
                    onButtonClick={props.onIconClick}
                />
            )}
        </div>
    );
};

type OtherButtonsProps = {
    voteCount: number;
    averageVote: number;
    displayType: 'star' | 'heart' | 'circle';
    onButtonClick: () => void;
};

const OtherButtons: React.FC<OtherButtonsProps> = ({voteCount, averageVote, displayType, onButtonClick}) => {
    return (
        <div className={styles.buttonsRating}>
            <Rating averageVote={averageVote} voteCount={voteCount} size='small'/>
            <MiniButton topic={displayType} size='mini' onClick={onButtonClick}/>
        </div>
    );
};

const UsualButtons: React.FC<UsualCardProps> = ({onHeartClick, onStarClick, onCircleClick}) => {
    const [topic, setTopic] = React.useState<ButtonStates>({
        star: false,
        heart: false,
        circle: false,
    });
    const onClick = (type: keyof ButtonStates, callback: ()=>void) => {
        setTopic(previousState => ({
            ...previousState,
            [type]: !previousState[type]
        }));
        callback();
    };
    return (
        <div className={styles.buttons}>
            <MiniButton
                topic={topic.star ? 'star' : 'empty-star'}
                size='mini'
                onClick={() => onClick('star', onStarClick)}
            />
            <MiniButton
                topic={topic.heart ? 'heart' : 'empty-heart'}
                size='mini'
                onClick={() => onClick('heart', onHeartClick)}
            />
            <MiniButton
                topic={topic.circle ? 'circle' : 'empty-circle'}
                size='mini'
                onClick={() => onClick('circle', onCircleClick)}
            />
        </div>
    );
};