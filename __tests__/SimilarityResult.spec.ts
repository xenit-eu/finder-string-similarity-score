import SimilarityResult from '../src/SimilarityResult';

const emptySimilarity: SimilarityResult = {
    score: 0,
    chunks: [],
};

const oneChunkSimilarity: SimilarityResult = {
    score: 0.4,
    chunks: [
        {
            matched: true,
            text: 'AAA',
        },
    ],
};

const twoChunkSimilarity: SimilarityResult = {
    score: 0.2,
    chunks: [
        {
            matched: false,
            text: 'AAA',
        },
        {
            matched: true,
            text: 'BBB',
        },
    ],
};

describe('SimilarityResult', () => {
    describe('#prependChunk()', () => {
        it('Prepends a chunk to an empty result', () => {
            const result = SimilarityResult.prependChunk(emptySimilarity, {
                matched: true,
                text: 'ABC',
            });
            expect(result.score).toEqual(0);
            expect(result.chunks).toEqual([{ matched: true, text: 'ABC' }]);
        });
        it('Prepends a chunk to a result with same matched', () => {
            const result = SimilarityResult.prependChunk(oneChunkSimilarity, {
                matched: true,
                text: 'ABC',
            });
            expect(result.chunks).toEqual([{ matched: true, text: 'ABCAAA' }]);
        });
        it('Prepends a chunk to a result with different matched', () => {
            const result = SimilarityResult.prependChunk(twoChunkSimilarity, {
                matched: true,
                text: 'ABC',
            });
            expect(result.chunks).toEqual([
                { matched: true, text: 'ABC' },
                { matched: false, text: 'AAA' },
                { matched: true, text: 'BBB' },
            ]);
        });
    });
    describe('#appendChunk()', () => {
        it('Appends a chunk to an empty result', () => {
            const result = SimilarityResult.appendChunk(emptySimilarity, {
                matched: true,
                text: 'ABC',
            });
            expect(result.score).toEqual(0);
            expect(result.chunks).toEqual([{ matched: true, text: 'ABC' }]);
        });
        it('Appends a chunk to a result with same matched', () => {
            const result = SimilarityResult.appendChunk(oneChunkSimilarity, {
                matched: true,
                text: 'ABC',
            });
            expect(result.chunks).toEqual([{ matched: true, text: 'AAAABC' }]);
        });
        it('Appends a chunk to a result with different matched', () => {
            const result = SimilarityResult.appendChunk(twoChunkSimilarity, {
                matched: false,
                text: 'ABC',
            });
            expect(result.chunks).toEqual([
                { matched: false, text: 'AAA' },
                { matched: true, text: 'BBB' },
                { matched: false, text: 'ABC' },
            ]);
        });
    });

    describe('#withScore()', () => {
        it('Replaces score of an existing result', () => {
            const result = SimilarityResult.withScore(emptySimilarity, 1.5);
            expect(result.score).toBe(1.5);
        });

        it('Calculates score based on existing score', () => {
            const result = SimilarityResult.withScore(
                twoChunkSimilarity,
                s => s * 5
            );
            expect(result.score).toBe(1);
        });
    });
});
