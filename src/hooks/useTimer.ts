import { useCallback, useEffect, useRef } from 'react';
import useGameStore from '../store';

const useTimer = (initialTimeInSeconds: number) => {
    const setTime = useGameStore((state) => state.setTime);
    const time = useGameStore((state) => state.time);
    const timerRef = useRef<NodeJS.Timer | null>(null);
    const isStarted = timerRef.current !== null;
    const isTimeout = time <= 0;

    const startTimer = useCallback(() => {
        if (!isStarted && !isTimeout) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => (prevTime as number) - 1); // Обновляем время
            }, 1000);
        }
    }, [isStarted, isTimeout, setTime]);

    const reset = useCallback(() => {
        clearInterval(timerRef.current as NodeJS.Timer);
        timerRef.current = null;
        setTime(initialTimeInSeconds);
    }, [initialTimeInSeconds, setTime]);

    useEffect(() => {
        if (isTimeout) {
            clearInterval(timerRef.current as NodeJS.Timer);
            timerRef.current = null;
        }
    }, [isTimeout]);

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current as NodeJS.Timer);
        };
    }, []);

    return { timeLeft: time, startTimer, resetTimer: reset };
};

export default useTimer;