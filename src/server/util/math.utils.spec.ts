import { getPrice } from './math.utils';
describe('math utils', () => {
    it('should calculate price', () => {
        expect(getPrice(1, 1)).toEqual(100);
    });

    it('should calculate price 1', () => {
        expect(getPrice(123.1232, 11.22)).toEqual(1097);
    });

    it('should calculate price 2', () => {
        expect(getPrice(223, 123213312.2)).toEqual(0);
    });
});
