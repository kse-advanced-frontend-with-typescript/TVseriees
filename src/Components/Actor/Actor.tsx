import React from 'react';
import styles from './style.css';
import {Link, useNavigate} from 'react-router';
type ActorProps = {
    name: string,
    knownFor: {
        id: number,
        name: string
    }[]
}
export const Actor: React.FC<ActorProps> = ({name, knownFor})=>{
    const navigate = useNavigate();

    return <div className={styles.actor}>
        <h2>{name}</h2>
        <article>
            <h3>Known for:</h3>
            <p>
                {knownFor.map((item, index) => (
                        <>{index > 0 && ', '}
                        <Link key={item.id} to={`series/${item.id}`}>{item.name}</Link>
                        </>
                ) )}
            </p>
        </article>
    </div>;
};