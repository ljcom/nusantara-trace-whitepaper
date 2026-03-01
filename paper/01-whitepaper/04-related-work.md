# 04-related-work.md
Nusantara Trace - Related Work
Version: 0.1
Status: Draft


This section positions Nusantara Trace relative to existing approaches.

## ERP-Centric Traceability

ERP modules provide operational transaction coverage but generally rely on mutable state. Additional audit tables can improve observability but do not, by default, provide cryptographic tamper evidence or deterministic external verification.

## Public Ledger Approaches

Public ledger systems provide global publication and ordering properties but may not align with institutional control, privacy boundaries, and high-frequency internal operations.

## Event-Sourced Integrity Layers

Event-sourced integrity frameworks provide append-only history, deterministic verification, and explicit signer accountability while allowing institutions to keep existing operational systems.

Nusantara Trace adopts this last approach through EventDB Core inheritance and contributes a domain profile for supply chain custody workflows.

## Distinction of Contribution

Nusantara Trace contributes:
- Domain-standardized custody event taxonomy.
- Deterministic bilateral transfer handshake semantics.
- Explicit reconciliation and discrepancy modeling.
- Audit-oriented evidence packaging rules.

Nusantara Trace does NOT contribute:
- A new integrity algorithm.
- A global consensus mechanism.
- A cross-ledger atomic settlement model.
