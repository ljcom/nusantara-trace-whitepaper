# 12-adoption-and-governance.md
Nusantara Trace - Governance Boundary
Version: 0.1
Status: Draft


## 1. Purpose

This section defines governance boundaries for Nusantara Trace deployments. It clarifies which assurances are provided by system design and which responsibilities remain with participating institutions.

## 1.1 Governance Positioning

Nusantara governance posture is curated, not open-listing by default.

Nusantara Premium Portal is positioned as:
- curated listing portal
- trust badge provider

It is not a full marketplace matching/settlement system.

## 2. Institutional Responsibility

Nusantara Trace operates in a federated institutional model. Each institution remains responsible for statements issued under its account scope.

Institutional responsibility includes:
- correctness and completeness of submitted domain data
- compliance with applicable legal and sector obligations
- operational controls for event issuance and review
- internal segregation of duties and approval workflows

System-level integrity does not transfer legal accountability away from the issuing institution.

## 3. Signing Authority

Signing authority is institution-governed.

- Each institution MUST define who is authorized to issue signed statements for each event class.
- Delegation of signing authority MUST be documented in institutional policy.
- Unauthorized signatures MUST be treated as governance violations, even if technically verifiable before revocation status is applied.

Event signature verification semantics are inherited from EventDB Core; authority assignment remains institutional.

## 4. Key Management Responsibility

Key lifecycle management remains institutional responsibility.

Each institution MUST define and enforce policy for:
- key generation and custody
- key rotation schedule
- key revocation handling
- compromise response and recovery procedures
- audit logging for key-administration actions

Nusantara Trace does not define institution-specific key management procedures. It depends on institutional governance to ensure key trustworthiness.

## 5. Seal Responsibility

Seal mechanics are inherited from EventDB Core, but seal operations are institution-operated.

Institutional responsibilities include:
- executing sealing processes according to agreed operational cadence
- monitoring overdue or failed seal operations
- maintaining seal-related operational evidence for audit

System guarantees can detect continuity issues when verification is run. Timeliness and operational discipline of sealing remain institutional obligations.

## 6. Dispute Handling Boundary

Nusantara Trace provides structured evidence for dispute analysis but does not adjudicate disputes.

- The system can show signed statements, transfer correlations, discrepancies, and event continuity outcomes.
- The system cannot, by itself, determine contractual fault, legal liability assignment, or physical-ground truth.
- Dispute resolution procedures, escalation paths, and final determinations remain institutional and legal-process functions.

## 7. What the System Guarantees

Within the defined conformance boundary, the combined EventDB Core and Nusantara Trace model guarantees:
- tamper-evident continuity of recorded events (inherited core behavior)
- accountable attribution of signed statements to recognized accounts (inherited core behavior)
- deterministic interpretation of profile transfer and discrepancy states from recorded inputs (profile behavior)
- reproducible evidence packaging for declared audit scope (profile behavior)

These guarantees apply to recorded data integrity and interpretation consistency.

## 8. What Remains Institutional

The following remain institutional responsibilities and are not guaranteed by system design alone:
- truthfulness of initial data capture
- physical condition and authenticity of goods
- legal validity of transactions and claims
- adequacy of operational controls and personnel conduct
- enforcement outcomes in contractual or regulatory disputes

## 9. Boundary Statement

Nusantara Trace is an integrity-oriented traceability profile for institutional use.

- Integrity guarantees continuity of recorded statements and signer accountability.
- Integrity does NOT guarantee physical authenticity.
- Integrity does NOT guarantee legal enforceability.
- Integrity does NOT guarantee compliance status.

Physical verification, legal determination, and compliance determination remain institutional and regulatory functions.

## 9.1 Strategic Boundary Reminder

Nusantara Trace is not:
- marketplace mass retail infrastructure
- payment clearing house
- commodity token exchange
- farm ERP platform

Nusantara Trace is an identity-backed custody integrity network for premium origin products.

## 10. Blockchain Anchoring Policy (Profile-Level Recommendation)

Informative, policy-relevant.

### 10.1 Role of Anchoring in Nusantara Trace

Anchoring is defined at EventDB Core level. Nusantara Trace does not modify anchoring primitives, anchoring proof semantics, or anchoring verification behavior.

Within this profile, anchoring is treated as a policy-based enhancement for external timestamp durability and evidentiary preservation. For export-grade supply chains involving multiple institutions, anchoring can strengthen confidence that selected commitments were externally published at a verifiable time.

Anchoring is evidentiary reinforcement, not a consensus mechanism.

Anchoring does NOT:
- Create shared ledger state.
- Merge ledger boundaries.
- Introduce cross-institution atomicity.
- Replace institutional governance.

### 10.2 Recommended Anchoring Levels

EventDB Core defines four optional assurance levels:
- Level 0 - No external anchoring.
- Level 1 - Seal-level anchoring.
- Level 2 - Seal + snapshot anchoring.
- Level 3 - Multi-anchor redundancy.

Profile-level policy recommendation:
- For regulator-facing agricultural export chains, Level 1 or Level 2 anchoring is RECOMMENDED.
- For pilot or internal deployments, Level 0 MAY be sufficient.
- For high-value or cross-jurisdiction chains, Level 2 or Level 3 MAY be adopted.

These recommendations do not alter EventDB Core behavior. They define profile-level deployment posture only.

### 10.3 Anchor Frequency Guidance

Institutions SHOULD define anchoring cadence in policy and apply it consistently. Recommended trigger patterns include:
- Per seal window.
- Per custody milestone.
- Per export batch closure.
- Per regulatory reporting cycle.

Per-event anchoring SHOULD NOT be used as the default policy baseline.

### 10.4 Audit Interpretation

Auditor interpretation sequence SHOULD follow:
1. Verify internal seal-chain continuity.
2. Validate anchor commitment correspondence.
3. Confirm external publication timestamp evidence.
4. Evaluate end-to-end evidence continuity in declared scope.

Failure of anchoring does not invalidate internal ledger continuity. It only weakens external timestamp evidence.

### 10.5 Regulatory Framing

Anchoring may support export compliance, cross-border inspection, and evidentiary preservation, but it does not replace statutory certification, physical inspection, or legal adjudication.

### 10.6 Conceptual View (Textual)

```text
[Institution Ledger Boundary]
          ↓ Seal
          ↓ Anchor Commitment
[External Publication Layer]
          ↓ Independent Verification

Integrity = internal
Anchoring = external evidentiary reinforcement
```

## 11. Trace Score and Market Signaling (Profile Policy)

Trace score is not a product quality score. Trace score expresses record integrity posture and custody continuity quality.

A profile-level trace score SHOULD reflect:
- custody completeness
- transfer confirmation rate
- freshness of custody updates
- descriptor metadata completeness
- presence of optional attestation
- absence of broken chain conditions

Trace score properties:
- batch-centric
- collective responsibility across participating supply-chain actors

## 12. Economic Incentive Model (Adoption)

Adoption is expected to be driven primarily by market access and reputational advantage, not by mandatory regulation alone.

Expected incentive effects:
- batches with complete and current trace records are more acceptable to premium buyers
- faster verification improves buyer confidence for export workflows
- richer attestation evidence strengthens credibility

Expected disincentive effects:
- stale or incomplete custody records reduce trace score
- listing visibility or trust-badge eligibility MAY be restricted for unresolved chain gaps

Transparency is treated as the incentive mechanism.
