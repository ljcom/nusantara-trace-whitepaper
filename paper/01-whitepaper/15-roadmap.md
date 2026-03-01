# 15-roadmap.md
Nusantara Trace - Roadmap and Future Extensions
Version: 0.1
Status: Draft


## 1. Roadmap Baseline

Nusantara Trace development priority remains profile stability for custody traceability, transfer reconciliation, quantity validation, and audit evidence reproducibility. Core integrity behavior remains inherited from EventDB Core.

## 2. Future Extensions (Optional Modules)

The following extensions are defined as optional modules. They are not required for base profile conformance.

### 2.1 Optional Blockchain Anchoring Module

Purpose:
- publish selected integrity commitments to an external chain for additional publication evidence.

Boundary:
- anchoring semantics are inherited from EventDB Core.
- Nusantara Trace may define profile policy for when and what to anchor.

Conformance note:
- deployments without anchoring remain conformant.

### 2.2 Optional Certification Integration Module

Purpose:
- integrate certifier workflows and external certificate lifecycle references with traceability events.

Boundary:
- module adds domain mappings for certificate identifiers, validity periods, and review outcomes.
- module does not redefine core integrity verification.

Conformance note:
- absence of certification module does not invalidate custody traceability operation.

### 2.3 Optional Tax Reporting Extension Module

Purpose:
- map traceability events to tax-reporting evidence needs (for example, transaction trace references and reporting aggregates).

Boundary:
- module provides reporting transformations and evidence packaging conventions.
- legal interpretation and filing obligations remain institutional and jurisdiction-specific.

Conformance note:
- tax module is optional and policy-dependent.

### 2.4 Optional RWA Profile Integration Module

Purpose:
- provide interoperability mapping between Nusantara Trace custody records and separate real-world asset (RWA) profile systems.

Boundary:
- integration may reference Nusantara Trace events as source evidence.
- integration does not convert Nusantara Trace into a trading, issuance, or settlement platform.

Conformance note:
- RWA integration is optional and must remain external to core custody profile obligations.

## 3. Extension Governance Principle

All future extensions MUST follow these rules:
- extension modules MUST be versioned independently from base profile.
- extension modules MUST preserve EventDB Core inheritance boundaries.
- extension modules MUST NOT alter base transfer settlement semantics.
- extension modules MUST declare additional policy dependencies explicitly.

## 4. Adoption Guidance

Institutions SHOULD adopt the base profile first, then enable optional modules only when governance readiness, legal review, and operational capacity are established.
