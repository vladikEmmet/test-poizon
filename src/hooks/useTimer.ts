import {useCallback, useEffect, useRef, useState} from "react";

const useTimer = (initialTimeInSeconds: number) => {
    const [time, setTime] = useState(initialTimeInSeconds);
    const timerRef = useRef<NodeJS.Timer | null>(null);
    const isStarted = timerRef.current !== null;
    const isTimeout = time <= 0;

    const startTimer = useCallback(() => {
        if(!isStarted && !isTimeout) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
    }, [isStarted, isTimeout, setTime]);

    const reset = useCallback(() => {
        clearInterval(timerRef.current as NodeJS.Timer);
        timerRef.current = null;
        setTime(initialTimeInSeconds);
    }, [initialTimeInSeconds]);

    useEffect(() => {
        if(isTimeout) {
            clearInterval(timerRef.current as NodeJS.Timer);
            timerRef.current = null;
        }
    }, [isTimeout]);

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current as NodeJS.Timer);
        }
    }, []);

    const setNewTime = useCallback((newTime: number) => {
        setTime(newTime);
    }, []);

    return {timeLeft: time, startTimer, resetTimer: reset, setNewTime};
}

export default useTimer;