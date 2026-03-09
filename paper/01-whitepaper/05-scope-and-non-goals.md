# 05-scope-and-non-goals.md
Nusantara Trace - Scope and Non-Goals
Version: 0.1
Status: Draft


This section defines the functional boundary of Nusantara Trace as a domain profile built on EventDB Core.

## Scope

Nusantara Trace covers the following profile-level capabilities:

- Origin creation at batch level.
- Transfer request recording with pending state visibility.
- Dual confirmation semantics across sender outflow and receiver inflow/rejection.
- Split, sub-batch, merge, and repack lineage preservation.
- Optional attestation references (lab, auditor, certifier statements).
- Seal and optional anchoring checkpoints (core mechanics inherited from EventDB Core).
- Public verification pointers for selected trace outputs (for example QR/public trace identifier).

These capabilities are domain semantics. Core integrity mechanisms used to protect event continuity are inherited from EventDB Core and are not redefined in this profile.

## Non-Goals

Nusantara Trace does NOT cover the following functions:

- Accounting and general balance management.
- Payment processing or financial settlement clearing.
- Full marketplace matching and settlement execution.
- Farm management software functions.
- Internal ERP inventory replacement.
- Commodity token exchange operation.
- Cryptocurrency issuance.
- Legal enforcement or adjudication authority.

Any requirement in those areas MUST be handled by separate legal, financial, or commercial systems and governance processes.

## Boundary Clarification

Nusantara Trace provides integrity-oriented traceability evidence for recorded events and custody statements. This evidence supports accountability and auditability, but it does not replace institutional due diligence.

Integrity proof does not equal physical truth. A verified event history indicates that recorded statements are tamper-evident and attributable under the applicable governance model; it does not, by itself, prove the physical condition, origin authenticity, or legal status of goods without external corroboration.
