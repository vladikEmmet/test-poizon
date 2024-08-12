import {useCallback, useState} from "react";
import {generateWords} from "../utils/generateWords";

const useWords = (amount: number) => {
    const [words, setWords] = useState(generateWords(amount));

    const update = useCallback(() => {
        setWords(generateWords(amount));
    }, [amount]);

    return {words, updateWords: update};
}

export default useWords;