import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

type PosterProps = {
    path: string,
    name: string,
    layout: 'horizontal' | 'vertical';
}

export const Poster: React.FC<PosterProps> = ({path, name, layout}) => {
    return <img
        className={classNames(
            styles.poster,
            {
                [styles.horizontal]: layout === 'horizontal',
                [styles.vertical]: layout === 'vertical',
            }
        )}
        src={path}
        alt={name + ' poster'}
    />;
};