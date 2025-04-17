import React from 'react';
import styles from './style.css';
type ReviewType = {
    content: string,
    author: string
}
export const Reviews: React.FC<{reviews: ReviewType[]}> = ({reviews})=>{
    return <div className={styles.reviews}>
        {
            reviews.map((review, index)=><Review key={index} content={review.content} author={review.author}/>)
        }
    </div>;
};

const Review: React.FC<ReviewType> = ({author, content})=>{
    return <p className={styles.review}><span className={styles.author}>{author}: </span>{content}</p>;

};