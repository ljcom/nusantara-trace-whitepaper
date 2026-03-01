# 05-scope-and-non-goals.md
Nusantara Trace - Scope and Non-Goals
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## Scope

Nusantara Trace defines profile rules for:
- Domain entities and identifiers for custody tracking.
- Domain event types for origin, transfer, repack, certification, and exception flows.
- Deterministic transfer handshake and settlement conditions.
- Quantity reconciliation and corrective-event behavior.
- Audit and certification evidence mapping.
- QR pointer conventions for lookup and inspection.

## Explicitly Inherited from EventDB Core

The profile MUST inherit, and MUST NOT redefine:
- Canonical hashing logic
- Event signature and verification logic
- Chain ordering and previous-hash continuity
- Sealing rules and seal-chain behavior
- Snapshot derivation rules
- Anchor interface and proof verification

## Non-Goals

Nusantara Trace is not:
- A cryptocurrency platform
- A token issuance or trading system
- A financial settlement network
- A decentralized governance ideology
- A replacement for legal adjudication processes

Integrity evidence is intended to support verification. It does not automatically establish business truth, legal truth, or physical authenticity.
