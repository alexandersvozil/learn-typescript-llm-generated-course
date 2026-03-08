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
- `src/microgpt/03_attention.ts`
- `src/microgpt/04_block.ts`
- `src/microgpt/05_model.ts`
- `src/microgpt/06_train.ts`
- `src/microgpt/07_tokenizer.ts`
- `src/microgpt/08_autograd.ts`
- `src/microgpt/09_optimizer.ts`
- `src/microgpt/10_karpathy_model.ts`
- `src/microgpt/11_final_micro_gpt.ts`

Then continue with the staged roadmap in:

- `src/microgpt/ROADMAP.md`

This track is intentionally split into two parts:
- stages 1–6 teach the forward-pass transformer pieces with plain `number` arrays
- stages 7–11 move closer to Karpathy's actual microgpt with tokenizer, autograd, Adam, KV cache, training, and generation

## Suggested learning flow

1. Solve one function at a time.
2. Run tests often.
3. Use TypeScript errors as guidance.
4. Keep strict typing (avoid `any`).
5. Refactor only after tests are green.

## Agent log

- `AGENTS.md` contains a running log of what was set up/changed by the coding agent.
