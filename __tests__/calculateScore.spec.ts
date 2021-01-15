import calculateScore from '../src/calculateScore';

describe('calculateScore', () => {
    it('Gives maximum points for an exact match', () => {
        expect(calculateScore('A', 'A').score).toEqual(1);

        expect(calculateScore('a', 'a').score).toEqual(1);

        expect(calculateScore('é', 'é').score).toEqual(1);
    });

    it('Gives less points for a match without accents', () => {
        expect(calculateScore('e', 'é').score).toBeCloseTo(0.98);

        expect(calculateScore('E', 'É').score).toBeCloseTo(0.98);
    });

    it('Gives less points for a match with uppercase/lowercase inconsistency', () => {
        expect(calculateScore('e', 'E').score).toBeCloseTo(0.95);

        expect(calculateScore('é', 'É').score).toBeCloseTo(0.95);
    });

    it('Gives no points for no match', () => {
        expect(calculateScore('A', 'c').score).toEqual(0);

        expect(calculateScore('f', 'É').score).toEqual(0);
    });
});
