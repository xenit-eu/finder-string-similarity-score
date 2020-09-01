export interface SimilarityOpts {
    readonly keepAccents?: boolean;
}

export interface SimilarityResult {
    readonly score: number;
    readonly chunks: readonly MatchChunk[];
}

export interface MatchChunk {
    readonly text: string;
    readonly matched: boolean;
}

export interface ScoreContext {
    readonly inputCharacter: string;
    readonly referenceCharacter: string;
}

export interface ScoreResult {
    readonly score: number;
    readonly match: boolean;
}
