import React, {FC, useEffect, useMemo} from 'react';
import styles from './TypedWords.module.scss';
import {Char} from "../UI/Char/Char";
import {Caret} from "../UI/Caret/Caret";

interface TypedWordsProps {
    input: string;
    actualWords: string;
    className?: string;
}

export const TypedWords: FC<TypedWordsProps> = ({input, actualWords, className}) => {

    const characters = useMemo(() => {
        return input.split('');
    }, [input]);

    return (
        <div className={styles.container}>
            {characters.map((char, idx) =>
                <Char
                    key={`${char}-${idx}`}
                    expected={actualWords[idx]}
                    toEqual={char}
                />
            )}
            <Caret />
        </div>
    );
};