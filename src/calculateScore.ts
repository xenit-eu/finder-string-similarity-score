import { ScoreContext, ScoreResult, SimilarityOpts } from './types';
import { normalizeSync as removeAccents } from 'normalize-diacritics';

export default function calculateScore(
    scoreContext: ScoreContext,
    opts: SimilarityOpts = {}
): ScoreResult {
    // Exact match, including accents and case
    if (scoreContext.inputCharacter === scoreContext.referenceCharacter) {
        return {
            score: 1,
            match: true,
        };
    }

    const inputChar = opts.keepAccents
        ? scoreContext.inputCharacter
        : removeAccents(scoreContext.inputCharacter);
    const referenceChar = opts.keepAccents
        ? scoreContext.referenceCharacter
        : removeAccents(scoreContext.referenceCharacter);
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
