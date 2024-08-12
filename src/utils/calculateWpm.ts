export const calculateWpm = (text: string, time: number) => {
    const words = text.split(' ').length;
    const minutes = time / 60;
    return Math.round(words / minutes);
}