# WRITING_RULES.md
Nusantara Trace Documentation & Whitepaper Writing Rules
Version 0.1

---

## 1. Purpose

This document defines writing standards for all documents under:

- /01-whitepaper
- /03-spec
- /05-policy

The goal is to ensure:

- Conceptual clarity
- Terminology consistency
- Technical precision
- Governance neutrality
- Academic readiness

---

## 2. Writing Principles

### 2.1 Clarity Over Hype
Avoid:
- “Revolutionary”
- “Disruptive”
- “Trustless future”
- “Blockchain-powered transformation”

Prefer:
- "Hybrid anchoring model"
- "Event-based governance framework"
- "Integrity verification mechanism"

Nusantara Trace is positioned as:
> A governance enhancement layer, not a disruption narrative.

---

### 2.2 Deterministic Language

When defining rules, use:

- MUST
- MUST NOT
- SHOULD
- MAY

Example:

✔ "Each transfer event MUST include a unique xfer_id."
✔ "Seal hash MUST reference the previous seal hash."

Avoid vague phrasing like:
- "It is recommended"
- "Usually"
- "In most cases"

---

### 2.3 Separate Concept From Implementation

Concept layer:
- Trust boundary
- Governance model
- Integrity model

Implementation layer:
- SQL schema
- Hash formula
- API structure

Never mix both in one paragraph.

---

### 2.4 Define Terms Once

Each core term must be defined clearly and reused consistently:

- Ecosystem
- Account (acct)
- Actor
- User
- Chain (chnx)
- Seal (chnxseal)
- Event
- Snapshot
- Anchor

Avoid synonyms after definition.

Example:
Use only "Account (acct)".
Do not alternate between:
- tenant
- company
- organization
unless context explicitly changes.

---

## 3. Tone by Document Type

### 3.1 Whitepaper (01-whitepaper)

Tone:
- Neutral
- Academic-ready
- Conceptual clarity

Structure:
- Problem → Architecture → Protocol → Governance → Security → Roadmap

Avoid:
- Code blocks (unless illustrative)
- SQL detail
- Implementation-level arguments

---

### 3.2 Specification (03-spec)

Tone:
- Deterministic
- Precise
- Formal

Include:
- Field definitions
- Hash formula
- State machine transitions
- Constraint rules

No storytelling.
No marketing language.

---

### 3.3 Policy / Governance (05-policy)

Tone:
- Institutional
- Regulator-aware
- Risk-conscious

Include:
- Liability boundary
- Retention policy
- Actor accountability
- Dispute handling

Avoid:
- Crypto-native assumptions
- Decentralization maximalism

---

## 4. Formatting Rules

### 4.1 Headings

Use consistent heading depth:

# Section
## Subsection
### Detail

Do not exceed 3 levels unless necessary.

---

### 4.2 Diagrams

All diagrams must:
- Be referenced in text
- Use consistent naming
- Reflect final terminology

Example:

Figure 3: Federated Transfer Protocol

---

### 4.3 Hash Notation

Use consistent notation:

- H(x) = cryptographic hash function
- tip_hash = latest cumulative event hash
- seal_hash = final seal hash

Never change naming midway.

---

## 5. Event Model Writing Rules

When describing an event:

Always specify:

1. Event type
2. Required fields
3. Signature requirement
4. State transition
5. Integrity implication

Example format:

Event: TRANSFER_OUT  
Required fields: xfer_id, from_acct, to_acct, qty  
Signed by: from_acct  
Effect: decreases bucket balance  
Integrity: included in cumulative hash

---

## 6. Avoid These Common Mistakes

❌ Mixing account and actor definitions  
❌ Referring to blockchain as source of truth  
❌ Suggesting that anchoring validates business truth  
❌ Ignoring governance boundary  
❌ Using implementation detail to justify trust claim  

---

## 7. Integrity Claims Rule

Never claim:

- "Blockchain guarantees truth."

Instead state:

- "Anchoring provides tamper-evident integrity proof."

Integrity ≠ Business validity.

---

## 8. Transfer Protocol Writing Rule

Every transfer description must clarify:

- Is the model federated or shared?
- Who signs first?
- Who confirms?
- What happens if rejected?
- When is settlement final?

No ambiguity allowed.

---

## 9. Snapshot & Retention Rule

When describing pruning:

- Clarify whether event data is archived or deleted.
- Clarify whether snapshot hash remains verifiable.
- Clarify retention tiers (hot / warm / cold).

Never imply historical rewrite is allowed.

---

## 10. Future Extension Language

When mentioning blockchain token standards (ERC, etc):

Use phrasing:

> "Tokenization MAY be implemented as an extension layer."

Never:

> "The system is based on tokenization."

Nusantara Trace core is token-agnostic.

---

## 11. Naming Conventions

Use lowercase snake_case for:

- table names
- field names
- hash variables

Use PascalCase only for:
- document titles
- event types

---

## 12. Versioning Rule

Each document must include:

Version: 0.x  
Status: Draft / Review / Stable  

Changes must be logged in:

/00-admin/roadmap.md

---

## 13. Final Principle

Nusantara Trace is:

- Governance-first
- Hybrid by design
- Blockchain-optional
- Event-sourced by foundation

Every section must reinforce this identity.