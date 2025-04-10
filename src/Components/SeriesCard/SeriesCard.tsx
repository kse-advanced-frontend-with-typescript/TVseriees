import React from 'react';
import styles from './style.css';
import { MiniButton } from '../MiniButton/MiniButton';
import { Rating } from '../Rating/Rating';
import { Link } from 'react-router';
import classNames from 'classnames';
import defaultImage from '../../Images/DefaultSerie.png';
import {Collection, userMap} from '../../types';
import { UserButtons } from '../UserButtons/UserButtons';

type SeriesCardBaseProps = {
    imagePath: string;
    name: string,
    id: number
    onIconClick: (serie_id: number, collection: Collection, add?: boolean) => void;
};

export type SeriesCardProps =
    (SeriesCardBaseProps & {
        topicOfCard: 'usual'
    }) |
    (SeriesCardBaseProps & {
        topicOfCard: Collection
        voteCount: number
        averageVote: number
    });

export const SeriesCard: React.FC<SeriesCardProps & {authorized: boolean}> = (props) => {
    const { imagePath, name, topicOfCard } = props;

    const renderButtons = () => {
        switch (topicOfCard) {
            case 'usual':
                return (
                    <UserButtons
                        id={props.id}
                        onIconClick={props.onIconClick}
                    />
                );
            case 'favorites':
                return (
                    <OtherButtons
                        id={props.id}
                        displayType="heart"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onIconClick={props.onIconClick}
                    />
                );
            case 'towatch':
                return (
                    <OtherButtons
                        id={props.id}
                        displayType="star"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onIconClick={props.onIconClick}
                    />
                );
            case 'watched':
                return (
                    <OtherButtons
                        id={props.id}
                        displayType="circle"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onIconClick={props.onIconClick}
                    />
                );
        }
    };

    return (
        <div className={styles.seriesCard}>
                <img
                    className={classNames(styles.image, {
                        [styles.defaultImage]: !imagePath
                    })}
                    src={imagePath ? imagePath : defaultImage}
                    alt={`${name} image`}
                />
                <Link to={`/serie/${props.id}`}>
                    <div className={styles.h3}>{name}</div>
                </Link>
            {props.authorized && <div className={styles.cardButtons}>
                {renderButtons()}
            </div>}
        </div>
    );
};

type OtherButtonsProps = {
    id: number,
    voteCount: number;
    averageVote: number;
    displayType: 'star' | 'heart' | 'circle';
    onIconClick: (serie_id: number, collection: Collection) => void;
};

const OtherButtons: React.FC<OtherButtonsProps> = ({voteCount, averageVote, displayType, onIconClick, id
}) => {
    return (
        <div className={styles.buttonsRating}>
            <Rating
                averageVote={averageVote}
                voteCount={voteCount}
                size='premedium'
            />
            <MiniButton
                topic={displayType}
                size='mini'
                onClick={()=> onIconClick(id, userMap.get(String(displayType)) as Collection)}
            />
        </div>
    );
};