import React, { useState } from 'react';
import styles from './style.css';
import { AuthorizationButton } from '../AuthorizationButton/AuthorizationButton';

type WarningProps = {
    onClick: () => void,
    purpose: 'log-out' | 'delete everything'
}

export const Warning: React.FC<WarningProps> = ({ onClick, purpose }) => {
    const [close, setClose] = useState(false);

    const makeAction = () => {
        onClick();
        setClose(true);
    };

    return <>
        {!close && <div className={styles.warning}>
            <p>Are you sure???</p>
            <div className={styles.buttons}>
                <AuthorizationButton
                    type={purpose}
                    form={false}
                    warning={true}
                    onClick={makeAction}
                />
                <AuthorizationButton
                    type='cancel'
                    form={false}
                    warning={true}
                    onClick={() => setClose(true)}
                />
            </div>
        </div>}
    </>;
};