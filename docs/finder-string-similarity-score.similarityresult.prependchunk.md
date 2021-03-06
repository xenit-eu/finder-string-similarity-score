<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/finder-string-similarity-score](./finder-string-similarity-score.md) &gt; [SimilarityResult](./finder-string-similarity-score.similarityresult.md) &gt; [prependChunk](./finder-string-similarity-score.similarityresult.prependchunk.md)

## SimilarityResult.prependChunk() function

Prepends a chunk to a similarity result

This adds an additional matching or non-matching chunk in front of the existing result without changing the calculated score

<b>Signature:</b>

```typescript
function prependChunk(result: SimilarityResult, chunk: MatchChunk): SimilarityResult;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  result | SimilarityResult | The similarity result to prepend a chunk to |
|  chunk | [MatchChunk](./finder-string-similarity-score.matchchunk.md) | The chunk to prepend |

<b>Returns:</b>

SimilarityResult

