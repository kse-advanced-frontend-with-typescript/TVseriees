import React from 'react';
import styles from './style.css';
import classNames from 'classnames';

type PosterProps = {
    path: string,
    name: string,
    layout: 'horizontal' | 'vertical' |'small-horizontal';
}

export const Poster: React.FC<PosterProps> = ({path, name, layout}) => {
    return <img
        className={classNames(
            styles.poster,
            {
                [styles.horizontal]: layout === 'horizontal',
                [styles.vertical]: layout === 'vertical',
                [styles.small]: layout === 'small-horizontal',
            }
        )}
        src={path}
        alt={name + ' poster'}
    />;
};