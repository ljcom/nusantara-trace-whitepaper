# 06-eventdb-dependency.md
Nusantara Trace - EventDB Core Dependency
Version: 0.1
Status: Draft
EventDB Core Reference: d611fe102fdf6cf308c9633ca9b719f3c152d3ba

Nusantara Trace is a dependent profile of EventDB Core.

## Dependency Contract

A conforming Nusantara Trace implementation MUST satisfy these requirements:
- All profile events MUST use the EventDB Core event envelope.
- All event integrity checks MUST use EventDB Core canonical verification.
- Profile conformance MUST fail if core conformance fails.
- Core upgrades that alter verification semantics MUST be versioned and assessed before profile adoption.

## Interface Boundary

### Core-owned (inherited)
- Integrity verification semantics
- Seal and snapshot semantics
- Verification protocol semantics

### Profile-owned
- Domain payload schema
- Domain validation rules
- Cross-institution transfer business state semantics
- Regulator and certification evidence mapping

## Upgrade Principle

If a required profile capability depends on modifying hash, signature, seal, or snapshot logic, that capability MUST be proposed and accepted at EventDB Core level first. Nusantara Trace MUST NOT fork integrity semantics.
