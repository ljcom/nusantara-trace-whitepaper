# PROJECT_MEMORY.md
Nusantara Trace – Project Memory & Architectural Principles
Version 0.1
Status: Active Design Reference

---

## 1. Project Identity

Nusantara Trace is a hybrid event-sourced traceability framework designed to:

- Preserve custody integrity
- Support federated industrial governance
- Enable optional blockchain anchoring
- Remain token-agnostic at core layer

It is NOT:

- A crypto project
- A tokenization platform by default
- A marketplace
- A financial instrument

Core philosophy:

> Integrity first. Governance-aware. Blockchain as enabler, not foundation.

---

## 2. Architectural Positioning

The system is built on:

- Event-sourced database model
- Hash-chained ledger per account
- Periodic sealing (window-based)
- Optional blockchain anchoring

Design stance:

- Off-chain is primary truth domain
- Blockchain is tamper-evidence layer
- Governance remains institutional

---

## 3. Core Concepts (Canonical Definitions)

These terms must remain stable across the project.

### 3.1 Ecosystem (systid)

Represents industrial domain grouping.

Examples:
- Coffee
- Rice
- Steel
- Fine Art

Purpose:
- Policy grouping
- Domain-specific dimension rules
- Compliance mapping

---

### 3.2 Account (acctid)

Represents institutional trust boundary.

Examples:
- PT ABC Coffee
- Cooperative X
- Exporter Y

Rules:
- One account owns its ledger
- Account defines governance scope
- Account isolates data and liability

Account is NOT industry.

---

### 3.3 Actor

Institutional signing entity inside an account.

In current simplified model:
- actor = account (institution-level actor)

Future extension MAY support:
- sub-actors
- role-based signing

---

### 3.4 User

Authentication identity.

- Represents human login
- Mapped to account(s)
- Does not define trust boundary

User ≠ Actor ≠ Account

---

### 3.5 Chain (chnx)

Represents event ledger container within an account.

Properties:
- Belongs to one account
- Contains ordered event records
- Produces cumulative hash
- Is periodically sealed

Multiple chains per account are allowed.

---

### 3.6 Seal (chnxseal)

Represents integrity checkpoint for a chain.

Properties:
- References last event hash
- References previous seal hash
- Can be anchored to blockchain
- Defines window closure

Seal does NOT validate business truth.
Seal validates structural integrity.

---

### 3.7 Event

Atomic immutable record.

Must include:
- Event type
- Account context
- Chain reference
- Previous hash
- Current hash
- Signature

Events are append-only.

---

### 3.8 Transfer Model

Current model: Federated Two-Ledger.

Transfer is valid when:
- Sender records TRANSFER_OUT
- Receiver records TRANSFER_IN
- Both share same xfer_id

Each side signs independently.

---

## 4. Non-Negotiable Rules

1. Events are immutable.
2. Hash chaining must be deterministic.
3. Seals must reference previous seals.
4. Blockchain anchoring must never be mandatory.
5. Business truth is separate from cryptographic proof.
6. Governance boundary must remain explicit.

---

## 5. Design Philosophy

### 5.1 Federated First

Each institution maintains its own ledger.

No forced global ledger.

Consortium model may exist later as extension.

---

### 5.2 Blockchain Optional

Anchoring provides:
- Tamper-evidence
- Non-repudiation
- External timestamp proof

But system must remain valid without blockchain.

---

### 5.3 Snapshot Model

Historical data MAY be archived.

Snapshot rules:
- Snapshot hash must remain verifiable
- Historical integrity must remain reconstructable
- No silent history rewriting allowed

---

### 5.4 Minimalism

Avoid:

- Over-tokenization
- Over-financialization
- Over-complex governance

Start simple:
- Custody trace
- Transfer handshake
- Seal
- Optional anchor

---

## 6. Fraud Awareness Memory

Common attack surfaces:

- False origin claim
- Duplicate QR label
- Transfer without acceptance
- Silent quantity adjustment
- Seal omission
- Timestamp manipulation

Mitigation principle:

> Integrity is layered: event hash + signature + seal + optional anchor.

---

## 7. What Nusantara Trace Is Trying To Prove

1. Hybrid architecture is sufficient for industrial traceability.
2. Blockchain is most useful as anchoring layer.
3. Federated ledger is more realistic than universal ledger.
4. Institutional signing is stronger than user signing.
5. Governance clarity is more important than decentralization.

---

## 8. What Must Not Drift

Do not drift into:

- NFT marketplace
- Token speculation narrative
- Cryptocurrency branding
- DeFi framing

Unless explicitly building an extension layer.

---

## 9. Long-Term Vision

Phase 1:
- Agricultural traceability (coffee use case)

Phase 2:
- Cross-industry framework

Phase 3:
- Optional interoperability layer between ERP systems

Phase 4:
- Regulatory-compatible audit extension

---

## 10. Core Identity Statement

Nusantara Trace is:

- A governance-aware traceability framework
- Based on event-sourced ledger
- With hash chaining and periodic sealing
- Supporting optional blockchain anchoring
- Designed for federated institutional environments

If a feature proposal contradicts this identity,
re-evaluate before implementation.