import { useCallback, useEffect, useRef, useState } from "react";
import {isValidKeyboardCode} from "../utils/isValidKeyboardCode";

const useInput = (isActive: boolean) => {
    const [currentPos, setCurrentPos] = useState<number>(0);
    const [input, setInput] = useState("");
    const total = useRef(0);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isActive || !isValidKeyboardCode(e.code)) {
                return;
            }

            switch (e.key) {
                case "Backspace":
                    setInput((prev) => prev.slice(0, -1));
                    setCurrentPos((cursor) => cursor - 1);
                    total.current -= 1;
                    break;
                default:
                    setInput((prev) => prev.concat(e.key));
                    setCurrentPos((cursor) => cursor + 1);
                    total.current += 1;
            }
        },
        [isActive]
    );

    const reset = useCallback(() => {
        setInput("");
        setCurrentPos(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        total.current = 0;
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return {
        input,
        currentPos,
        resetInput: reset,
        resetTotalTyped,
        totalTyped: total.current,
    };
};

export default useInput;