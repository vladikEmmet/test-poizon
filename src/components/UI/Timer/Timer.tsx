import React, {FC} from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
    time: number;
}

export const Timer: FC<TimerProps> = ({time}) => {
    return (
        <h2
            className={styles.timer}
        >
            {time}
        </h2>
    );
};