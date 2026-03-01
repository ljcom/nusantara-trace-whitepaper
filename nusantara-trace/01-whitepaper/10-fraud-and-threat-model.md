# 10-fraud-and-threat-model.md
Nusantara Trace - Fraud and Threat Model
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## Threat Categories

Relevant threat categories include:
- False origin declaration
- Transfer record mismatch across counterparties
- Silent quantity reduction through undocumented repack
- Duplicate QR labeling or pointer reuse
- Post-hoc alteration attempts on historical events

## Control Mapping by Layer

### EventDB Core controls (inherited)
- Append-only sequence integrity
- Canonical hash-chain tamper evidence
- Signer accountability
- Seal checkpoint verification
- Optional external anchor confirmation

### Nusantara Trace controls (profile)
- Mandatory two-ledger transfer handshake
- Quantity reconciliation constraints
- Exception and correction event requirements
- Certification linkage and evidence references
- QR pointer format and lookup consistency rules

## Non-Claim Reminder

A successful integrity verification indicates record continuity and signer accountability. It does not prove commodity quality, legal compliance status, or physical-world authenticity without external corroboration.
