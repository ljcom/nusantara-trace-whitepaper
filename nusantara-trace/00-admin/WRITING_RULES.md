# WRITING_RULES.md
Nusantara Trace – Writing Standards
Version: 0.1

---

## 1. Tone

- Neutral
- Domain-specific
- Governance-aware
- Technical
- Regulator-friendly

No crypto hype.
No decentralization ideology.

---

## 2. Layer Separation Rule

When writing:

- Integrity logic belongs to EventDB Core.
- Domain logic belongs to Nusantara Trace.

Never mix both in the same explanation.

Example:

Incorrect:
"The transfer hash ensures agricultural compliance."

Correct:
"The transfer event is recorded using EventDB Core integrity mechanisms."

---

## 3. Terminology Stability

Use consistent terms:

- Account (institution)
- Event
- Chain
- Seal
- Snapshot
- Transfer
- Origin

Do not alternate with synonyms without definition.

---

## 4. Integrity Claim Rule

Never claim:

"Blockchain guarantees traceability."

Use:

"Nusantara Trace leverages EventDB Core integrity primitives to provide tamper-evident trace records."

---

## 5. Profile Scope Rule

Documentation must clearly state:

- Which mechanisms are inherited from EventDB Core
- Which rules are domain-specific

---

## 6. Event Description Format

Each domain event description MUST include:

- Purpose
- Required payload fields
- Signature requirement
- State implication
- Integrity implication

---

## 7. Federation Clarity

Every transfer explanation must clarify:

- Two-ledger model
- Mutual confirmation
- Liability boundary

Ambiguity is not allowed.

---

## 8. Versioning

Each document MUST include:

Version
Status
Reference to EventDB Core version (commit hash if applicable)