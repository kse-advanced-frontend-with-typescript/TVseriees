import React from 'react';
import styles from './style.css';
import {useArrows} from "../../Hooks/useArrows";
import {SliderArrows} from "../SliderArrows/SliderArrows";
export type ReviewType = {
    content: string,
    author: string
}
export const Reviews: React.FC<{reviews: ReviewType[]}> = ({reviews})=>{
    const reviewsPerInstance = 4;
    const {visibleItems: visibleReviews, handleNext, handlePrevious, disableLeft, disableRight} = useArrows(reviews, reviewsPerInstance);
    return  <div className={styles.reviewsContainer}>
        <div className={styles.reviews}>
            {
                visibleReviews.map((review, index)=><Review key={index} content={review.content} author={review.author}/>)
            }

        </div>
        {reviews.length >= reviewsPerInstance && <SliderArrows onPrevious={handlePrevious} onNext={handleNext} disablePrevious={disableLeft} disableNext={disableRight}/>}
    </div>;
};

const Review: React.FC<ReviewType> = ({author, content})=>{
    return <p className={styles.review}><span className={styles.author}>{author}: </span>{content}</p>;
};