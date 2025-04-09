import React from 'react';
import styles from './style.css';
import {Link} from 'react-router';

export const RecommendedTVs: React.FC<{series: {id: number, name: string}[]}> = ({series}) => {
    return (
        <div className={styles.overview}>
            <h3>Something similar</h3>
            <article>
                {series.map((item, index) => (
                    <span key={item.id+index}>
                        {index > 0 && ', '}
                        <Link className={styles.link} to={`/serie/${item.id}`}>
                            {item.name}
                        </Link>
                    </span>
                ))}
            </article>
        </div>
    );
};