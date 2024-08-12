export const isValidKeyboardCode = (code: string) => {
    return code.startsWith('Key') || code.startsWith('Digit') || code === "Backspace" || code === "Space" || code === "-";
}