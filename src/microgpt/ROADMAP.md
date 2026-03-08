# MicroGPT TypeScript Challenge Roadmap

Goal: re-implement Karpathy's `microgpt.py` in TypeScript in small TDD steps.

Reference:
https://gist.githubusercontent.com/karpathy/8627fe009c40f57531cb18360106ce95/raw/14fb038816c7aae0bb9342c2dbf1a51dd134a5ff/microgpt.py

## Stage 0: Runtime + style choices

Decide early:
- plain arrays only (easy to inspect, slower)
- or `Float32Array` where useful (closer to ML style)

For learning TS, start with plain arrays and migrate later.

---

## Part A: Forward-pass transformer intuition

These first stages use plain `number` arrays to teach the model math clearly before adding autograd.

## Stage 1: Math primitives (tests included)

File: `src/microgpt/01_math.ts`
- `softmax`
- `sampleFromDistribution`
- `matMul`

## Stage 2: NN layers (tests included)

File: `src/microgpt/02_layers.ts`
- `gelu`
- `layerNorm`
- `linear`

## Stage 3: Attention building blocks (tests included)

File: `src/microgpt/03_attention.ts`
- `causalMask`
- `attentionWeights`
- `applyAttention`
- `selfAttention`

## Stage 4: Transformer block (tests included)

File: `src/microgpt/04_block.ts`
- `residualAdd`
- `mlp`
- `transformerBlock`

## Stage 5: Model assembly (tests included)

File: `src/microgpt/05_model.ts`
- `embeddingLookup`
- `addPositionEmbeddings`
- `projectLogits`
- `runBlocks`
- `forwardTinyGpt`

## Stage 6: Loss + token selection (tests included)

File: `src/microgpt/06_train.ts`
- `crossEntropyFromLogits`
- `averageSequenceLoss`
- `sampleTokenFromLogits`
- `greedyTokenFromLogits`

---

## Part B: Closer Karpathy microgpt parity

These stages switch from plain-number helpers to a scalar autograd engine + the exact training loop ideas from the gist.

Important note:
- Stages 1–6 are educational and GPT-ish.
- Stages 7–11 are closer to the actual Karpathy gist.
- The gist uses `Value`, `rmsNorm`, `relu`, no biases, and autoregressive KV caching.

## Stage 7: Tokenizer + BOS handling (tests included)

File: `src/microgpt/07_tokenizer.ts`
- `buildCharTokenizer`
- `encode`
- `decode`
- `surroundWithBos`

## Stage 8: Scalar autograd engine (tests included)

File: `src/microgpt/08_autograd.ts`
- `Value`
  - `add`
  - `mul`
  - `pow`
  - `exp`
  - `log`
  - `relu`
  - `neg`
  - `sub`
  - `div`
  - `backward`

## Stage 9: Optimizer helpers (tests included)

File: `src/microgpt/09_optimizer.ts`
- `flattenParams`
- `createAdamState`
- `learningRateAtStep`
- `adamStep`

## Stage 10: Karpathy-style model pieces (tests included)

File: `src/microgpt/10_karpathy_model.ts`
- `linearNoBias`
- `softmaxValues`
- `rmsNorm`
- `splitHeads`
- `concatHeads`
- `createEmptyCache`
- `gptStep`

## Stage 11: Final micro GPT assembly (tests included)

File: `src/microgpt/11_final_micro_gpt.ts`
- `initMicroGpt`
- `modelParameters`
- `sequenceLoss`
- `trainStep`
- `generate`

This final stage should let you:
- initialize a tiny Karpathy-style GPT
- compute next-token loss over a token sequence
- train with autograd + Adam
- generate autoregressively from BOS

---

## Run the microgpt track

```bash
npm run test:microgpt
```

Suggested workflow:
1. Implement one function.
2. Run only relevant test(s).
3. Keep strict typing (avoid `any`).
4. Refactor after green tests.
5. Once Stages 1–6 feel clear, move into the autograd/optimizer/model stack in Stages 7–11.
