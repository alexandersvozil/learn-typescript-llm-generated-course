# AGENTS.md

This file logs what the coding agent set up and changed in this repository, so the learning course can be maintained and extended without losing context.

## 1) Initial repository bootstrap

Created TypeScript + Vitest project scaffolding for challenge-driven learning:

- `package.json`
  - scripts:
    - `npm test` → beginner tests
    - `npm run test:watch`
    - `npm run test:all`
    - `npm run test:microgpt`
- `tsconfig.json`
  - strict mode enabled
  - `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `vitest.config.ts`
- `.gitignore`

## 2) Beginner challenge track created

Added challenge stubs:

- `src/challenges/01_primitives.ts`
- `src/challenges/02_collections.ts`
- `src/challenges/03_unions.ts`
- `src/challenges/04_async.ts`
- `src/challenges/README.md`

Added tests:

- `tests/basics/01_primitives.test.ts`
- `tests/basics/02_collections.test.ts`
- `tests/basics/03_unions.test.ts`
- `tests/basics/04_async.test.ts`

## 3) MicroGPT track foundation created

Added initial challenge stubs:

- `src/microgpt/01_math.ts`
- `src/microgpt/02_layers.ts`

Added tests:

- `tests/microgpt/01_math.test.ts`
- `tests/microgpt/02_layers.test.ts`

Added staged plan:

- `src/microgpt/ROADMAP.md`

## 4) Documentation updates

- `README.md` updated to describe beginner track + microgpt track + roadmap entry point.

## 5) Mentoring-driven test hardening and fixes

While coaching through async and numerical edge cases, the following were improved:

- `tests/basics/04_async.test.ts`
  - fixed fake-timer/unhandled-rejection timing issue by attaching rejection assertions before advancing timers.
- `tests/microgpt/01_math.test.ts`
  - added stricter softmax test for reference values + shift invariance (numerical correctness).

## 6) Git/remote operations performed

- Added remote:
  - `origin = git@github.com:alexandersvozil/learn-typescript-llm-generated-course.git`
- Push conflict handled by integrating remote history.
- An accidental local commit containing in-progress learner solutions was undone before final push.
- Learner solutions were stashed during push sync and restored locally after push, so remote remains challenge-focused.

## 7) Current extension (this update)

To make the microgpt track complete enough to assemble a Tiny/Micro GPT end-to-end, additional staged challenge files + tests were added:

- `src/microgpt/03_attention.ts`
- `src/microgpt/04_block.ts`
- `src/microgpt/05_model.ts`
- `src/microgpt/06_train.ts`

- `tests/microgpt/03_attention.test.ts`
- `tests/microgpt/04_block.test.ts`
- `tests/microgpt/05_model.test.ts`
- `tests/microgpt/06_train.test.ts`

README + roadmap were updated accordingly.

## 8) Course philosophy

- Tests define behavior.
- Learner implements function stubs.
- Keep strict typing, avoid `any`.
- Prefer clear correctness first, then idiomatic refactors.

## 9) Karpathy-parity extension added

To extend the forward-only microgpt exercises into a fuller Karpathy-style end-to-end rebuild, the following additional challenge files + tests were added:

Challenge stubs:

- `src/microgpt/07_tokenizer.ts`
- `src/microgpt/08_autograd.ts`
- `src/microgpt/09_optimizer.ts`
- `src/microgpt/10_karpathy_model.ts`
- `src/microgpt/11_final_micro_gpt.ts`

Tests:

- `tests/microgpt/07_tokenizer.test.ts`
- `tests/microgpt/08_autograd.test.ts`
- `tests/microgpt/09_optimizer.test.ts`
- `tests/microgpt/10_karpathy_model.test.ts`
- `tests/microgpt/11_final_micro_gpt.test.ts`

Roadmap/README were updated to explain the split between:
- stages 1–6: plain-number forward-pass learning track
- stages 7–11: tokenizer + autograd + optimizer + Karpathy-style model + final training/generation integration
