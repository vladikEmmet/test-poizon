import React, {FC} from 'react';
import {ButtonWithBlur} from "../ButtonWithBlur/ButtonWithBlur";
import { BsArrowRepeat } from "react-icons/bs";

interface RestartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onRestart: () => void;
}

export const RestartButton: FC<RestartButtonProps> = React.memo(({onRestart, ...props}) => {
    return (
        <ButtonWithBlur onClick={onRestart} {...props}>
            <BsArrowRepeat />
        </ButtonWithBlur>
    );
});