import scoreStringSimilarity from "../src/scoreStringSimilarity"

describe("scoreStringSimilarity", () => {
    it("Creates chunks for matching letters", () => {
        const match = scoreStringSimilarity("dfg", "abcdefghi");

        expect(match.score).toBeLessThan(1);

        expect(match.chunks).toEqual([
            { text: "abc", matched: false },
            { text: "d", matched: true },
            { text: "e", matched: false },
            { text: "fg", matched: true },
            { text: "hi", matched: false },
        ])
    });

    it("Gives a score of 1 for a full exact match", () => {
        const match = scoreStringSimilarity("abcdefghi", "abcdefghi");
        expect(match.score).toBeCloseTo(1);
        expect(match.chunks).toEqual([
            {
                text: "abcdefghi",
                matched: true
            }
        ]);
    });

    it("Gives a score of 0 for a non-match", () => {
        const match = scoreStringSimilarity("xy", "abcdefghi");
        expect(match.score).toBeCloseTo(0);
        expect(match.chunks).toEqual([
            {
                text: "abcdefghi",
                matched: false
            }
        ]);

    })

    it("Rates a shorter exact match higher than a longer partial match", () => {
        const exactMatch = scoreStringSimilarity("aaac", "aaac");
        const partialMatch = scoreStringSimilarity("aaa aaa aaa", "aaa aaa aaa c");

        expect(exactMatch.score).toBeGreaterThan(partialMatch.score);
    });

    it("Rates a longer partial match higher than a shorter partial match", () => {
        const longPartialMatch = scoreStringSimilarity("abcdef", "abcdefgh");
        const shortPartialMatch = scoreStringSimilarity("abc", "abcdefgh");

        expect(longPartialMatch.score).toBeGreaterThan(shortPartialMatch.score);
    });

    it("Rates a match at the start of the string higher than a match in the middle of the string", () => {
        const startPartialMatch = scoreStringSimilarity("abc", "abcdefgh");
        const middlePartialMatch = scoreStringSimilarity("def", "abcdefgh");

        expect(startPartialMatch.score).toBeGreaterThan(middlePartialMatch.score);
    });

    it("Rates a contiguous match higher than a match on different parts of the string", () => {
        const contiguousMatch = scoreStringSimilarity("defg", "abcdefgh");
        const nonContiguousMatch = scoreStringSimilarity("degh", "abcdefgh");
        expect(contiguousMatch.score).toBeGreaterThan(nonContiguousMatch.score);
    })

    it("Penalizes a string that has tailing non-matching characters", () => {
        const matchingChars = scoreStringSimilarity("cde", "abcdefgh");
        const nonMatchingChars = scoreStringSimilarity("cdea", "abcdefgh");

        expect(matchingChars.score).toBeGreaterThan(nonMatchingChars.score);
    })
    it("Penalizes a string that has starting non-matching characters", () => {
        const matchingChars = scoreStringSimilarity("cde", "abcdefgh");
        const nonMatchingChars = scoreStringSimilarity("xcde", "abcdefgh");

        expect(matchingChars.score).toBeGreaterThan(nonMatchingChars.score);
    })

    it("Gives a similar score penalty for non-matching characters in the start as in the end", () => {
        const startMismatch = scoreStringSimilarity("xcde", "abcdefgh");
        const endMismatch = scoreStringSimilarity("cdex", "abcdefgh");

        expect(startMismatch.score).toBeCloseTo(endMismatch.score);
    })

})
