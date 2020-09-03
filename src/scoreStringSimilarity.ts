import { SimilarityOpts, SimilarityResult, MatchChunk } from './types';
import calculateScore from './calculateScore';
import combineChunks from './combineChunks';

export default function scoreStringSimilarity(
    inputData: string,
    referenceData: string,
    opts: SimilarityOpts = {}
): SimilarityResult {
    if (inputData.length > referenceData.length) {
        // If input is longer than the reference to compare to, it does not match
        return {
            score: 0,
            chunks: [
                {
                    text: referenceData,
                    matched: false,
                },
            ],
        };
    }

    let score = 0;
    const chunks: MatchChunk[] = [];
    let inputPosition = 0;
    let referencePosition = 0;

    while (
        inputPosition < inputData.length &&
        referencePosition < referenceData.length
    ) {
        const { score: currentScore, match } = calculateScore(
            {
                inputCharacter: inputData[inputPosition],
                referenceCharacter: referenceData[referencePosition],
            },
            opts
        );

        score += currentScore;

        chunks.push({
            text: referenceData[referencePosition],
            matched: match,
        });
        if (match) {
            inputPosition++;
        }
        referencePosition++;
    }

    // Decrease score for non-matching characters
    score -= Math.min(
        score,
        (inputData.length - inputPosition) / inputData.length
    );

    // When we ran out of characters in the input string, we still need to add the last part of the reference to the matches
    if (referencePosition < referenceData.length) {
        chunks.push({
            text: referenceData.slice(referencePosition),
            matched: false,
        });
    }

    const combinedChunks = chunks.reduce(combineChunks, []);

    // Start of the string has matched, boost score a bit
    if (combinedChunks[0].matched) {
        score += combinedChunks[0].text.length / inputData.length;
    }

    // Add a penalty when multiple chunks have matched.
    // This means that the input string is spread a bit over the whole reference string
    const nonContiguousPenalty = Math.pow(
        0.9,
        combinedChunks.filter(c => c.matched).length - 1
    );

    return {
        score: (score * nonContiguousPenalty) / (referenceData.length + 1), // +1 to counterbalance score boost for start of string match
        chunks: combinedChunks,
    };
}
