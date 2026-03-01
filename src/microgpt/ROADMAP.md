# MicroGPT TypeScript Challenge Roadmap

Goal: re-implement Karpathy's `microgpt.py` in TypeScript, but in small TDD steps.

Reference:
https://gist.githubusercontent.com/karpathy/8627fe009c40f57531cb18360106ce95/raw/14fb038816c7aae0bb9342c2dbf1a51dd134a5ff/microgpt.py

## Stage 0: Runtime + style choices

Decide early:
- plain arrays only (easy to inspect, slower)
- or `Float32Array` where useful (closer to ML style)

For learning TS, start with plain arrays and migrate later.

## Stage 1: Math primitives (current tests)

File: `src/microgpt/01_math.ts`
- `softmax`
- `sampleFromDistribution`
- `matMul`

Run:
```bash
npm run test:microgpt
```

## Stage 2: NN layers (current tests)

File: `src/microgpt/02_layers.ts`
- `gelu`
- `layerNorm`
- `linear`

## Stage 3: Attention building blocks

Suggested next file: `src/microgpt/03_attention.ts`

Implement:
- scaled dot-product attention
- causal mask
- projection helpers for q/k/v

Suggested tests:
- attention output shape
- causal masking prevents future-token influence
- identical inputs produce deterministic outputs

## Stage 4: Transformer block

Suggested file: `src/microgpt/04_block.ts`

Implement:
- pre-norm
- self-attention + residual
- MLP (linear -> GELU -> linear) + residual

Suggested tests:
- shape preservation
- residual connection sanity checks

## Stage 5: Full GPT forward pass

Suggested file: `src/microgpt/05_model.ts`

Implement:
- token embedding lookup
- positional embedding add
- stack of transformer blocks
- final layernorm + logits projection

Suggested tests:
- logits shape `[T, vocabSize]`
- deterministic output with fixed weights

## Stage 6: Loss + training loop

Suggested file: `src/microgpt/06_train.ts`

Implement:
- cross entropy loss
- tiny SGD/Adam (as in microgpt spirit)
- sampling loop

Suggested tests:
- loss decreases on tiny synthetic dataset
- generated sequence has valid token IDs

## Stage 7: Port parity checks (optional)

- Compare TS outputs against Python microgpt on fixed seed and fixed tiny weights.
- Validate intermediate tensors (embeddings, attention probs, logits).

---

If you want, we can now do this in mentor mode:
1. You implement one function.
2. You paste errors / failing tests.
3. I give targeted hints (not full solution unless you ask).
