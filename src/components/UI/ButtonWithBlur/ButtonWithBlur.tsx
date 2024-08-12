import React, {forwardRef, useRef} from 'react';
import {Button} from "../Button/Button";

interface ButtonWithBlurProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// Для предотвращения потери фокуса при клике на кнопку
export const ButtonWithBlur = forwardRef<HTMLButtonElement, ButtonWithBlurProps>(({onClick, ...props}, ref) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const combinedRef = ref || localRef;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (combinedRef && 'current' in combinedRef && combinedRef.current) {
            combinedRef.current.blur();
        }
        if (onClick) {
            onClick(event);
        }
    }

    return (
        <Button {...props} tabIndex={-1} onClick={handleClick} ref={combinedRef} />
    );
});

ButtonWithBlur.displayName = 'ButtonWithBlur';
