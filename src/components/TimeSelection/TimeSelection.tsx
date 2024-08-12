import React, {FC} from 'react';
import styles from './TimeSelection.module.scss';
import cn from 'clsx';
import {ButtonWithBlur} from "../UI/ButtonWithBlur/ButtonWithBlur";
import {GameStatusEnum} from "../../types/enums";

interface TimeSelectionProps {
    time: number;
    setTime: (time: number) => void;
    className?: string;
    status: GameStatusEnum;
}

const timeOptions = [10, 20, 30, 40, 50, 60];

export const TimeSelection: FC<TimeSelectionProps> = ({time, setTime, className, status}) => {

    return (
        <div className={cn(styles.container, className)}>
            <p>Время</p>
            <div className={styles.buttons}>
                {timeOptions.map(timeOption =>
                    <ButtonWithBlur
                        key={timeOption}
                        onClick={() => setTime(timeOption)}
                        className={cn(styles.btn, {
                            [styles.active]: time === timeOption
                        })}
                    >
                        {timeOption + "с"}
                    </ButtonWithBlur>
                )}
            </div>
        </div>
    );
};