<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@xenit/finder-string-similarity-score](./finder-string-similarity-score.md) &gt; [SimilarityResult](./finder-string-similarity-score.similarityresult.md) &gt; [withScore](./finder-string-similarity-score.similarityresult.withscore.md)

## SimilarityResult.withScore() function

Updates the score of a similarity result

<b>Signature:</b>

```typescript
function withScore(result: SimilarityResult, score: number | ((currentScore: number) => number)): SimilarityResult;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  result | SimilarityResult | The similarity result to change the score for |
|  score | number \| ((currentScore: number) =&gt; number) | The new score for the similarity result, or a function to calculate a new score from the current score |

<b>Returns:</b>

SimilarityResult
