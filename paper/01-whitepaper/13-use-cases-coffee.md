# 13-use-cases-coffee.md
Nusantara Trace - Coffee Use Cases
Version: 0.2
Status: Draft


## A. Revised Structure for Coffee SCM Use-Case Paper

1. Coffee SCM context and trust challenges
2. Operational flow (dashboard-aligned lifecycle)
3. Technical architecture overview (hybrid off-chain + on-chain anchor)
4. Traceability data model
5. Event model and minimum event attributes
6. Identity and role layer
7. Seal, snapshot, and integrity mechanism
8. Blockchain anchoring layer (proof registry/log only)
9. Verification flow for buyers, auditors, and regulators
10. B2B marketplace positioning and integration boundary
11. Practical implementation and adoption notes
12. Generalization to other commodity chains
13. Optional appendix: anchor contract pseudocode and design rationale (non-ERC)

## B. Proposed Inserted/Revised Text by Section

## 1. Coffee SCM Context and Trust Challenges

Coffee supply chains involve multiple organizations with different digital maturity and different evidence practices. A typical chain includes:
- farmer
- collector
- processor
- exporter
- roaster
- distributor/retailer

At each handover, information quality may degrade when records are partial, delayed, or only available in siloed systems. Common trust issues include:
- incomplete custody history across organizational boundaries
- mismatch between declared and received quantity/quality
- weak linkage between processing claims and supporting evidence
- high audit effort for reconstructing provenance

For Indonesian coffee ecosystems, traceability architecture should improve integrity and accountability without requiring every participant to adopt complex blockchain operations.

In prior positioning, this coffee implementation also supports B2B marketplace sourcing workflows (for example cooperatives, exporters, importers, and roasters). In this paper, that positioning is preserved: the marketplace-facing layer consumes verified trace data, while traceability integrity remains the core system function.

## 2. Operational Flow (Dashboard-aligned Lifecycle)

This section aligns whitepaper flow semantics with the Nusantara Trace dashboard workflow used in MVP operation.

### 2.1 Origin Creation

Origin creation is used when recording the first batch statement.

Minimum field set:
- `batch_id`
- `actor_id` (farmer/cooperative)
- product/commodity type
- quantity + unit
- harvest/production date
- optional geo reference
- metadata descriptor (JSON)
- signature

Output:
- chain event is recorded
- public QR / ID is generated

### 2.2 Transfer Request (Pending)

Sender initializes transfer with:
- from actor
- to actor
- batch reference
- quantity
- timestamp

Status is `PENDING` until the receiver records terminal confirmation.

### 2.3 Transfer Confirmation

Receiver decides:
- `APPROVE` when quantity and reference are consistent
- `REJECT` when quantity/reference mismatch exists

Evidence is recorded on both sides:
- outflow (sender side)
- inflow (receiver side)

Dual-sided recording is required for anti-fraud reconciliation.

### 2.4 Split / Repack

Batch operations may include:
- split
- merge
- repack

Parent-child lineage MUST be preserved so provenance reconstruction remains deterministic.

### 2.5 Attestation (Optional)

Optional third-party audit statements may include:
- lab result
- quality grading
- organic certification reference

Audit output is represented as:
- attestation event
- signed by auditor

### 2.6 Seal / Snapshot

For each policy window, system SHOULD record:
- hash commitment
- optional blockchain anchor

This layer provides periodic integrity checkpoints without changing domain custody semantics.

### 2.7 Public Verification

Selected batches SHOULD expose public verification pointers (for example QR/public trace ID) so external buyers or auditors can validate:
- custody chain activity status
- recent event freshness
- available attestation references

Public verification is read-oriented evidence access. It does not expose private operational payloads beyond declared policy scope.

## 3. Technical Architecture Overview

The Coffee SCM implementation uses Nusantara Trace as a hybrid traceability stack:
- operational trace events remain off-chain in an append-only trace server/event ledger
- integrity checkpoints are produced through seal/snapshot commitments
- selected commitments are anchored to blockchain for tamper-evident public proof

