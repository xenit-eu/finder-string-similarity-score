/**
 * Options for comparing string similarity
 * @public
 */
export interface SimilarityOpts {
    /**
     * If accents in the input and reference strings are significant
     */
    readonly keepAccents?: boolean;
}

/**
 * Result from a similarity comparison
 * @public
 */
export interface SimilarityResult {
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
 * Result of comparing a piece of input string to a piece of reference string
 * @internal
 */
export interface ScoreResult {
    /**
     * Normalized score between 0 and 1 assigned to this comparison
     */
    readonly score: number;
    /**
     * Whether this comparison should be regarded as a match or not
     */
    readonly match: boolean;
}
