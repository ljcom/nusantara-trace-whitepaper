# 06-eventdb-dependency.md
Nusantara Trace - Dependency on EventDB Core
Version: 0.1
Status: Draft


Nusantara Trace is a dependent domain profile of EventDB Core. Conformance of this profile presupposes conformance to the referenced EventDB Core specification.

## Inherited Integrity Primitives

Nusantara Trace inherits the following integrity primitives from EventDB Core:

- Append-only event integrity semantics.
- Deterministic chain continuity verification.
- Accountable signature verification semantics.
- Seal-based checkpoint integrity.
- Snapshot-based verifiable state derivation.
- Optional anchoring interface and proof-verification semantics.

These primitives are normative at core layer and MUST NOT be redefined by this profile.

## Event Envelope Reuse

All Nusantara Trace domain events MUST be encoded using the EventDB Core event envelope. Profile-specific data are carried only in domain payload fields and profile metadata conventions that do not alter core verification semantics.

Nusantara Trace MAY constrain payload content for domain requirements, but it MUST NOT change envelope semantics or core validation behavior.

## Seal Reuse

Nusantara Trace reuses EventDB Core seal mechanisms as inherited controls for checkpoint integrity across event windows. The profile does not define an alternative seal format, seal-chain rule, or seal verification rule.

Any sealing-related enhancement required by domain stakeholders MUST be proposed at EventDB Core level before profile adoption.

## Snapshot Reuse

Nusantara Trace reuses EventDB Core snapshot mechanisms for efficient verification and state reconstruction. Snapshot derivation, admissibility, and verification remain core-layer responsibilities.

The profile may define domain interpretation of verified snapshot outputs, but it MUST NOT modify snapshot integrity semantics.

## Anchoring Reuse

Nusantara Trace reuses the EventDB Core anchoring interface as an optional external publication mechanism. Anchoring policy, proof format, and verification behavior remain inherited from EventDB Core.

Anchor usage MAY be enabled or disabled per institutional policy. Profile conformance MUST remain valid in anchor-enabled and anchor-disabled deployments, consistent with core optionality.

## Separation of Responsibilities

Responsibility boundaries are explicit:

- EventDB Core handles integrity: event acceptance integrity, continuity verification, signature accountability semantics, sealing, snapshot verification, and anchoring semantics.
- Nusantara Trace handles domain logic: custody semantics, transfer handshake interpretation, quantity validation rules, exception semantics, and audit evidence mapping.

A feature request that requires changes to core integrity semantics is out of scope for profile-layer modification and MUST be addressed through EventDB Core governance.

Nusantara Trace does not redefine namespace semantics. Namespace governance and ledger boundary governance remain defined exclusively by EventDB Core. Accordingly, Nusantara Trace is namespace-agnostic and boundary-compatible.
