# PROJECT_CONTEXT.md
Nusantara Trace – Project Context
Version: 0.1
Status: Active Reference

---

## 1. Project Positioning

Nusantara Trace is a domain-specific traceability profile built on top of EventDB Core.

EventDB Core provides:
- Append-only event ledger
- Deterministic hash chaining
- Window sealing
- Snapshot mechanism
- Optional blockchain anchoring

Repository reference:
https://github.com/ljcom/eventdb-core-whitepaper

Nusantara Trace does NOT reimplement integrity logic.
It defines a domain profile for supply chain traceability using the primitives provided by EventDB Core.

---

## 2. Why Nusantara Trace Exists

Supply chain systems in agriculture face recurring issues:

- Origin misrepresentation
- Quantity discrepancy
- Silent data alteration
- Weak inter-organization verification
- Fraud in custody handover

Traditional ERP systems record transactions but do not provide cryptographic tamper-evidence.

Pure blockchain systems introduce:
- Operational friction
- Wallet dependency
- Cost overhead
- Governance ambiguity

Nusantara Trace exists to bridge:

> Institutional governance and cryptographic integrity,
> using a hybrid architecture based on EventDB Core.

---

## 3. Initial Domain Focus

Primary domain:
- Agricultural supply chain (coffee as initial use case)

Rationale:
- Clear custody flow
- Export-sensitive industry
- Fraud risk exists
- Traceability demand increasing
- Scalable pilot scope

Future expansion MAY include:
- Rice
- Fisheries
- Steel
- Art & collectibles

---

## 4. Architectural Scope

Nusantara Trace defines:

- Domain event types (ORIGIN_CREATE, TRANSFER_OUT, etc.)
- Transfer handshake protocol
- Quantity validation rules
- Fraud test scenarios
- Audit and certification flow
- QR pointer labeling model

It does NOT define:

- Hashing rule (inherited from EventDB Core)
- Seal mechanism (inherited from EventDB Core)
- Snapshot engine (inherited from EventDB Core)
- Blockchain anchoring logic (inherited from EventDB Core)

---

## 5. Strategic Identity

Nusantara Trace is:

- Profile-based
- Domain-focused
- Institution-centric
- Federated by design
- Integrity-enhanced via EventDB Core

It is NOT:

- A cryptocurrency system
- A tokenization platform
- A marketplace
- A decentralized governance model

---

## 6. Deployment Model

Each institution operates:

- Its own EventDB Core chain
- Its own signing keys
- Its own governance policy

Transfers between institutions are verified using:
- Two-ledger handshake
- Matching transfer identifiers
- Mutual signature validation

Integrity remains local.
Interoperability remains federated.

---

## 7. Long-Term Vision

If adopted, Nusantara Trace may become:

- A standard traceability profile for agricultural industries
- An inter-ERP verification layer
- A regulator-compatible integrity enhancement mechanism

Core integrity remains anchored in EventDB Core.