# 07-traceability-model.md
Nusantara Trace - Traceability Model
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

This section defines the conceptual traceability model for Nusantara Trace as a domain profile over EventDB Core.

## 1. Model Overview

The model represents a product unit (asset/lot) as a lifecycle of accountable domain events. Each lifecycle transition is recorded by an institution that has operational responsibility at that stage.

Nusantara Trace defines domain semantics for lifecycle interpretation. Integrity verification of recorded events is inherited from EventDB Core.

Conceptual layer view:

[EventDB Core Integrity Layer - inherited]
  - event integrity continuity
  - signature accountability
  - seal and snapshot verification
           |
           v
[Nusantara Trace Domain Layer]
  - origin declaration
  - custody transfer semantics
  - repack/split/merge lineage
  - audit interpretation checkpoints

## 2. Asset/Lot Lifecycle

A traceable asset/lot progresses through a bounded set of domain states.

Conceptual lifecycle diagram:

[ORIGIN CREATED]
      |
      v
[IN CUSTODY: Producer/Cooperative]
      |
      v
[TRANSFER OUT]
      |
      v
[TRANSFER ACCEPTED BY RECEIVER]
      |
      +----------------------------+
      |                            |
      v                            v
[DIRECT CONTINUATION]     [REPACK / SPLIT / MERGE]
      |                            |
      +-------------+--------------+
                    |
                    v
            [AUDIT CHECKPOINT]
                    |
                    v
             [CERTIFICATION / CLOSE]

This lifecycle is append-only at the evidence level: updates are expressed as new events, not history replacement.

## 3. Origin Creation

Origin creation is the initial trace statement for an asset/lot within institutional scope. It establishes baseline identity and source context for downstream custody interpretation.

Conceptual origin declaration:

[Institution Account]
      |
      v
[Origin Event]
  - lot identifier
  - source location / source actor reference
  - initial quantity and unit
  - time reference
      |
      v
[Lot enters custody state]

Origin creation does not by itself prove physical authenticity. It provides an accountable statement that can be evaluated against subsequent events and external evidence.

## 4. Custody Transfer

Custody transfer is modeled as a bilateral process across two institution boundaries. A transfer is interpreted from two accountable statements: sender transfer-out and receiver acceptance or rejection.

Conceptual transfer diagram:

Sender Institution                     Receiver Institution
------------------                    --------------------
[Lot in custody]                      [Expected intake]
      |                                        |
      v                                        v
[TRANSFER OUT: xfer_id, qty]  ----->   [TRANSFER IN ACCEPT/REJECT: same xfer_id]
      |                                        |
      +---------------- reconciliation --------+
                       |
                       v
            [Settled / Disputed status]

This model makes mismatch conditions explicit. If transferred and accepted quantities differ, the discrepancy is represented as a traceable domain outcome.

## 5. Repack, Split, and Merge

Processing operations may transform one lot into many lots, many lots into one, or repackage the same lot under new handling context. Nusantara Trace models these as lineage-preserving transitions.

Conceptual lineage diagrams:

Split:
[Parent Lot P] --> [Child Lot C1] + [Child Lot C2] + ...

Merge:
[Parent Lot A] + [Parent Lot B] --> [Merged Lot M]

Repack:
[Lot R - pre-repack] --> [Lot R' - repack state]

In all three cases, lineage references preserve parent-child relationships so auditors can reconstruct provenance paths across transformations.

## 6. Audit Checkpoint

An audit checkpoint is a review stage where a verifier assesses whether the recorded lifecycle remains internally consistent and evidentially complete for the declared scope.

Conceptual audit checkpoint flow:

[Select scope: lot / period / institutions]
                |
                v
[Collect related lifecycle events]
                |
                v
[Verify integrity outcomes - inherited core checks]
                |
                v
[Evaluate domain consistency]
  - origin-to-custody continuity
  - transfer handshake completeness
  - quantity transition consistency
  - lineage consistency for split/merge/repack
                |
                v
[Audit conclusion package]

The audit checkpoint does not redefine core integrity functions. It applies profile-level interpretation rules to a verified event history.

## 7. Interpretation Boundary

Responsibility separation remains mandatory:

- EventDB Core (inherited) provides integrity evidence for event continuity and accountability.
- Nusantara Trace provides domain interpretation of lifecycle transitions and cross-institution custody semantics.

Therefore, a positive integrity result indicates that recorded statements are tamper-evident and attributable. It does not, by itself, establish physical truth without external corroboration.
