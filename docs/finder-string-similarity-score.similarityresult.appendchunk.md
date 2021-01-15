<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/finder-string-similarity-score](./finder-string-similarity-score.md) &gt; [SimilarityResult](./finder-string-similarity-score.similarityresult.md) &gt; [appendChunk](./finder-string-similarity-score.similarityresult.appendchunk.md)

## SimilarityResult.appendChunk() function

Appends a chunk to a similarity result

This adds an additional matching or non-matching chunk at the end of the existing result without changing the calculated score

<b>Signature:</b>

```typescript
function appendChunk(result: SimilarityResult, chunk: MatchChunk): SimilarityResult;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  result | SimilarityResult | The similarity result to append a chunk to |
|  chunk | [MatchChunk](./finder-string-similarity-score.matchchunk.md) | The chunk to append |

<b>Returns:</b>

SimilarityResult
