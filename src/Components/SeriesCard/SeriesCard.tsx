import React from 'react';
import styles from './style.css';
import { MiniButton } from '../MiniButton/MiniButton';
import { Rating } from '../Rating/Rating';
import { Link } from 'react-router';
import classNames from 'classnames';
import defaultImage from '../../Images/DefaultSerie.png';
import { UsualCardProps } from '../../types';
import { UserButtons } from '../UserButtons/UserButtons';

type SeriesCardBaseProps = {
    imagePath: string;
    name: string,
    id: number
};

export type SeriesCardProps =
    (SeriesCardBaseProps & UsualCardProps & {
        topicOfCard: 'usual'
    }) |
    (SeriesCardBaseProps & {
        topicOfCard: 'favourites' | 'to-watch' | 'watched'
        voteCount: number
        averageVote: number
        onIconClick: () => void;
    });

export const SeriesCard: React.FC<SeriesCardProps & {authorized: boolean}> = (props) => {
    const { imagePath, name, topicOfCard } = props;

    const renderButtons = () => {
        switch (topicOfCard) {
            case 'usual':
                return (
                    <UserButtons
                        onCircleClick={props.onCircleClick}
                        onHeartClick={props.onHeartClick}
                        onStarClick={props.onStarClick}
                    />
                );
            case 'favourites':
                return (
                    <OtherButtons
                        displayType="heart"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onButtonClick={props.onIconClick}
                    />
                );
            case 'to-watch':
                return (
                    <OtherButtons
                        displayType="star"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onButtonClick={props.onIconClick}
                    />
                );
            case 'watched':
                return (
                    <OtherButtons
                        displayType="circle"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onButtonClick={props.onIconClick}
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
    voteCount: number;
    averageVote: number;
    displayType: 'star' | 'heart' | 'circle';
    onButtonClick: () => void;
};

const OtherButtons: React.FC<OtherButtonsProps> = ({voteCount, averageVote, displayType, onButtonClick
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
                onClick={onButtonClick}
            />
        </div>
    );
};