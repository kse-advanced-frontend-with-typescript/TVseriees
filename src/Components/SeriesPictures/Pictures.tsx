import React from 'react';
import styles from './style.css';
import {Poster} from '../Poster/Poster';
import {SliderArrows} from '../SliderArrows/SliderArrows';
import {useArrows} from '../../Hooks/useArrows';
import {PicturesProps} from "../../types";


export const Pictures: React.FC<PicturesProps> = ({name, paths})=>{
    const imagesPerInstance = 6;
    const {visibleItems: visibleImages, currentIndex, handleNext, handlePrevious, disableLeft, disableRight} = useArrows(paths, imagesPerInstance);
    return <div className={styles.picturesContainer}>
        <h2>Pictures</h2>
        <div className={styles.pictures}>
            {visibleImages.map((path, index)=>(
                <Poster key={index+path} path={path} name={`${name} picture ${currentIndex+index}`} layout='small-horizontal'/>
            ))}
        </div>
        {paths.length >= imagesPerInstance && <SliderArrows onPrevious={handlePrevious} onNext={handleNext}  disablePrevious={disableLeft} disableNext={disableRight}/>}
    </div>;
};