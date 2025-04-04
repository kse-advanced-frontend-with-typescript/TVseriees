import React, {useState} from 'react';
import styles from './style.css';
import {Poster} from '../Poster/Poster';
import {Icon} from "../Icon/Icon";
import {MiniButton} from "../MiniButton/MiniButton";
import {SliderArrows} from "../SliderArrows/SliderArrows";
import {useArrows} from "../../Hooks/useArrows";


export const SeriesPictures: React.FC<{name: string, paths: string[]}> = ({name, paths})=>{
    const imagesPerInstance = 6;
    const {visibleItems: visibleImages, currentIndex, handleNext, handlePrevious, disableLeft, disableRight} = useArrows(paths, imagesPerInstance);
    return <div className={styles.picturesContainer}>
        <h2>Pictures</h2>
        <div className={styles.pictures}>
            {visibleImages.map((path, index)=>(
                <Poster key={index+path} path={path} name={`${name} picture ${currentIndex+index}`} layout='small-horizontal'/>
            ))}
        </div>
        {visibleImages.length >= imagesPerInstance && <SliderArrows onPrevious={handlePrevious} onNext={handleNext}  disablePrevious={disableLeft} disableNext={disableRight}/>}
    </div>;
};