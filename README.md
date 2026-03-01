# TypeScript Challenge Track

This repo is set up as a **learn-by-doing TypeScript kata track**.

## 1) Install + run tests

```bash
npm install
npm test
```

- `npm test` runs beginner challenges in `tests/basics`.
- `npm run test:microgpt` runs the second track in `tests/microgpt`.

## 2) Beginner track (do this first)

Implement these files:

- `src/challenges/01_primitives.ts`
- `src/challenges/02_collections.ts`
- `src/challenges/03_unions.ts`
- `src/challenges/04_async.ts`

All tests are already written.

## 3) MicroGPT track (second challenge)

After the basics, start implementing:

- `src/microgpt/01_math.ts`
- `src/microgpt/02_layers.ts`

Then continue with the staged roadmap in:

- `src/microgpt/ROADMAP.md`

This is intentionally staged so you can build blocks first (math/layers), then compose into a full micro GPT.

## Suggested learning flow

1. Solve one function at a time.
2. Run tests often.
3. Use TypeScript errors as guidance.
4. Keep strict typing (avoid `any`).
5. Refactor only after tests are green.
