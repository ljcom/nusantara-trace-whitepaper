# 08-domain-data-model.md
Nusantara Trace - Domain Data Model
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## Entities

The profile uses these core domain entities:
- `InstitutionAccount`: accountable organization identity.
- `Batch`: traceable unit or lot.
- `Transfer`: pending or settled custody handover record.
- `Certificate`: auditor or certifier assertion record.
- `ExceptionCase`: dispute, discrepancy, or correction context.

## Identifier Rules

- `batch_id` MUST be unique in the issuer domain.
- `xfer_id` MUST be globally unique for transfer reconciliation.
- `cert_id` MUST be unique within certifier scope.

## Domain Payload Requirements

A profile event payload SHOULD include:
- Commodity and classification fields
- Quantity and unit
- Time and location references
- Counterparty account references where applicable
- Supporting evidence pointers (document hash, URI, or both)

## Inheritance Boundary

Payload fields are profile-defined and MAY evolve by version.
Envelope fields, hash coverage, and signature rules are inherited from EventDB Core and MUST remain unchanged.
