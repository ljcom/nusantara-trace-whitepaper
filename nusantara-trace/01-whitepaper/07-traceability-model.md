# 07-traceability-model.md
Nusantara Trace - Traceability Model
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## Model Objective

The traceability model links physical custody steps to immutable event records so that each state transition can be verified by authorized parties.

## Layered Model

### Integrity layer (inherited from EventDB Core)
- Immutable event sequence
- Deterministic chain continuity
- Signer accountability
- Seal-based checkpointing

### Domain profile layer (Nusantara Trace)
- Custody state transitions
- Quantity movement constraints
- Product unit relationships (split, merge, repack)
- Exception and dispute handling

## Minimal State Semantics

Each tracked unit SHOULD be evaluable as one of:
- `CREATED`
- `IN_CUSTODY`
- `IN_TRANSFER`
- `ACCEPTED`
- `REPACKED_OR_SPLIT`
- `CERTIFIED`
- `DISPUTED`
- `CLOSED`

State transitions MUST be driven by profile events and MUST preserve append-only history.

## Verification Outcome

A verifier MUST be able to reproduce:
- Event integrity outcome (core layer, inherited)
- Domain consistency outcome (profile layer)

A failed integrity outcome invalidates traceability verification. A passed integrity outcome does not, by itself, prove business truth.
