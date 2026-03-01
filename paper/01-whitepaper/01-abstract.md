# 01-abstract.md
Nusantara Trace - Abstract
Version: 0.1
Status: Draft


Supply chain traceability remains difficult in multi-actor agricultural systems where records pass through cooperatives, processors, exporters, certifiers, and regulators. In practice, origin claims, custody handovers, and quantity transitions are often recorded in separate databases with limited cross-organization verification. This creates recurring risks: unverified origin attribution, unresolved transfer discrepancies, and audit processes that depend on post-hoc document assembly.

Current digital approaches present a structural gap. Conventional ERP systems support operational workflows and institutional control, but they are not designed to provide deterministic tamper-evident history across independent organizations. Public blockchain approaches, by contrast, emphasize shared publication and consensus but can introduce governance mismatch, operational overhead, and adoption barriers in regulated institutional settings. Many stakeholders therefore face a binary choice between systems that are operationally practical and systems that are integrity-oriented.

Nusantara Trace is introduced as a hybrid approach that bridges this gap. It is defined as a domain profile for traceability that operates on top of EventDB Core, rather than an alternative integrity engine. The integrity layer is inherited from EventDB Core, and Nusantara Trace depends on that foundation for verifiable event continuity and accountable record evidence. Nusantara Trace itself defines domain semantics for custody and traceability interpretation.

The model adopts a federated transfer structure: each institution maintains its own accountable record domain, while inter-institution transfers are treated as bilateral, reconcilable statements rather than centralized declarations. This supports cross-party verification while preserving organizational governance boundaries.

Coffee is used as the reference agricultural use case because it presents clear custody stages, export-facing compliance requirements, and frequent traceability disputes, making it suitable for profile definition and validation.

The contribution of this paper is a regulator-oriented, domain-specific traceability profile that separates integrity from business semantics, specifies a federated institutional interaction model, and provides a practical conceptual bridge between ERP-centered operations and blockchain-oriented integrity assumptions without adopting either as an exclusive model.
