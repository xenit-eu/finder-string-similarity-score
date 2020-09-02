import { MatchChunk } from './types';

export default function combineChunks(
    chunks: readonly MatchChunk[],
    newChunk: MatchChunk
): MatchChunk[] {
    if (chunks.length === 0) {
        return [newChunk];
    }
    const lastChunk = chunks[chunks.length - 1];
    if (lastChunk.matched === newChunk.matched) {
        const previousChunks = chunks.slice(0, chunks.length - 1);
        return previousChunks.concat([
            {
                text: lastChunk.text + newChunk.text,
                matched: lastChunk.matched,
            },
        ]);
    }
    return chunks.concat([newChunk]);
}
