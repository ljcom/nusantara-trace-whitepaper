# 02-introduction.md
Nusantara Trace - Introduction
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

Supply chain actors require records that can be audited across organizational boundaries. Existing ERP workflows are effective for operations, but mutable records and fragmented handover evidence create assurance gaps during inspection, dispute, and certification.

Nusantara Trace addresses this by defining a domain profile that runs on EventDB Core.

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
