# 09-transfer-protocol.md
Nusantara Trace - Transfer Protocol
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## Purpose

The transfer protocol defines deterministic custody handover across two institution-ledger boundaries.

## Two-Ledger Handshake

A transfer is considered settled only when both events exist and verify:
1. Sender records `TRANSFER_OUT` with `xfer_id` and sent quantity.
2. Receiver records `TRANSFER_IN_ACCEPT` or `TRANSFER_IN_REJECT` with the same `xfer_id`.

## Normative Rules

- Both parties MUST record transfer events on their own chains.
- `xfer_id` MUST match exactly between sender and receiver records.
- Accepted quantity MUST be less than or equal to sent quantity.
- If quantity differs, receiver MUST emit an exception payload or dedicated discrepancy event.
- Rejection MUST preserve original `TRANSFER_OUT`; correction MUST be append-only.

## Liability Boundary

- Sender remains accountable for `TRANSFER_OUT` statement integrity.
- Receiver remains accountable for acceptance or rejection statement integrity.
- Settlement status SHOULD be computed from both ledgers.

## Inherited Integrity Mechanisms

Signature validation, hash continuity, sealing, and snapshot verification are inherited from EventDB Core. This profile section defines custody semantics only.
