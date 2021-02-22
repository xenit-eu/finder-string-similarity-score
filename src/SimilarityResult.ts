import combineChunks from './combineChunks';

/**
 * A chunk of the reference string that matched or not
 * @public
 */
export interface MatchChunk {
    /**
     * Piece of text of the reference string
     */
    readonly text: string;

    /**
     * Flag that indicates if this piece of text is matched by the input string
     */
    readonly matched: boolean;
}

/**
 * Result from a similarity comparison
 * @public
 */
interface SimilarityResult {
    /**
     * Normalized score between 0 and 1 that indicates the similarity between strings
     */
    readonly score: number;
    /**
     * Chunks of the reference string that are (not) matched by the input string
     */
    readonly chunks: readonly MatchChunk[];
}

/**
 * @public
 */
namespace SimilarityResult {
    /**
     * Prepends a chunk to a similarity result
     *
     * This adds an additional matching or non-matching chunk in front of the existing result without changing the calculated score
     * @param result - The similarity result to prepend a chunk to
     * @param chunk - The chunk to prepend
     */
    export function prependChunk(
        result: SimilarityResult,
        chunk: MatchChunk
    ): SimilarityResult {
        return {
            score: result.score,
            chunks: [chunk, ...result.chunks].reduce(combineChunks, []),
        };
    }

    /**
     * Appends a chunk to a similarity result
     *
     * This adds an additional matching or non-matching chunk at the end of the existing result without changing the calculated score
     * @param result - The similarity result to append a chunk to
     * @param chunk - The chunk to append
     */
    export function appendChunk(
        result: SimilarityResult,
        chunk: MatchChunk
    ): SimilarityResult {
        return {
            score: result.score,
            chunks: combineChunks(result.chunks, chunk),
        };
    }

    /**
     * Updates the score of a similarity result
     *
     * @param result - The similarity result to change the score for
     * @param score - The new score for the similarity result, or a function to calculate a new score from the current score
     */
    export function withScore(
        result: SimilarityResult,
        score: number | ((currentScore: number) => number)
    ): SimilarityResult {
        const newScore =
            score instanceof Function ? score(result.score) : score;
        return {
            score: newScore,
            chunks: result.chunks,
        };
    }
}

export default SimilarityResult;
