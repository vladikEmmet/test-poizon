import React from 'react';
import styles from './Caret.module.scss';

// Компонент для отображения каретки (места ввода текста)
export const Caret = React.memo(() => {
    return (
        <div
            className={styles.caret}
        />
    );
});