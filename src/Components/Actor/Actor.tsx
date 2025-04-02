import React from 'react';
import styles from './style.css';
import {Link} from 'react-router';
export type ActorProps = {
    name: string,
    knownFor: {
        id: number,
        name: string
    }[]
}
export const Actor: React.FC<ActorProps> = ({name, knownFor})=>{
    return <div className={styles.actor}>
        <h2>{name}</h2>
        <article>
            <h3>Known for:</h3>
            <p>
                {knownFor.length> 0? knownFor.map((item, index) => (
                        <>{index > 0 && ', '}
                        <Link className={styles.link} key={item.id} to={`/serie/${item.id}`}>{item.name}</Link>
                        </>
                ) ) : 'no TV series yet:((('};
            </p>
        </article>
    </div>;
};