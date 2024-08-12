import React, {FC} from 'react';
import styles from './Result.module.scss';
import {GameStatusEnum} from "../../types/enums";
import cn from 'clsx';
import {numberToPercents} from "../../utils/numberToPercents";
import {RestartButton} from "../../components/UI/RestartButton/RestartButton";

interface ResultProps {
    status: GameStatusEnum;
    errors: number;
    accuracy: number;
    totalChars: number;
    wpm: number;
    className?: string;
    onRestart: () => void;
}

export const Result: FC<ResultProps> = ({
    status,
    errors,
    accuracy,
    totalChars,
    wpm,
    className,
    onRestart,
}) => {
    if(status !== GameStatusEnum.FINISHED) return null;

    console.log('render');

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className='container'>
                <h2>Данные о попытке</h2>
                <ul>
                    <li>Символов: {totalChars}</li>
                    <li>Ошибок: {errors}</li>
                    <li>Точность: {numberToPercents(accuracy)}</li>
                    <li>Скорость: {wpm} слов/мин</li>
                </ul>
                <RestartButton onRestart={onRestart} className={styles.restart}/>
            </div>
        </div>
    );
};