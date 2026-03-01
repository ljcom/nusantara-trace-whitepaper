# PROJECT_MEMORY.md
Nusantara Trace – Architectural Memory
Version: 0.1
Status: Binding Design Memory

---

## 1. Dependency Principle

Nusantara Trace MUST NOT duplicate integrity mechanisms.

All integrity primitives are inherited from:
EventDB Core
https://github.com/ljcom/eventdb-core-whitepaper

If a feature requires modification of:
- Hash logic
- Seal logic
- Snapshot logic
- Signature verification

It must be implemented at EventDB Core level, not here.

---

## 2. Core Identity

Nusantara Trace is:

- A domain profile
- Built on EventDB Core
- Focused on supply chain custody
- Designed for federated institutions

---

## 3. Non-Negotiable Rules

1. Domain events MUST use EventDB event envelope.
2. All transfers MUST be recorded on both participating accounts.
3. Quantity adjustments MUST NOT rewrite historical records.
4. Discrepancies MUST produce new corrective events.
5. QR labeling MUST reference verifiable event identifiers.
6. Profile MUST remain blockchain-optional.

---

## 4. Transfer Philosophy

Transfer validity requires:

- Sender ledger records TRANSFER_OUT
- Receiver ledger records TRANSFER_IN_ACCEPT
- Both share identical xfer_id
- Accepted quantity ≤ sent quantity

Settlement is defined by mutual confirmation.

---

## 5. Fraud Awareness

Common risk areas:

- False origin claim
- QR duplication
- Transfer without acceptance
- Silent quantity reduction
- Unsealed window manipulation

Mitigation is layered:

Event integrity (core)  
+ Transfer handshake (profile)  
+ Seal mechanism (core)  
+ Optional anchor (core)

---

## 6. Scope Guard

Nusantara Trace must not drift into:

- Financial settlement engine
- Token marketplace
- Ownership trading system
- Crypto narrative

It is a traceability profile.