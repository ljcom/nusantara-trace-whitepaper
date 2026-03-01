# 05-scope-and-non-goals.md
Nusantara Trace - Scope and Non-Goals
Version: 0.1
Status: Draft


This section defines the functional boundary of Nusantara Trace as a domain profile built on EventDB Core.

## Scope

Nusantara Trace covers the following profile-level capabilities:

- Custody tracking: recording and interpreting custody state transitions across institutions using domain events.
- Transfer handshake: enforcing bilateral transfer semantics so sender and receiver records can be reconciled through a shared transfer identifier.
- Quantity validation: applying deterministic profile rules to evaluate quantity consistency at transfer, split, merge, repack, and correction points.
- Audit evidence: structuring trace records and references so auditors, certifiers, and regulators can reproduce verification outcomes from the same input dataset.

These capabilities are domain semantics. Core integrity mechanisms used to protect event continuity are inherited from EventDB Core and are not redefined in this profile.

## Non-Goals

Nusantara Trace does NOT cover the following functions:

- Financial settlement between counterparties.
- Token trading or token-market operations.
- Legal enforcement or adjudication authority.
- Marketplace functionality for product listing, bidding, or matching.
- Cryptocurrency issuance.

Any requirement in those areas MUST be handled by separate legal, financial, or commercial systems and governance processes.

## Boundary Clarification

Nusantara Trace provides integrity-oriented traceability evidence for recorded events and custody statements. This evidence supports accountability and auditability, but it does not replace institutional due diligence.

Integrity proof does not equal physical truth. A verified event history indicates that recorded statements are tamper-evident and attributable under the applicable governance model; it does not, by itself, prove the physical condition, origin authenticity, or legal status of goods without external corroboration.
