import calculateScore from "../src/calculateScore"

describe("calculateScore", () => {
    it("Gives maximum points for an exact match", () => {
        expect(calculateScore({
            inputCharacter: "A",
            referenceCharacter: "A",
        }).score).toEqual(1);

        expect(calculateScore({
            inputCharacter: "a",
            referenceCharacter: "a",
        }).score).toEqual(1);

        expect(calculateScore({
            inputCharacter: "é",
            referenceCharacter: "é",
        }).score).toEqual(1);
    });

    it("Gives less points for a match without accents", () => {

        expect(calculateScore({
            inputCharacter: "e",
            referenceCharacter: "é",
        }).score).toBeCloseTo(0.8);

        expect(calculateScore({
            inputCharacter: "E",
            referenceCharacter: "É",
        }).score).toBeCloseTo(0.8);
    })

    it("Gives less points for a match with uppercase/lowercase inconsistency", () => {

        expect(calculateScore({
            inputCharacter: "e",
            referenceCharacter: "E",
        }).score).toBeCloseTo(0.6);

        expect(calculateScore({
            inputCharacter: "é",
            referenceCharacter: "É",
        }).score).toBeCloseTo(0.6);
    });

    it("Gives no points for no match", () => {

        expect(calculateScore({
            inputCharacter: "A",
            referenceCharacter: "c",
        }).score).toEqual(0);

        expect(calculateScore({
            inputCharacter: "f",
            referenceCharacter: "É",
        }).score).toEqual(0);
    })
})
