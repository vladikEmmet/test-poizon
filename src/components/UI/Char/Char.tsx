import React, {FC} from 'react';
import styles from './Char.module.scss';
import cn from 'clsx';

interface CharProps {
    className?: string;
    expected: string;
    toEqual: string;
}

export const Char: FC<CharProps> = React.memo(({className, expected, toEqual}) => {
    const isCorrect = expected === toEqual;
    const isWhitespace = expected === ' ';

    return (
        <span
            className={cn(styles.char, className, {
                [styles.whitespace]: isWhitespace,
                [styles.incorrect]: !isCorrect
            })}>
            {expected}
        </span>
    );
});