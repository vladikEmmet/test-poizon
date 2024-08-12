import create from 'zustand';
import { GameStatusEnum } from './types/enums';
import { Constants } from './utils/constants';
import {generateWords} from "./utils/generateWords";

interface GameState {
    time: number;
    setTime: (time: number | ((prevTime: number) => number)) => void;
    status: GameStatusEnum;
    setStatus: (status: GameStatusEnum) => void;
    words: string;
    setWords: (words: string) => void;
    errors: number;
    setErrors: (errors: number) => void;
    input: string;
    setInput: (input: string | ((prev: string) => string)) => void;
    totalTyped: number;
    setTotalTyped: (totalTyped: number | ((prev: number) => number)) => void;
    currentPos: number;
    setCurrentPos: (currentPos: number | ((prev: number) => number)) => void;
}

const useGameStore = create<GameState>((set) => ({
    time: Constants.GAME_DURATION,
    setTime: (newTime) => set((state) => ({
        time: typeof newTime === 'function' ? (newTime as (prevTime: number) => number)(state.time) : newTime
    })),
    status: GameStatusEnum.NOT_STARTED,
    setStatus: (status) => set({ status }),
    words: generateWords(Constants.NUMBER_OF_WORDS),
    setWords: (words) => set({ words }),
    errors: 0,
    setErrors: (errors) => set({ errors }),
    input: '',
    // setInput: (input) => set({ input }),
    setInput: (newInput) => set((state) => ({
        input: typeof newInput === 'function' ? (newInput as (newInput: string) => string)(state.input) : newInput
    })),
    totalTyped: 0,
    // setTotalTyped: (totalTyped) => set({ totalTyped }),
    setTotalTyped: (newVal) => set((state) => ({
        totalTyped: typeof newVal === 'function' ? (newVal as (newVal: number) => number)(state.totalTyped) : newVal
    })),
    currentPos: 0,
    // setCurrentPos: (currentPos) => set({ currentPos }),
    setCurrentPos: (newVal) => set((state) => ({
        currentPos: typeof newVal === 'function' ? (newVal as (newVal: number) => number)(state.currentPos) : newVal
    })),
}));

export default useGameStore;