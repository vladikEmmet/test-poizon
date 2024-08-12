import {useCallback, useEffect, useState} from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import {Constants} from "../utils/constants";
import useInput from "./useInput";
import {GameStatusEnum} from "../types/enums";
import {countErrors} from "../utils/countErrors";

const useWatcher =
    (initialTime: number) => {
        const [status, setStatus] = useState<GameStatusEnum>(GameStatusEnum.NOT_STARTED);
        const { timeLeft, startTimer, resetTimer, setNewTime } = useTimer(initialTime);
        const { words, updateWords } = useWords(Constants.NUMBER_OF_WORDS);
        const { currentPos, input, totalTyped, resetInput, resetTotalTyped } = useInput(status !== GameStatusEnum.FINISHED);
        const [errors, setErrors] = useState(0);
        const isStarting = status === GameStatusEnum.NOT_STARTED && currentPos > 0;
        const areWordsFinished = currentPos === words.length;

        const restart = useCallback(() => {
            resetTimer();
            resetTotalTyped();
            setStatus(GameStatusEnum.NOT_STARTED);
            setErrors(0);
            updateWords();
            resetInput();
        }, [resetInput, updateWords, resetTimer, resetTotalTyped]);

        const sumErrors = useCallback(() => {
            const wordsReached = words.substring(0, Math.min(currentPos, words.length));
            setErrors((prevErrors) => prevErrors + countErrors(input, wordsReached));
        }, [input, words, currentPos]);

        useEffect(() => {
            if (isStarting) {
                setStatus(GameStatusEnum.STARTED);
                startTimer();
            }
        }, [isStarting, startTimer]);

        useEffect(() => {
            if (!timeLeft && status === GameStatusEnum.STARTED) {
                setStatus(GameStatusEnum.FINISHED);
                sumErrors();
            }
        }, [timeLeft, status, sumErrors]);

        useEffect(() => {
            if (areWordsFinished) {
                sumErrors();
                updateWords();
                resetInput();
            }
        }, [resetInput, areWordsFinished, updateWords, sumErrors]);

        useEffect(() => {
            setNewTime(initialTime);
        }, [initialTime, setNewTime]);

        return { status, words, input, errors, restart, timeLeft, totalTyped };
     };

export default useWatcher;
