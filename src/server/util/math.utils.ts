export const getPrice = (value: number, weight: number): number => {
    const price: string = Math.round((value / weight) * 100).toFixed(2);
    return Number.parseFloat(price);
};
