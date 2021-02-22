import { SimilarityOpts } from './types';
import SimilarityResult, { MatchChunk } from './SimilarityResult';
import calculateScore from './calculateScore';
import combineChunks from './combineChunks';
import { normalizeSync as removeAccents } from 'normalize-diacritics';
import debug from 'debug';

const d = debug('xenit:finder-string-similarity-score');

/**
 * Calculates a similarity between the an input and a reference string
 * @param inputData - Input data to compare against the reference
 * @param referenceData - Reference string to compare the input against
 * @param opts - Additional options for calculating a score
 *
 * @public
 */
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

    const normalizedInputData = removeAccents(inputData);
    const normalizedReferenceData = removeAccents(referenceData);

    const startIndex = normalizedReferenceData.indexOf(normalizedInputData);

    if (startIndex >= 0) {
        chunks.push({
            matched: false,
            text: referenceData.slice(0, startIndex),
        });

        for (
            let i = startIndex, j = 0;
            i < normalizedReferenceData.length &&
            j < normalizedInputData.length;
            i++, j++
        ) {
            const { score: currentScore, match } = calculateScore(
                inputData[j],
                referenceData[i],
                opts
            );
            chunks.push({
                text: referenceData[i],
                matched: match,
            });
            // Decrease score when start of string does not match
            score +=
                (currentScore / referenceData.length) *
                Math.pow(0.9, startIndex);
        }

        chunks.push({
            matched: false,
            text: referenceData.slice(startIndex + normalizedInputData.length),
        });
    } else {
        chunks.push({
            matched: false,
            text: referenceData,
        });
    }

    const combinedChunks = chunks.reduce(combineChunks, []);

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
