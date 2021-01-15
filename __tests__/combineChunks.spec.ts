import combineChunks from '../src/combineChunks';

describe('combineChunks', () => {
    it('Combines chunks with the same matching value', () => {
        const combined = combineChunks(
            [
                {
                    matched: true,
                    text: 'abc',
                },
            ],
            {
                matched: true,
                text: 'def',
            }
        );

        expect(combined).toEqual([
            {
                matched: true,
                text: 'abcdef',
            },
        ]);
    });
    it('Does not combine chunks with different matching value', () => {
        const combined = combineChunks(
            [
                {
                    matched: false,
                    text: 'abc',
                },
            ],
            {
                matched: true,
                text: 'def',
            }
        );

        expect(combined).toEqual([
            {
                matched: false,
                text: 'abc',
            },
            {
                matched: true,
                text: 'def',
            },
        ]);
    });
    it('Works when combining with an empty chunk array', () => {
        const combined = combineChunks([], { matched: true, text: 'def' });
        expect(combined).toEqual([
            {
                matched: true,
                text: 'def',
            },
        ]);
    });
    it('Combines multiple chunks with reduce', () => {
        const chunks = [
            { text: 'a', matched: false },
            { text: 'b', matched: false },
            { text: 'c', matched: false },
            { text: 'd', matched: true },
            { text: 'e', matched: false },
            { text: 'f', matched: true },
            { text: 'g', matched: true },
            { text: 'h', matched: false },
            { text: 'i', matched: false },
        ];

        const combined = chunks.reduce(combineChunks, []);

        expect(combined).toEqual([
            { text: 'abc', matched: false },
            { text: 'd', matched: true },
            { text: 'e', matched: false },
            { text: 'fg', matched: true },
            { text: 'hi', matched: false },
        ]);
    });
});
