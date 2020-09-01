# String similarity score

Calculates a similarity score between two strings (primarily for the purpose of autocomplete)

## Functions

### `scoreStringSimilarity`

Calculates a similarity score between two strings.

The first parameter is typically a user input string, the second parameter is the reference string.

```typescript
import scoreStringSimilarity from "@xenit/finder-string-similarity-score";

const match = scoreStringSimilarity("str ma", "A long string with some text to match.");

// A score between 0 and 1 which describes how well the first parameters matches the second parameter.
// A complete match always has a score of 1. A complete mismatch has a score of 0.
console.log("Score: ", match.score);

// The second parameter, chopped up into pieces.
// This can be used to highlight the parts that matched in the string
console.log("Chunks: ", match.chunks.map(chunk => chunk.matched?("*"+chunk.text+"*"):chunk.text).join(""));
```

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
