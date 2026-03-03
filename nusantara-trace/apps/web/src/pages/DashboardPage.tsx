type FlowCard = {
  id: string
  title: string
  note: string
  fields?: string[]
  status?: string
  events?: string[]
  outputs?: string[]
}

const flowCards: FlowCard[] = [
  {
    id: '1',
    title: 'Origin Creation',
    note: 'Membuat batch pertama kali.',
    fields: [
      'Batch ID',
      'Actor (petani/koperasi)',
      'Produk / komoditas',
      'Qty + unit',
      'Tanggal panen / produksi',
      'Geo reference (opsional)',
      'Metadata descriptor (JSON)',
      'Signature',
    ],
    outputs: ['Chain event tercatat', 'QR / ID publik'],
  },
  {
    id: '2',
    title: 'Transfer Request',
    note: 'Pengirim menginisiasi transfer.',
    fields: ['From actor', 'To actor', 'Batch reference', 'Qty', 'Timestamp'],
    status: 'Pending',
  },
  {
    id: '3',
    title: 'Transfer Confirmation',
    note: 'Penerima melakukan approve atau reject berdasarkan kecocokan qty.',
    events: ['Outflow', 'Inflow'],
    outputs: ['Anti-fraud: dua sisi event harus konsisten'],
  },
  {
    id: '4',
    title: 'Split / Repack',
    note: 'Batch bisa dipecah, digabung, atau di-repack.',
    outputs: ['Parent-child trace tetap terjaga'],
  },
  {
    id: '5',
    title: 'Attestation (Optional)',
    note: 'Audit pihak ketiga untuk validasi kualitas dan kepatuhan.',
    fields: ['Lab result', 'Quality grading', 'Organic certification'],
    outputs: ['Attestation event', 'Signed by auditor'],
  },
  {
    id: '6',
    title: 'Seal / Snapshot',
    note: 'Integrity checkpoint per window.',
    fields: ['Hash commitment', 'Optional blockchain anchor'],
    outputs: ['Layer integrity untuk verifikasi periodik'],
  },
]

export function DashboardPage() {
  return (
    <section className="page">
      <p className="eyebrow">Workspace</p>
      <h1 className="title">Dashboard</h1>
      <p className="description">
        Alur operasional tenant dari origin sampai sealing untuk menjaga
        traceability dan anti-fraud.
      </p>

      <div className="workflow-grid">
        {flowCards.map((card) => (
          <article className="workflow-card" key={card.id}>
            <p className="workflow-id">{card.id}</p>
            <h2 className="workflow-title">{card.title}</h2>
            <p className="workflow-note">{card.note}</p>

            {card.status ? (
              <p className="workflow-chip">Status: {card.status}</p>
            ) : null}

            {card.fields ? (
              <>
                <p className="workflow-section-title">Field</p>
                <ul className="workflow-list">
                  {card.fields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {card.events ? (
              <>
                <p className="workflow-section-title">Event Tercatat</p>
                <ul className="workflow-list">
                  {card.events.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {card.outputs ? (
              <>
                <p className="workflow-section-title">Output</p>
                <ul className="workflow-list">
                  {card.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
