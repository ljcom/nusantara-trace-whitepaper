# 14-mvp-and-pilot-plan.md
Nusantara Trace - MVP and Pilot Plan
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## MVP Scope

The MVP SHOULD implement:
- Core domain events: origin, transfer, acceptance/rejection, discrepancy, repack, certification
- Two-ledger transfer reconciliation by `xfer_id`
- Basic QR pointer generation for batch lookup
- Verification dashboard for integrity and domain consistency outcomes

## Pilot Corridor

A pilot MAY include:
- 2 to 4 cooperatives
- 1 to 2 processors/exporters
- 1 auditor or certifier participant
- A bounded commodity flow over one harvest cycle

## Success Criteria

- At least 95% of transfer events have bilateral handshake completion.
- All sampled audit packages are reproducible from stored events.
- Detected discrepancies are resolved by corrective events without history rewrite.

## Out of Scope for MVP

- Full national rollout
- Financial settlement automation
- Tokenized asset representations
