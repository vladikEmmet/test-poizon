import React, {FC} from 'react';
import styles from './GeneratedWords.module.scss';

interface GeneratedWordsProps {
    words: string;
}

export const GeneratedWords: FC<GeneratedWordsProps> = React.memo(({words}) => {
    return (
        <div className={styles.container}>
            {words}
        </div>
    );
});