This is not a blockchain-only supply chain architecture. Blockchain is an integrity and timestamping layer, not the operational transaction database.

## 4. Traceability Data Model

Core entities for the coffee profile:

| Entity | Purpose | Example fields |
|---|---|---|
| `CoffeeBatch` | Primary traceable lot identity | `batch_id`, commodity type, origin context, current state |
| `ActorOrganization` | Participating organization identity | `actor_id`, name, role, optional legal attributes |
| `ProcessingEvent` | Processing-stage transformation evidence | process type, input/output quantity, timestamp, evidence pointer |
| `ShipmentEvent` | Handover and logistics evidence | `shipment_id`, sender, receiver, quantity, location |
| `QualityCheck` | Lab/grade quality checkpoint | grade, moisture, defect score, issuer, timestamp |
| `CertificationRecord` | Certification or audit attestation | cert id/reference, issuer, validity window, evidence hash |
| `SnapshotSealRecord` | Integrity checkpoint record | `snapshot_id`, commitment hash, seal time, issuer |

## 5. Event Model and Minimum Attributes

Event-driven traceability for coffee batches can be represented by:
- `coffee.harvested`
- `coffee.collected`
- `coffee.processed`
- `coffee.quality_checked`
- `coffee.shipped`
- `coffee.received`
- `coffee.roasted`
- `coffee.packaged`

Each event SHOULD include a minimum trace envelope:
- `event_id`
- `batch_id`
- `actor_id`
- `event_type`
- `timestamp`
- `location`
- `metadata` (including optional evidence pointers such as document hash or URI)

Event model principle:
- append-only history
- corrections represented by compensating events
- no historical overwrite

## 6. Identity and Role Layer

Each participant is represented by a system identity and organization role. Role-based participation controls which events can be issued or validated:
- farmer: origin and harvest declarations
- collector: aggregation and transfer-out declarations
- processor: processing and sub-batch lineage declarations
- exporter: export handover and compliance-linked documentation references
- roaster: roast and packaging declarations
- verifier/auditor: quality/certification attestations and review checkpoints

This identity-role model supports accountability without forcing all actors to use advanced key-management at day one. Platform-managed onboarding can be used in early phases while preserving signed event responsibility.

## 7. Seal, Snapshot, and Integrity Mechanism

Integrity is enforced through periodic or milestone-based checkpointing:
- operational events are first recorded off-chain in append-only form
- event groups (for example per batch milestone or time window) are sealed
- snapshot artifacts are generated with deterministic hash commitments
- commitments are retained for replay and verification

This mechanism provides tamper-evident lifecycle continuity while keeping operational throughput and data privacy policy flexible.

## 8. Blockchain Anchoring Layer (Proof Registry/Log Only)

The blockchain layer stores only proof metadata, such as:
- `trace_id` or `snapshot_id`
- hash commitment (`bytes32`)
- anchor timestamp
- issuer/submitter identity

Anchoring model constraints:
- no full event payload storage on-chain
- no mandatory on-chain recording for every operational event
- no tokenized ownership transfer logic as core architecture

This preserves cost efficiency while giving external parties independent proof that a given snapshot commitment existed at or before a certain time.

## 9. Verification Flow

External verification (buyer, auditor, regulator) follows a simple sequence:
1. Retrieve batch history from the off-chain trace system using public trace pointer/QR.
2. Recompute or validate the relevant seal/snapshot commitment from disclosed event scope.
3. Compare computed commitment with anchored hash in blockchain registry/log.
4. Confirm anchor timestamp and issuer identity.
5. Evaluate declared claims (quality, origin, handling) against available evidentiary events.

Verification result meaning:
- integrity and accountability are strengthened (tamper evidence, consistent timeline)
- physical truth still requires supporting operational controls and field/lab evidence

## 10. B2B Marketplace Positioning and Integration Boundary

