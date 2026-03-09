# 14-mvp-and-pilot-plan.md
Nusantara Trace - Implementation and Pilot Plan
Version: 0.1
Status: Draft


## 1. Pilot Objective and Scope

This plan defines a practical pilot for coffee supply chain traceability using Nusantara Trace as a domain profile over EventDB Core.

Initial strategic vertical: Specialty Coffee (B2B sourcing).

Rationale:
- origin signal has direct commercial value
- buyer demand for transparency is already present
- manageable operational volume for pilot learning loops
- community-driven adoption path is realistic in early phase

Pilot objective:
- demonstrate reproducible custody traceability across institutions
- validate transfer reconciliation behavior under real operating conditions
- produce regulator- and auditor-consumable evidence exports

Initial pilot scope (recommended):
- commodity: green coffee beans
- corridor: one producing region to one export channel
- participants: 1-2 cooperatives, 1 processor/exporter, 1 independent auditor/certifier observer
- duration: one harvest sub-cycle (8-12 weeks)

## 2. Institution Onboarding Steps

Onboarding SHOULD follow a staged process to reduce operational risk.

1. Governance readiness
- Confirm institutional sponsor and operational owner.
- Define signing authority matrix by event type.
- Approve key custody, rotation, and incident response policy.

2. Profile alignment
- Confirm shared profile version and event catalog.
- Confirm transfer protocol obligations (`TRANSFER_OUT`, receiver terminal decision, shared `xfer_id`).
- Confirm quantity unit conventions and conversion policy, if applicable.

3. Technical preparation
- Provision EventDB Core node/service per institution.
- Configure Nusantara Trace profile adapter and validation rules.
- Configure evidence export format and exchange channel.

4. Data preparation
- Register institution account identifiers.
- Define lot identifier format and uniqueness policy.
- Prepare baseline reference data (locations, actors, facility identifiers).

5. Controlled dry run
- Execute sample origin, transfer, discrepancy, and correction scenarios.
- Verify bilateral reconciliation and evidence export reproducibility.
- Resolve conformance issues before live pilot start.

6. Go-live approval
- Document readiness checklist completion.
- Approve monitoring responsibilities and escalation contacts.

## 3. Minimal Deployment Architecture

The pilot SHOULD use the smallest architecture that preserves federated accountability.

Per participating institution:
- one EventDB Core-backed ledger service (integrity layer, inherited)
- one Nusantara Trace profile service/module (domain validation and interpretation)
- one operational integration endpoint (ERP/manual input adapter)
- one evidence export endpoint for auditor/regulator requests

Cross-institution interface:
- transfer event reference exchange channel (API or governed file exchange)
- periodic reconciliation job keyed by `xfer_id`

Auditor interface:
- read-scope access to selected event references and exported evidence packages

This architecture avoids centralizing operational data while still allowing deterministic transfer reconciliation.

## 4. Seal Frequency Recommendation

Seal behavior is inherited from EventDB Core. Nusantara Trace recommends an operational seal cadence for pilot reliability.

Recommended baseline:
- seal at least every 60 minutes during business hours, or every 500 accepted events, whichever occurs first
- force end-of-day seal for all active institution ledgers

Escalation recommendation:
- if seal delay exceeds 2 expected intervals, raise operational alert
- if seal delay exceeds one business day, mark affected window as elevated review scope in audit outputs

These values are practical starting points and MAY be adjusted after pilot telemetry review.

## 5. Snapshot Recommendation

Snapshot semantics are inherited from EventDB Core. For pilot operations, snapshot scheduling SHOULD balance verification cost and operational simplicity.

Recommended baseline:
- create snapshot daily per institution ledger after end-of-day seal
- retain at least 30 daily snapshots for pilot analysis and replay checks
- trigger additional snapshot after major event bursts (for example, intake peaks or bulk transfer days)

Verification recommendation:
- run weekly restore/replay check from snapshot plus subsequent events to confirm reproducibility

## 6. Operational Runbook (Pilot Minimum)

Pilot operators SHOULD maintain a concise runbook covering:
- transfer pending queue review (at least twice daily)
- discrepancy triage and correction-event SLA
- key incident escalation path
- seal/snapshot monitoring checks
- evidence export request handling timeline

Suggested practical SLA targets:
- pending transfer aged > 24 hours: mandatory review
- discrepancy event issuance: within 1 business day of detection
- evidence export delivery for audit request: within 2 business days

## 7. Success Metrics

Pilot success SHOULD be evaluated with measurable, regulator-relevant indicators.

Conformance and integrity metrics:
- 100% of accepted profile events pass core integrity verification
- >= 98% of transfer records include valid bilateral `xfer_id` correlation
- 0 unresolved integrity violations at pilot close

Operational quality metrics:
- >= 95% of transfers reach receiver terminal decision within agreed SLA
- >= 90% of discrepancies are closed by corrective events within 2 business days
- seal cadence compliance >= 95% against configured schedule
- daily snapshot completion >= 98%

Audit readiness metrics:
- 100% of sampled audit scopes produce reproducible evidence exports
- auditor replay success >= 95% for sampled scopes
- no material mismatch between exported evidence and on-ledger references in sample checks

## 8. Practical Constraints and Risk Controls

Expected constraints include uneven partner technical capacity, inconsistent source data quality, and operational delays in counterpart confirmations. Pilot governance SHOULD address these with:
- limited initial participant set
- mandatory dry-run before go-live
- weekly cross-institution reconciliation review
- explicit escalation authority for unresolved transfer or discrepancy backlog

## 9. Exit Criteria for Scale Decision

Progression from pilot to broader rollout SHOULD require all of the following:
- minimum four consecutive weeks meeting core conformance and seal/snapshot targets
- no critical unresolved dispute attributable to protocol ambiguity
- positive auditor assessment of evidence reproducibility
- participant agreement on profile refinements and governance updates

This plan is intentionally practical: it favors bounded deployment, measurable controls, and early detection of governance or data-quality gaps before scale expansion.
