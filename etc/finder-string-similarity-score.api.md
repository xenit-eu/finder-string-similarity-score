## API Report File for "@xenit/finder-string-similarity-score"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export interface MatchChunk {
    readonly matched: boolean;
    readonly text: string;
}

// @public
function scoreStringSimilarity(inputData: string, referenceData: string, opts?: SimilarityOpts): SimilarityResult;

export default scoreStringSimilarity;

// @public
export interface SimilarityOpts {
    readonly keepAccents?: boolean;
}

// @public
export interface SimilarityResult {
    readonly chunks: readonly MatchChunk[];
    readonly score: number;
}


// (No @packageDocumentation comment for this package)

```