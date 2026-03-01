# 10-fraud-and-threat-model.md
Nusantara Trace - Fraud and Threat Analysis
Version: 0.1
Status: Draft


## 1. Scope

This section describes priority fraud and integrity threats relevant to Nusantara Trace deployments. Each threat is presented with attack vector, impact, mitigation mechanism, and residual risk. Integrity controls inherited from EventDB Core are explicitly separated from profile controls defined by Nusantara Trace.

## 2. Threat Scenarios

### 2.1 QR Duplication

Attack vector:
- A valid QR label or pointer is copied and attached to a different physical lot, package, or shipment.
- The attacker relies on inspectors or buyers performing pointer lookup without full custody-context verification.

Impact:
- Misattribution of provenance.
- Potential certification misuse and market misrepresentation.
- Reduced confidence in labeling controls.

Mitigation mechanism:
- Core (inherited): event integrity and signer accountability allow verification that referenced records are authentic and unaltered.
- Profile (Nusantara Trace): QR pointer rules require linkage to specific lot identifiers, custody state, and latest relevant transfer context; duplicate-use detection SHOULD be performed through repeated-pointer monitoring and context mismatch checks.

Residual risk:
- Physical relabeling remains possible when field inspection is weak.
- Human process failures (for example, incomplete scan procedures) can allow duplicated labels to circulate before detection.

### 2.2 False Origin Claim

Attack vector:
- An institution records origin metadata that does not match true source conditions (farm, region, certification zone, or harvest context).
- Supporting documents may be selectively omitted or externally fabricated.

Impact:
- Incorrect origin representation in downstream trade and certification review.
- Compliance exposure for exporters and certifiers.
- Commercial harm to legitimate producers.

Mitigation mechanism:
- Core (inherited): immutable sequence and accountable signatures prevent undetectable retroactive rewriting of origin declarations.
- Profile (Nusantara Trace): origin event requirements and lineage continuity checks enforce explicit linkage from declared origin to subsequent custody and transfer events; audit evidence mapping SHOULD require corroborating references.

Residual risk:
- If initial data entry is intentionally false, integrity controls preserve the false statement as recorded fact.
- External validation quality (inspection, certification, geospatial checks) remains a decisive control outside ledger integrity.

### 2.3 Silent Quantity Reduction

Attack vector:
- Quantity is reduced through undocumented handling loss, unauthorized edits, or unrecorded transformation steps.
- Adjustments are made without explicit discrepancy or corrective events.

Impact:
- Hidden shrinkage across custody transitions.
- Disputes over accountability and financial exposure.
- Distorted audit outcomes.

Mitigation mechanism:
- Core (inherited): append-only event integrity prevents covert mutation of already recorded quantity statements.
- Profile (Nusantara Trace): quantity validation and correction rules require discrepancies to be represented as explicit new events; split/merge/repack lineage requirements support traceable quantity flow analysis.

Residual risk:
- Quantity measurements can still be inaccurate at source.
- Collusion across participants can produce internally consistent but externally false quantity narratives unless independent controls are applied.

### 2.4 Transfer Without Acceptance

Attack vector:
- Sender records transfer-out and treats dispatch as complete without receiver acceptance.
- Operational reporting prematurely interprets one-sided transfer statements as settled custody change.

Impact:
- False settlement status.
- Liability ambiguity during loss, delay, or dispute.
- Inconsistent inventory positions across institutions.

Mitigation mechanism:
- Core (inherited): sender event integrity can be verified, but core does not define settlement semantics.
- Profile (Nusantara Trace): federated two-ledger transfer protocol requires receiver terminal decision (`TRANSFER_IN_ACCEPT` or `TRANSFER_IN_REJECT`) for settlement; pending-state logic prevents unilateral closure.

Residual risk:
- Delayed receiver reporting can keep transfers pending for extended periods.
- Off-ledger side agreements may conflict with recorded protocol status.

### 2.5 Unsealed Window Manipulation

Attack vector:
- An operator attempts to alter, remove, or reorder events in ranges that are not yet sealed, or interferes with seal publication timing.
- The objective is to exploit operational latency before checkpoint finalization.

Impact:
- Temporary ambiguity in near-real-time verification.
- Increased effort to detect attempted manipulation in pre-seal periods.
- Potential delay in audit closure for recent windows.

Mitigation mechanism:
- Core (inherited): deterministic chain verification, seal-chain linkage, and snapshot/anchor verification detect continuity violations once validation is executed.
- Profile (Nusantara Trace): operational policy SHOULD define seal cadence expectations, escalation for overdue sealing, and review gates for high-risk transfers pending seal finalization.

Residual risk:
- Exposure window exists between event recording and seal finalization.
- Monitoring and governance discipline determine how quickly attempted manipulation is detected and contained.

## 3. Regulatory Interpretation Notes

- Integrity verification provides tamper evidence and signer accountability for recorded statements.
- Integrity verification does not, by itself, establish legal truth or physical truth.
- Regulatory assurance therefore requires combined controls: inherited integrity checks, profile conformance checks, and external compliance evidence.

## 4. Control Boundary Summary

- EventDB Core controls integrity primitives and verification semantics.
- Nusantara Trace controls domain semantics for custody, transfer, quantity, and evidence interpretation.
- Residual risks remain where physical-world verification and institutional process quality are outside system-enforced controls.
