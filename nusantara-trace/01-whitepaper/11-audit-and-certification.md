# 11-audit-and-certification.md
Nusantara Trace - Audit and Certification Model
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## 1. Purpose

This model defines how third-party auditors and certifiers interact with Nusantara Trace records for verification and reporting. It specifies audit-oriented domain semantics while preserving the inherited integrity boundary of EventDB Core.

## 2. Third-Party Audit Event

Nusantara Trace defines an audit-domain event for third-party review outcomes (for example, `AUDIT_ATTEST`).

A third-party audit event SHOULD include:
- auditor identity reference
- audit scope identifier
- referenced lot/batch and transfer identifiers
- integrity verification result summary
- exception findings summary
- timestamp and evidence package reference

The audit event represents an accountable statement by the auditor regarding reviewed records.

## 3. Optional Certification Reference

Certification is represented as an optional reference layer linked to audited records.

- A certifier MAY issue a certification-domain event (for example, `CERTIFICATION_REF`) that references a prior audit scope.
- Certification reference fields SHOULD include certifier identity, certificate identifier, validity period, and relevant evidence pointers.
- Certification references are optional and profile-governed; absence of certification reference does not invalidate core trace records.

## 4. Audit Visibility Scope

Audit visibility MUST be explicitly scoped.

Visibility scope definition SHOULD specify:
- covered institutions/accounts
- covered lot/batch identifiers
- covered transfer identifiers (`xfer_id`)
- covered time interval
- permitted payload fields and restricted fields

A system implementing this profile MUST be able to produce audit results that are reproducible under the same declared scope and input dataset.

## 5. Non-Repudiation Role of Signature

Non-repudiation in this model is derived from accountable signatures over recorded statements.

- Core (inherited): signature verification semantics establish that a statement is attributable to a signing account under applicable key governance.
- Profile: audit and certification events use this inherited property to bind reviewer statements to identified auditors/certifiers.

Signature-backed attribution supports accountability for who issued a statement and when it was recorded. It does not replace legal adjudication.

## 6. Evidence Export Capability

Nusantara Trace implementations SHOULD support export of audit evidence packages for regulator and certifier workflows.

An evidence export package SHOULD include:
- selected event identifiers and references
- integrity verification outcomes (inherited core checks)
- transfer reconciliation outcomes
- discrepancy and corrective-event trace
- third-party audit event(s)
- optional certification reference(s)
- hash references for attached supporting documents

Export format MAY vary by institution policy, but exported content MUST preserve referential consistency so independent reviewers can reproduce verification outcomes.

## 7. Certification Boundary and Non-Claim

This model supports certification of recorded integrity outcomes and traceability consistency within declared scope.

Audit and certification in this profile do not certify product quality by default. Product quality determination remains dependent on external testing, inspection procedures, and applicable regulatory or contractual criteria outside ledger integrity verification.

## 8. Responsibility Separation

- EventDB Core (inherited) provides event integrity, signature verification semantics, sealing, snapshot verification, and optional anchoring.
- Nusantara Trace provides domain interpretation for audit scope, audit event semantics, certification references, and evidence packaging.
