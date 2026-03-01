# 09-transfer-protocol.md
Nusantara Trace - Federated Two-Ledger Transfer Protocol
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

## 1. Purpose and Scope

This protocol defines custody transfer between two institutions operating separate ledgers under a federated model. A transfer is represented by coordinated domain events on both ledgers.

Core integrity verification for each event is inherited from EventDB Core. This section defines only profile-level transfer semantics.

## 2. Required Events

A transfer instance MUST use a shared `xfer_id` and include the following events:

- `TRANSFER_OUT` on the sender ledger.
- `TRANSFER_IN_ACCEPT` or `TRANSFER_IN_REJECT` on the receiver ledger.

### 2.1 `TRANSFER_OUT` (sender statement)

`TRANSFER_OUT` MUST include at least:
- `xfer_id`
- sender account identifier
- receiver account identifier
- referenced lot/batch identifier(s)
- dispatched quantity and unit
- transfer timestamp/reference

`TRANSFER_OUT` establishes the sender claim that custody has been dispatched.

### 2.2 `TRANSFER_IN_ACCEPT` (receiver acceptance)

`TRANSFER_IN_ACCEPT` MUST include at least:
- `xfer_id`
- sender account identifier
- receiver account identifier
- referenced lot/batch identifier(s)
- accepted quantity and unit
- acceptance timestamp/reference

`TRANSFER_IN_ACCEPT` establishes the receiver claim that custody is accepted.

### 2.3 `TRANSFER_IN_REJECT` (receiver rejection)

`TRANSFER_IN_REJECT` MUST include at least:
- `xfer_id`
- sender account identifier
- receiver account identifier
- referenced lot/batch identifier(s)
- rejected quantity and unit (if measurable)
- rejection reason code and narrative
- rejection timestamp/reference

`TRANSFER_IN_REJECT` establishes that the receiver does not accept settlement for the referenced transfer.

## 3. Shared Identifier Rule

`xfer_id` is the protocol correlation key.

- Sender and receiver events for one transfer MUST use exactly the same `xfer_id` value.
- A ledger MUST NOT contain more than one terminal receiver decision (`TRANSFER_IN_ACCEPT` or `TRANSFER_IN_REJECT`) for the same `xfer_id`.
- If a rejected transfer is retried, the retry MUST use a new `xfer_id`.

## 4. Quantity Validation Rule

For an acceptance path:

- `accepted_quantity` MUST be less than or equal to `dispatched_quantity` for the same `xfer_id` and unit context.
- If units differ, conversion policy MUST be explicitly defined by profile governance before validation.
- Acceptance MUST fail at profile validation level when quantity comparison cannot be determined.

For a rejection path:

- Quantity comparison MAY be recorded for evidence but does not imply settlement.

## 5. Discrepancy Handling

A discrepancy exists when any of the following conditions is true:
- `accepted_quantity` is less than `dispatched_quantity`.
- Lot/batch references differ between sender and receiver statements.
- Required transfer metadata is inconsistent across both statements.

When discrepancy exists in an acceptance path:
- Receiver MUST record discrepancy detail in the acceptance payload or in a linked discrepancy event.
- Sender and receiver MAY issue additional corrective events.
- Corrective handling MUST be append-only; historical transfer events MUST NOT be rewritten.

## 6. Settlement Definition

Transfer settlement status is derived from bilateral evidence for one `xfer_id`:

- `SETTLED_ACCEPTED`: `TRANSFER_OUT` exists and a valid `TRANSFER_IN_ACCEPT` exists with matching `xfer_id`.
- `SETTLED_REJECTED`: `TRANSFER_OUT` exists and a valid `TRANSFER_IN_REJECT` exists with matching `xfer_id`.
- `PENDING`: `TRANSFER_OUT` exists but no receiver terminal decision exists.
- `INVALID`: required correlation or validation rules are violated.

A transfer MUST NOT be treated as settled without a receiver terminal decision.

## 7. Mutual Confirmation Requirement

The protocol requires mutual confirmation for settlement determination.

- Sender statement alone is insufficient for settlement.
- Receiver statement alone is insufficient for settlement.
- Settlement computation MUST consider both ledgers.

## 8. Liability Boundary

Liability is statement-scoped and institution-scoped:

- Sender is liable for correctness of `TRANSFER_OUT` statement content.
- Receiver is liable for correctness of `TRANSFER_IN_ACCEPT` or `TRANSFER_IN_REJECT` statement content.
- Protocol reconciliation determines consistency between statements; it does not transfer legal liability automatically.

## 9. Rejection Handling

When `TRANSFER_IN_REJECT` is recorded:

- The original `TRANSFER_OUT` remains part of history.
- Transfer status for that `xfer_id` is `SETTLED_REJECTED`, not pending.
- Any subsequent transfer attempt MUST create a new `TRANSFER_OUT` with a new `xfer_id`.
- Post-rejection corrections MUST be represented by new events.

## 10. Integrity Boundary Reminder

Event hashing, signatures, chain continuity, seal behavior, snapshot behavior, and anchoring behavior are inherited from EventDB Core and are outside this protocol section.
