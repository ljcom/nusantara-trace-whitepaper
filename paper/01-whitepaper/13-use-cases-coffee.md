# 13-use-cases-coffee.md
Nusantara Trace - Coffee Use Cases
Version: 0.1
Status: Draft


## Use Case 1: Origin to Cooperative Intake

- Farmer cooperative records `ORIGIN_CREATE` for cherry or green-bean batch intake.
- Payload includes origin location, harvest period, quantity, and initial quality metadata.
- Integrity behavior is inherited from EventDB Core.

## Use Case 2: Cooperative to Exporter Transfer

- Cooperative emits `TRANSFER_OUT` with `xfer_id` and dispatched quantity.
- Exporter emits `TRANSFER_IN_ACCEPT` with matching `xfer_id` and accepted quantity.
- Any discrepancy MUST be recorded as an additional event, not mutation.

## Use Case 3: Repack and Lot Consolidation

- Exporter records split/merge or repack events that reference parent batch lineage.
- Lineage references MUST preserve traceability path for audit reconstruction.

## Use Case 4: Certification Review

- Certifier validates event continuity and transfer consistency.
- Certifier records profile-specific certification event with referenced evidence.
- Certification assertions remain external judgments; integrity records provide evidence context.
