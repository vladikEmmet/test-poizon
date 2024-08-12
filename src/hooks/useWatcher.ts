import {useCallback, useEffect} from 'react';
import useWords from './useWords';
import useTimer from './useTimer';
import useInput from './useInput';
import {GameStatusEnum} from '../types/enums';
import useGameStore from '../store';
import {Constants} from "../utils/constants";
import {countErrors} from "../utils/countErrors";

const useWatcher = (initialTime: number) => {
    // TODO: сократить объявление переменных (не для тестового)
    const setStatus = useGameStore((state) => state.setStatus);
    const status = useGameStore((state) => state.status);
    const timeLeft = useGameStore((state) => state.time);
    const setNewTime = useGameStore((state) => state.setTime);
    const setErrors = useGameStore((state) => state.setErrors);
    const input = useGameStore((state) => state.input);
    const errors = useGameStore((state) => state.errors);
    const words = useGameStore((state) => state.words);
    const currentPos = useGameStore((state) => state.currentPos);
    const totalTyped = useGameStore((state) => state.totalTyped);
    const { startTimer, resetTimer } = useTimer(initialTime);
    const { updateWords } = useWords(Constants.NUMBER_OF_WORDS);
    const { resetInput, resetTotalTyped } = useInput(status !== GameStatusEnum.FINISHED);

    const isStarting = status === GameStatusEnum.NOT_STARTED && currentPos > 0;
    const areWordsFinished = currentPos === words.length;

    // TODO: перенести логику рестарта в store.ts
    const restart = useCallback(() => {
        resetTimer();
        resetTotalTyped();
        setStatus(GameStatusEnum.NOT_STARTED);
        setErrors(0);
        updateWords();
        resetInput();
    }, [resetInput, updateWords, resetTimer, resetTotalTyped, setStatus, setErrors]);

    // Подсчитываем ошибки - разница между введенным текстом и сгенерированным (до текущей позиции)
    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, Math.min(currentPos, words.length));
        const newErrors = countErrors(input, wordsReached);
        setErrors(errors + newErrors);
    }, [input, words, currentPos, errors, setErrors]);


    // Запускаем таймер при нажатии на клавишу
    useEffect(() => {
        if (isStarting) {
            setStatus(GameStatusEnum.STARTED);
            startTimer();
        }
    }, [isStarting, startTimer, setStatus]);

    useEffect(() => {
        if (!timeLeft && status === GameStatusEnum.STARTED) {
            sumErrors();
            setStatus(GameStatusEnum.FINISHED);
        }
    }, [timeLeft, status, sumErrors, setStatus]);

    useEffect(() => {
        if (areWordsFinished) {
            sumErrors();
            updateWords();
            resetInput();
        }
    }, [resetInput, areWordsFinished, updateWords, sumErrors]);

    // Для настройки времени
    useEffect(() => {
        setNewTime(initialTime);
    }, [initialTime, setNewTime]);

    return { status, words, input, errors, restart, timeLeft, totalTyped };
};

export default useWatcher;

