# 02-introduction.md
Nusantara Trace - Introduction
Version: 0.1
Status: Draft


Supply chain actors require records that can be audited across organizational boundaries. Existing ERP workflows are effective for operations, but mutable records and fragmented handover evidence create assurance gaps during inspection, dispute, and certification.

Nusantara Trace addresses this by defining a domain profile that runs on EventDB Core.

## Public References

Project references used in this paper:
- Source repository: <https://github.com/ljcom/nusantara-trace-whitepaper> [@nusantara_trace_whitepaper_repo_2026]
- Public endpoint: <https://nusantara.mx4.link> [@nusantara_mx4_link_2026]

## Positioning

Nusantara Trace is not a general marketplace, not an ERP replacement, and not a commodity tokenization venue.

Nusantara Trace is positioned as a curated trust and traceability infrastructure for premium commodities, centered on custody integrity and verified identity.

Primary focus:
- premium agricultural commodities (specialty coffee as initial vertical)
- B2B sourcing workflows (cooperatives, exporters, importers, roasters)
- integrity and transparency over retail transaction volume

## Layer Separation

### Inherited integrity layer (EventDB Core)

The following mechanisms are inherited and MUST be implemented as specified by EventDB Core:
- Event envelope validation
- Canonical hashing and previous-hash linkage
- Signature verification
- Window sealing
- Snapshot derivation and verification
- Optional external anchor publication and proof verification

### Nusantara Trace profile layer

The profile layer defines domain rules for:
- Origin declaration data requirements
- Transfer handshake semantics between institutions
- Quantity and state transition constraints
- Audit and certification evidence packaging
- QR pointer usage for public lookup and inspection workflows

Nusantara Trace is institution-centric and federation-compatible. Each institution controls its own account governance and operational policy. Cross-institution verification is performed through deterministic exchange of event references and signatures, not through ideological decentralization claims.

## 3.x Ledger Boundary Alignment

Nusantara Trace operates strictly within the Ledger Boundary model defined by EventDB Core.

- Each institution MUST maintain sovereign control over its own ledger boundary, including event issuance authority, signing authority governance, and operational policy.
- A ledger boundary MUST be treated as an integrity isolation unit for verification and accountability, and MUST NOT be treated as a domain classification mechanism.
- Cross-institution interaction MUST occur through verifiable cross-boundary event references; participating institutions MUST NOT assume shared mutable state across boundaries.
- Transfer and reconciliation outcomes MUST be derived from independently recorded statements that are correlated by profile rules, consistent with federated boundary operation.
