import React, {FC} from 'react';
import styles from './WordsForTypingContainer.module.scss';
import cn from 'clsx';

interface WordsForTypingContainerProps {
    children: React.ReactNode;
    className: string;
}

export const WordsForTypingContainer:FC<WordsForTypingContainerProps> = ({children, className}) => {

    return (
        <div
            className={cn(styles.container, className)}
        >
            {children}
        </div>
    );
};