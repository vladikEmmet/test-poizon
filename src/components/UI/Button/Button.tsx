import React, {forwardRef} from 'react';
import cn from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, ...props}, ref) => {
    return (
        <button
            className={cn(styles.button, className)}
            ref={ref}
            {...props}
        >
            {props.children}
        </button>
    );
});

Button.displayName = 'Button';
