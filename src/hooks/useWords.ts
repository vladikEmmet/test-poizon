// import {useCallback, useState} from "react";
// import {generateWords} from "../utils/generateWords";
//
// const useWords = (amount: number) => {
//     const [words, setWords] = useState(generateWords(amount));
//
//     const update = useCallback(() => {
//         setWords(generateWords(amount));
//     }, [amount]);
//
//     return {words, updateWords: update};
// }
//
// export default useWords;

import {useCallback} from "react";
import useGameStore from "../store";
import {generateWords} from "../utils/generateWords";

const useWords = (amount: number) => {
    const setWords = useGameStore((state) => state.setWords);

    const update = useCallback(() => {
        setWords(generateWords(amount));
    }, [amount]);

    return {updateWords: update};
}

export default useWords;