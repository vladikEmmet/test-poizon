// import { useCallback, useEffect, useRef, useState } from "react";
// import {isValidKeyboardCode} from "../utils/isValidKeyboardCode";
//
// const useInput = (isActive: boolean) => {
//     const [currentPos, setCurrentPos] = useState<number>(0);
//     const [input, setInput] = useState("");
//     const total = useRef(0);
//
//     const onKeyDown = useCallback(
//         (e: KeyboardEvent) => {
//             if (!isActive || !isValidKeyboardCode(e.code)) {
//                 return;
//             }
//
//             switch (e.key) {
//                 case "Backspace":
//                     setInput((prev) => prev.slice(0, -1));
//                     setCurrentPos((cursor) => cursor - 1);
//                     total.current -= 1;
//                     break;
//                 default:
//                     setInput((prev) => prev.concat(e.key));
//                     setCurrentPos((cursor) => cursor + 1);
//                     total.current += 1;
//             }
//         },
//         [isActive]
//     );
//
//     const reset = useCallback(() => {
//         setInput("");
//         setCurrentPos(0);
//     }, []);
//
//     const resetTotalTyped = useCallback(() => {
//         total.current = 0;
//     }, []);
//
//     useEffect(() => {
//         window.addEventListener("keydown", onKeyDown);
//         return () => {
//             window.removeEventListener("keydown", onKeyDown);
//         };
//     }, [onKeyDown]);
//
//     return {
//         input,
//         currentPos,
//         resetInput: reset,
//         resetTotalTyped,
//         totalTyped: total.current,
//     };
// };

// export default useInput;

import {useCallback, useEffect} from "react";
import useGameStore from "../store";
import {isValidKeyboardCode} from "../utils/isValidKeyboardCode";

const useInput = (isActive: boolean) => {
    const currentPos = useGameStore((state) => state.currentPos);
    const setCurrentPos = useGameStore((state) => state.setCurrentPos);
    const input = useGameStore((state) => state.input);
    const setInput = useGameStore((state) => state.setInput);
    const totalTyped = useGameStore((state) => state.totalTyped);
    const setTotalTyped = useGameStore((state) => state.setTotalTyped);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isActive || !isValidKeyboardCode(e.code)) {
                return;
            }

            switch (e.key) {
                case "Backspace":
                    setInput((prev) => prev.slice(0, -1));
                    setCurrentPos((cursor) => cursor - 1);
                    setTotalTyped(prev => prev - 1)
                    break;
                default:
                    setInput((prev) => prev.concat(e.key));
                    setCurrentPos((cursor) => cursor + 1);
                    setTotalTyped(prev => prev + 1);
            }
        },
        [isActive]
    );

    const reset = useCallback(() => {
        setInput("");
        setCurrentPos(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        setTotalTyped(0);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return {
        resetInput: reset,
        resetTotalTyped,
    };
}

export default useInput;