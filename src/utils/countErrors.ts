export const countErrors = (toEqual: string, expected: string) => {
    const expectedChars = expected.split('');

    return expectedChars.reduce((err, char, idx) => {
        const actualChar = toEqual[idx];
        if(actualChar !== char) err++;

        return err;
    }, 0)
}