The Coffee SCM profile remains compatible with a B2B marketplace context, especially for specialty sourcing where buyers compare provenance, quality evidence, and continuity of custody before procurement decisions.

Boundary clarification:
- Nusantara Trace can supply trusted trace records to B2B listing/sourcing workflows.
- Nusantara Trace is not defined here as a full marketplace matching engine.
- Pricing negotiation, order matching, payment settlement, and trade finance remain external modules/platforms.

This boundary keeps the paper consistent with previous direction: marketplace utility is enabled through verified trace data, without turning the architecture into a trading system.

## 11. Implementation Notes for Practical Adoption

This hybrid model is generally more realistic than fully on-chain SCM implementations for coffee ecosystems:
- lower operational cost and transaction fee exposure
- easier integration with existing ERP/logistics/mobile forms
- reduced blockchain friction for SMEs/cooperatives
- better scalability for high-frequency event recording
- flexible privacy controls for commercial data

For Indonesia, this approach supports phased adoption across heterogeneous actors, including participants with limited digital infrastructure.

## 12. Generalization Beyond Coffee

The same pattern can be extended to other commodities where provenance and custody integrity matter:
- cocoa
- palm oil
- seafood
- spices

Domain event vocabulary changes per commodity, while core integrity architecture (event ledger + seal/snapshot + optional anchor) remains stable.

## C. Architecture Diagram (ASCII/Text)

```text
Coffee Supply Chain Actors
(Farmer -> Collector -> Processor -> Exporter -> Roaster -> Distributor/Retailer)
        |
        v
Nusantara Trace Profile Layer
(roles, event schema, batch lifecycle, verification checkpoints)
        |
        v
Event Ledger / Trace Server (off-chain)
(append-only events, lineage, seals, snapshots)
        |
        v
Blockchain Anchor Registry (on-chain proof log)
(snapshot_id, commitment_hash, timestamp, issuer)
        |
        v
Public Verification Layer
(buyers, auditors, regulators, end consumers)
        |
        v
B2B Sourcing/Marketplace Interface (optional integration)
(listing enrichment and buyer due diligence support; not matching/settlement core)
```

## Appendix A. Illustrative Anchor Contract Pseudocode

```solidity
contract TraceAnchorRegistry {
    struct AnchorRecord {
        bytes32 hash;
        uint256 timestamp;
        address issuer;
    }

    mapping(bytes32 => AnchorRecord) public anchors;

    function anchor(bytes32 snapshotId, bytes32 hash) external {
        anchors[snapshotId] = AnchorRecord(hash, block.timestamp, msg.sender);
    }
}
```

This pseudocode is illustrative only and represents a simple registry/log model for hash commitments.

## Appendix B. Why ERC-1155 Is Intentionally Not Used

ERC-1155 is intentionally excluded because this use case does not require tokenized asset ownership transfer. Coffee SCM here is modeled as event-based provenance and custody evidence. The required blockchain function is proof anchoring of snapshot commitments, which is sufficiently handled by a minimal registry/log contract. Using ERC token standards would add complexity without improving core traceability objectives.

## D. Alignment with Nusantara Trace

- Uses profile-driven domain semantics for coffee lifecycle events.
- Preserves EventDB-style append-only trace records as operational backbone.
- Uses seal/snapshot commitments as integrity checkpoints.
- Uses blockchain only as optional public anchoring layer.
- Preserves B2B marketplace-facing sourcing compatibility without making marketplace settlement a core protocol function.
- Maintains clear boundary: integrity evidence vs domain/business interpretation.

## E. Assumptions and Areas Requiring Confirmation

- Existing Coffee SCM draft is currently concise; longer business context may still need expansion with empirical Indonesian field examples.
- Role list and event vocabulary assume standard green-coffee flow; confirm if wet-hulled/specialty variants need dedicated event types.
- Regulatory references are treated as supportive context, not legal guarantees; compliance mapping should be validated per target export market.
- Public verification disclosure policy (which fields are public vs restricted) still needs project-level governance confirmation.
