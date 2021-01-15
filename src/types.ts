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
