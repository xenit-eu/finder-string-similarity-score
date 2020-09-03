import { ScoreResult, SimilarityOpts } from './types';
import { normalizeSync as removeAccents } from 'normalize-diacritics';

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
            score: 0.8,
            match: true,
        };
    }
    // Match, not including case
    if (inputChar.toLowerCase() === referenceChar.toLowerCase()) {
        return {
            score: 0.6,
            match: true,
        };
    }

    return {
        score: 0,
        match: false,
    };
}
