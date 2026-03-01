# 11-audit-and-certification.md
Nusantara Trace - Audit and Certification
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## Audit Objective

Audit procedures require reproducible evidence that custody claims are supported by verifiable event history and accountable signatures.

## Evidence Package

A certification or audit package SHOULD include:
- Relevant event identifiers and chain references
- Verification result for event continuity (inherited core checks)
- Transfer reconciliation status by `xfer_id`
- Quantity consistency summary
- Linked supporting documents and their hashes

## Role Separation

- EventDB Core provides integrity verification primitives (inherited).
- Nusantara Trace defines which domain events and payloads auditors review.
- Certifiers and regulators define legal acceptance criteria outside this profile.

## Deterministic Output

An audit tool implementing this profile MUST produce the same verification result for the same input dataset, subject to the same EventDB Core version and policy context.
