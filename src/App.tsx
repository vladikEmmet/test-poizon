import React, {useState} from 'react';
import './App.scss';
import {Timer} from "./components/UI/Timer/Timer";
import {WordsForTypingContainer} from "./components/UI/WordsForTypingContainer/WordsForTypingContainer";
import useWatcher from "./hooks/useWatcher";
import {TypedWords} from "./components/TypedWords/TypedWords";
import {GeneratedWords} from "./components/UI/GeneratedWords/GeneratedWords";
import {Result} from "./screens/Result/Result";
import {calculateAccuracy} from "./utils/calculateAccuracy";
import {RestartButton} from "./components/UI/RestartButton/RestartButton";
import {calculateWpm} from "./utils/calculateWpm";
import {Constants} from "./utils/constants";
import {TimeSelection} from "./components/TimeSelection/TimeSelection";
import {GameStatusEnum} from "./types/enums";

function App() {
  const [time, setTime] = useState<number>(Constants.GAME_DURATION);
  const {words, input, timeLeft, errors, status, restart, totalTyped} = useWatcher(time);

  return (
    <div className="App">
        <div className="container">
            {status === GameStatusEnum.NOT_STARTED &&
                <TimeSelection
                    time={time}
                    setTime={setTime}
                    status={status}
                />
            }
            <div className="game">
                <Timer time={timeLeft} />
                <WordsForTypingContainer className='words-container'>
                    <GeneratedWords key={words} words={words} />
                    <TypedWords
                        actualWords={words}
                        input={input}
                    />
                </WordsForTypingContainer>
                <RestartButton onRestart={restart} className='repeat-btn'/>
            </div>
            <Result
                status={status}
                errors={errors}
                accuracy={calculateAccuracy(errors, totalTyped)}
                totalChars={totalTyped}
                wpm={calculateWpm(input, time)}
                onRestart={restart}
            />
        </div>
    </div>
  );
}

export default App;