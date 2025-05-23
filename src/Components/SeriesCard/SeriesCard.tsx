import React from 'react';
import styles from './style.css';
import { MiniButton } from '../MiniButton/MiniButton';
import { Rating } from '../Rating/Rating';
import { Link } from 'react-router';
import classNames from 'classnames';
import defaultImage from '../../Images/DefaultSerie.png';
import {Collection, SeriesCardProps} from '../../types';
import { UserButtons } from '../UserButtons/UserButtons';
import {userMap} from '../../BusinessData';


export const SeriesCard: React.FC<SeriesCardProps & {authorized: boolean}> = (props) => {
    const { imagePath, name, topicOfCard } = props;

    const renderButtons = () => {
        switch (topicOfCard) {
            case 'usual':
                return (
                    <UserButtons
                        id={props.id}
                        onDelete={props.onDelete}
                        onAdd={props.onAdd}
                    />
                );
            case 'favorites':
                return (
                    <OtherButtons
                        id={props.id}
                        displayType="heart"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onDelete={props.onDelete}
                    />
                );
            case 'future':
                return (
                    <OtherButtons
                        id={props.id}
                        displayType="star"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onDelete={props.onDelete}
                    />
                );
            case 'watched':
                return (
                    <OtherButtons
                        id={props.id}
                        displayType="circle"
                        voteCount={props.voteCount}
                        averageVote={props.averageVote}
                        onDelete={props.onDelete}
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
    onDelete: (serie_id: number, collection: Collection) => void;
};

const OtherButtons: React.FC<OtherButtonsProps> = ({voteCount, averageVote, displayType, onDelete, id
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
                onClick={()=> onDelete(id, userMap.get(String(displayType)) as Collection)}
            />
        </div>
    );
};