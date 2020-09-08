import { SimilarityOpts, SimilarityResult, MatchChunk } from './types';
import calculateScore from './calculateScore';
import combineChunks from './combineChunks';
import debug from 'debug';

const d = debug('xenit:finder-string-similarity-score');

function scanForNextPosition(
    inputData: string,
    referenceData: string,
    inputPosition: number,
    referencePosition: number,
    opts: SimilarityOpts
): [number, number] {
    let bestPosition: [number, number] = [
        inputData.length,
        referenceData.length,
    ];
    for (
        let newReferencePosition = referencePosition;
        newReferencePosition < referenceData.length;
        newReferencePosition++
    ) {
        for (
            let newInputPosition = inputPosition;
            newInputPosition < inputData.length;
            newInputPosition++
        ) {
            if (
                newReferencePosition + newInputPosition <
                bestPosition[0] + bestPosition[1]
            ) {
                const { match } = calculateScore(
                    inputData[newInputPosition],
                    referenceData[newReferencePosition],
                    opts
                );
                if (match) {
                    bestPosition = [newInputPosition, newReferencePosition];
                }
            }
        }
    }
    return bestPosition;
}

export default function scoreStringSimilarity(
    inputData: string,
    referenceData: string,
    opts: SimilarityOpts = {}
): SimilarityResult {
    d(
        'Scoring similarity for input %o and reference %o',
        inputData,
        referenceData
    );
    if (inputData.length > referenceData.length) {
        d(
            'Input %o is longer than reference %o, returning score of 0',
            inputData,
            referenceData
        );
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

    let [inputPosition, referencePosition] = scanForNextPosition(
        inputData,
        referenceData,
        0,
        0,
        opts
    );

    if (referencePosition > 0) {
        chunks.push({
            text: referenceData.slice(0, referencePosition),
            matched: false,
        });
    }

    let totalSkippedInputCharacters = inputPosition;
    let totalSkippedReferenceCharacters = referencePosition;

    while (
        inputPosition < inputData.length &&
        referencePosition < referenceData.length
    ) {
        const { score: currentScore, match } = calculateScore(
            inputData[inputPosition],
            referenceData[referencePosition],
            opts
        );

        // Decrease score when start of string does not match
        score +=
            (currentScore / referenceData.length) *
            Math.pow(0.9, totalSkippedReferenceCharacters);

        if (match) {
            chunks.push({
                text: referenceData[referencePosition],
                matched: true,
            });
            inputPosition++;
            referencePosition++;
        } else {
            const [
                nextInputPosition,
                nextReferencePosition,
            ] = scanForNextPosition(
                inputData,
                referenceData,
                inputPosition,
                referencePosition,
                opts
            );

            chunks.push({
                text: referenceData.slice(
                    referencePosition,
                    nextReferencePosition
                ),
                matched: false,
            });

            totalSkippedInputCharacters += nextInputPosition - inputPosition;
            totalSkippedReferenceCharacters +=
                nextReferencePosition - referencePosition;

            inputPosition = nextInputPosition;
            referencePosition = nextReferencePosition;
        }
    }

    totalSkippedInputCharacters += inputData.length - inputPosition;

    // decrease score for skipped input characters
    score *= Math.pow(0.9, totalSkippedInputCharacters);

    // When we ran out of characters in the input string, we still need to add the last part of the reference to the matches
    if (referencePosition < referenceData.length) {
        chunks.push({
            text: referenceData.slice(referencePosition),
            matched: false,
        });
    }

    const combinedChunks = chunks.reduce(combineChunks, []);

    // Add a penalty when multiple chunks have matched.
    // This means that the input string is spread a bit over the whole reference string
    const nonContiguousPenalty = Math.pow(
        0.9,
        combinedChunks.filter(c => c.matched).length - 1
    );

    score *= nonContiguousPenalty;

    d(
        'Final score comparing input %o to reference %o: %d',
        inputData,
        referenceData,
        score
    );
    return {
        score: score,
        chunks: combinedChunks,
    };
}
