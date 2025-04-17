import React from 'react';
import styles from './style.css';
type ActorProps = {
    name: string,
    knownFor: string[]
}
export const Actor: React.FC<ActorProps> = ({name, knownFor})=>{
    return <div className={styles.actor}>
        <h2>{name}</h2>
        <article>
            <h3>Known for:</h3>
            <p>
                {knownFor.map((item, index) => (
                        <>{index > 0 && ', '}
                        <a href='#'>{item}</a></>
                ) )}
            </p>
        </article>
    </div>;
};