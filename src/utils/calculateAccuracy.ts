export const calculateAccuracy = (errors: number, total: number) => {
    if (total > 0) {
        return ((total - errors) / total) * 100;
    }

    return 0;
};