import { MatchChunk } from './SimilarityResult';

/**
 * Adds a new chunk to the end of the list of chunks
 *
 * If the last existing chunk and the newly added chunk both match or not match, they are merged into one chunk
 * @param chunks - Existing list of chunks
 * @param newChunk - New chunk to add to the end of the chunks list
 * @internal
 */
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
