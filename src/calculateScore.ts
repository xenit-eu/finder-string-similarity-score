import { ScoreResult, SimilarityOpts } from './types';
import { normalizeSync as removeAccents } from 'normalize-diacritics';

/**
 * Calculates the score for how well an input character matches a reference character
 * @param inputCharacter - Input character
 * @param referenceCharacter - Reference character
 * @param opts - Additional options for comparison
 * @internal
 */
export default function calculateScore(
    inputCharacter: string,
    referenceCharacter: string,
    opts: SimilarityOpts = {}
): ScoreResult {
    // Exact match, including accents and case
    if (inputCharacter === referenceCharacter) {
        return {
            score: 1,
            match: true,
        };
    }

    const inputChar = opts.keepAccents
        ? inputCharacter
        : removeAccents(inputCharacter);
    const referenceChar = opts.keepAccents
        ? referenceCharacter
        : removeAccents(referenceCharacter);
    // Exact match, including case
    if (inputChar === referenceChar) {
        return {
            score: 0.98,
            match: true,
        };
    }
    // Match, not including case
    if (inputChar.toLowerCase() === referenceChar.toLowerCase()) {
        return {
            score: 0.95,
            match: true,
        };
    }

    return {
        score: 0,
        match: false,
    };
}
