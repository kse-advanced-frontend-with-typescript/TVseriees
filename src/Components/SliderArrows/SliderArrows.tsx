import React from 'react';
import styles from './style.css';
import {MiniButton} from '../MiniButton/MiniButton';

type SliderArrowsProps = {
    onPrevious: () => void,
    onNext: () => void,
    disablePrevious?: boolean,
    disableNext?: boolean
}
export const SliderArrows: React.FC<SliderArrowsProps> = ({ onPrevious, onNext, disablePrevious, disableNext }) => {
    return (
        <div className={styles.arrowContainer}>
            <MiniButton
                topic='direction'
                size='medium'
                mirror={true}
                onClick={onPrevious}
                isDisabled={disablePrevious}
            />
            <MiniButton
                topic='direction'
                size='medium'
                onClick={onNext}
                isDisabled={disableNext}
            />
        </div>
    );
};
