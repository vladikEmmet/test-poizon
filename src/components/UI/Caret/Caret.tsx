import React from 'react';
import styles from './Caret.module.scss';

export const Caret = React.memo(() => {
    return (
        <div
            className={styles.caret}
        />
    );
});