# 08-domain-data-model.md
Nusantara Trace - Domain Data Model
Version: 0.1
Status: Draft


## Entities

The profile uses these core domain entities:
- `PlatformIdentity`: account-level platform identity for participating actors.
- `CryptoIdentity`: signing identity (public key) used for non-repudiation.
- `LegalIdentity`: validated legal-entity reference.
- `Batch`: traceable lot-level unit as the primary custody identity.
- `Shipment`: transfer container/reference used for inter-actor handover.
- `Transfer`: pending or settled custody handover record.
- `SubBatchLineage`: parent-child relationship map for split/merge/repack.
- `Attestation`: auditor/certifier/lab assertion record.
- `ExceptionCase`: dispute, discrepancy, or correction context.

## Identifier Rules

- `batch_id` MUST be unique in the issuer domain.
- `shipment_id` SHOULD be unique in sender scope for handover evidence.
- `xfer_id` MUST be globally unique for transfer reconciliation.
- `cert_id` MUST be unique within certifier scope.

## Identity Model

Traceability in Nusantara Trace is grounded in custody events plus verified identity.

Identity layers:
- Platform identity: account-based actor representation for operations.
- Cryptographic identity: key-based signing for accountable statements.
- Optional legal verification: institutional/legal-entity validation for higher-assurance onboarding.

Adoption baseline:
- custodial key model MAY be used for early-stage adoption (keys provisioned and managed by platform infrastructure)
- signing MUST still occur in backend-controlled secure services
- self-managed keys MAY be enabled for advanced actors without changing profile semantics

## Batch and Unit Model

Batch identity is the primary trace anchor. A batch MAY represent multiple retail units (for example one batch for 100 packs).

Custody operations are executed at:
- batch level
- sub-batch level
- shipment level

Unit-level retail serial tracking is optional and recommended only for:
- high-value itemization needs
- secondary resale trace scenarios
- advanced retail trace programs

Shipment-level confirmation SHOULD be supported so one shipment reference (for example one pallet/waybill QR) can represent a transfer bundle without requiring per-pack scan.

## Domain Payload Requirements

A profile event payload SHOULD include:
- Commodity and classification fields
- Quantity and unit
- Time and location references
- Counterparty account references where applicable
- Supporting evidence pointers (document hash, URI, or both)
- Descriptor metadata completeness fields
- Public verification pointer (`public_trace_id` and/or QR payload reference) where policy allows

## Inheritance Boundary

Payload fields are profile-defined and MAY evolve by version.
Envelope fields, hash coverage, and signature rules are inherited from EventDB Core and MUST remain unchanged.
