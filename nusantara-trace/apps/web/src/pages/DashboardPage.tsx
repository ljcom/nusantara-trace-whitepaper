import { useEffect, useState, type FormEvent } from 'react'

type FlowCard = {
  id: string
  title: string
  note: string
  fields?: string[]
  status?: string
  decisions?: string[]
  events?: string[]
  outputs?: string[]
}

type StepTransaction = {
  id: string
  batchId: string
  actorId: string
  summary: string
  quantity: string
  unit: string
  eventDate: string
}

type IncomingOrderStatus =
  | 'NEW'
  | 'CONFIRMED'
  | 'READY_TO_SHIP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'

type IncomingOrder = {
  id: string
  salesOrderNo: string
  batchId: string
  buyerId: string
  sellerId: string
  quantity: string
  unit: string
  orderDate: string
  status: IncomingOrderStatus
}

type SamplingStatus = 'REQUESTED' | 'SCHEDULED' | 'IN_TEST' | 'COMPLETED' | 'REJECTED'

type SamplingRequest = {
  id: string
  sourceTransactionId: string
  sourceStepId: '1' | '4'
  batchId: string
  requesterActorId: string
  requestedDate: string
  status: SamplingStatus
}

type SealSnapshot = {
  id: string
  stepId: string
  trigger: string
  sealedAt: string
  anchorStatus: 'PENDING' | 'ANCHORED'
}

type VerificationResult = {
  id: string
  traceId: string
  checkedAt: string
  verdict: 'VERIFIED' | 'FLAGGED'
  note: string
}

type DashboardRole = 'farmer' | 'distributor' | 'tester' | 'customer'

type StockBatch = {
  id: string
  batchId: string
  source: 'CREATION' | 'PURCHASE'
  qtyKg: number
  ownerRole: 'farmer' | 'distributor'
  published: boolean
}

const flowCards: FlowCard[] = [
  {
    id: '1',
    title: 'Origin Creation',
    note: 'Mencatat batch awal dari petani/koperasi sebagai titik awal trace.',
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
    outputs: ['Chain event tercatat', 'QR / ID publik dibuat'],
  },
  {
    id: '2',
    title: 'Transaction History & Progress',
    note: 'Riwayat transaksi marketplace dan progres pemenuhan order.',
    fields: ['Sales order no', 'Buyer', 'Seller', 'Batch reference', 'Qty', 'Order date', 'Current progress status'],
    status: 'TRACKED',
    outputs: ['Monitoring status order dari NEW sampai DELIVERED/CANCELLED'],
  },
  {
    id: '3',
    title: 'Incoming Order & Shipment',
    note: 'Seller meninjau incoming order dari marketplace lalu memproses pengiriman.',
    decisions: ['CONFIRMED', 'READY_TO_SHIP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
    events: ['Outgoing shipment', 'Delivery confirmation'],
    outputs: ['Status order terbarui sampai barang diterima buyer'],
  },
  {
    id: '4',
    title: 'Split / Repack',
    note: 'Batch dapat dipecah, digabung, atau di-repack sesuai operasi proses.',
    outputs: ['Lineage parent-child tetap deterministik'],
  },
  {
    id: '5',
    title: 'Attestation',
    note: 'Audit pihak ketiga untuk klaim mutu/kepatuhan.',
    fields: ['Lab result', 'Quality grading', 'Organic certification reference'],
    outputs: ['Attestation event', 'Signed by auditor'],
  },
  {
    id: '6',
    title: 'Seal / Snapshot',
    note: 'Checkpoint integritas berbasis window atau milestone.',
    fields: ['Hash commitment', 'Optional blockchain anchor'],
    outputs: ['Bukti anti-tamper periodik'],
  },
  {
    id: '7',
    title: 'Public Verification',
    note: 'Buyer/auditor/regulator memverifikasi bukti via QR/public trace ID.',
    fields: ['Custody chain status', 'Event freshness', 'Attestation references'],
    outputs: ['Read-only evidence untuk pihak eksternal'],
  },
]

const incomingOrderStatuses: IncomingOrderStatus[] = [
  'NEW',
  'CONFIRMED',
  'READY_TO_SHIP',
  'IN_TRANSIT',
  'DELIVERED',
  'CANCELLED',
]
const samplingStatuses: SamplingStatus[] = ['REQUESTED', 'SCHEDULED', 'IN_TEST', 'COMPLETED', 'REJECTED']

const initialTransactionsByStep = flowCards.reduce((accumulator, card) => {
  accumulator[card.id] = [
    {
      id: `TRX-${card.id}-001`,
      batchId: `COF-${card.id}001`,
      actorId: 'ACT-001',
      summary: `Sample transaction untuk ${card.title}`,
      quantity: '1000',
      unit: 'kg',
      eventDate: '2026-03-01',
    },
  ]

  return accumulator
}, {} as Record<string, StepTransaction[]>)

type DashboardPageProps = {
  title?: string
  visibleStepIds?: string[]
  role?: DashboardRole
}

export function DashboardPage({
  title = 'Dashboard - Coffee Use Case v0.2',
  visibleStepIds = flowCards.map((card) => card.id),
  role = 'farmer',
}: DashboardPageProps) {
  const [activeActionId, setActiveActionId] = useState('overview')
  const [transactionPanelMode, setTransactionPanelMode] = useState<'list' | 'add'>('list')
  const [stepTransactions, setStepTransactions] = useState<Record<string, StepTransaction[]>>(
    initialTransactionsByStep,
  )
  const [transactionForm, setTransactionForm] = useState<Omit<StepTransaction, 'id'>>({
    batchId: '',
    actorId: '',
    summary: '',
    quantity: '',
    unit: 'kg',
    eventDate: '',
  })
  const [transactionError, setTransactionError] = useState('')
  const [incomingOrders, setIncomingOrders] = useState<IncomingOrder[]>([
    {
      id: 'ORD-001',
      salesOrderNo: 'SO-2026-0001',
      batchId: 'COF-TRF-0001',
      buyerId: 'BUY-001',
      sellerId: 'SEL-001',
      quantity: '500',
      unit: 'kg',
      orderDate: '2026-03-02',
      status: 'NEW',
    },
    {
      id: 'ORD-002',
      salesOrderNo: 'SO-2026-0002',
      batchId: 'COF-TRF-0002',
      buyerId: 'BUY-002',
      sellerId: 'SEL-001',
      quantity: '800',
      unit: 'kg',
      orderDate: '2026-03-03',
      status: 'READY_TO_SHIP',
    },
    {
      id: 'ORD-003',
      salesOrderNo: 'SO-2026-0003',
      batchId: 'COF-TRF-0003',
      buyerId: 'BUY-003',
      sellerId: 'SEL-002',
      quantity: '650',
      unit: 'kg',
      orderDate: '2026-03-04',
      status: 'IN_TRANSIT',
    },
    {
      id: 'ORD-004',
      salesOrderNo: 'SO-2026-0004',
      batchId: 'COF-TRF-0004',
      buyerId: 'BUY-004',
      sellerId: 'SEL-003',
      quantity: '900',
      unit: 'kg',
      orderDate: '2026-03-05',
      status: 'DELIVERED',
    },
  ])
  const [samplingRequests, setSamplingRequests] = useState<SamplingRequest[]>([
    {
      id: 'SMP-001',
      sourceTransactionId: 'TRX-1-001',
      sourceStepId: '1',
      batchId: 'COF-1001',
      requesterActorId: 'ACT-001',
      requestedDate: '2026-03-02',
      status: 'REQUESTED',
    },
  ])
  const [sealSnapshots, setSealSnapshots] = useState<SealSnapshot[]>([
    {
      id: 'SNP-001',
      stepId: '1',
      trigger: 'Initial origin creation',
      sealedAt: '2026-03-01T09:10:00Z',
      anchorStatus: 'ANCHORED',
    },
  ])
  const [verificationTraceId, setVerificationTraceId] = useState('')
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([
    {
      id: 'VRF-001',
      traceId: 'COF-TRF-0002',
      checkedAt: '2026-03-06T12:30:00Z',
      verdict: 'VERIFIED',
      note: 'Lineage, seal, dan attestation valid.',
    },
  ])
  const [stockBatches, setStockBatches] = useState<StockBatch[]>([
    {
      id: 'STK-001',
      batchId: 'COF-1001',
      source: 'CREATION',
      qtyKg: 1200,
      ownerRole: 'farmer',
      published: true,
    },
    {
      id: 'STK-002',
      batchId: 'COF-1002',
      source: 'CREATION',
      qtyKg: 840,
      ownerRole: 'farmer',
      published: false,
    },
    {
      id: 'STK-003',
      batchId: 'COF-DIS-2001',
      source: 'PURCHASE',
      qtyKg: 600,
      ownerRole: 'distributor',
      published: false,
    },
    {
      id: 'STK-004',
      batchId: 'COF-DIS-2002',
      source: 'PURCHASE',
      qtyKg: 950,
      ownerRole: 'distributor',
      published: true,
    },
  ])

  const filteredFlowCards = flowCards.filter((card) => visibleStepIds.includes(card.id))
  const activeCard = filteredFlowCards.find((card) => card.id === activeActionId)
  const activeTransactions = stepTransactions[activeActionId] ?? []
  const verifiedCount = verificationResults.filter((item) => item.verdict === 'VERIFIED').length
  const flaggedCount = verificationResults.filter((item) => item.verdict === 'FLAGGED').length
  const pendingAnchorCount = sealSnapshots.filter((item) => item.anchorStatus === 'PENDING').length
  const activeSamplingCount = samplingRequests.filter(
    (item) => item.status !== 'COMPLETED' && item.status !== 'REJECTED',
  ).length
  const canAccessStock = role === 'farmer' || role === 'distributor'
  const roleStockBatches = stockBatches.filter((batch) => batch.ownerRole === role)

  const handleActionClick = (actionId: string) => {
    if (actionId === '7') {
      setActiveActionId('overview')
      setTransactionPanelMode('list')
      setTransactionError('')
      document.getElementById('dashboard-verification-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    setActiveActionId(actionId)
    setTransactionPanelMode('list')
    setTransactionError('')
    document.getElementById('dashboard-transaction-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOverviewClick = () => {
    setActiveActionId('overview')
    setTransactionPanelMode('list')
    setTransactionError('')
    document.getElementById('dashboard-overview-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleStockClick = () => {
    setActiveActionId('stock')
    setTransactionPanelMode('list')
    setTransactionError('')
    document.getElementById('dashboard-stock-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleTransactionFieldChange = (field: keyof Omit<StepTransaction, 'id'>, value: string) => {
    setTransactionForm((prev) => ({ ...prev, [field]: value }))
  }

  const createAutoSeal = (stepId: string, trigger: string) => {
    setSealSnapshots((prev) => [
      {
        id: `SNP-${String(prev.length + 1).padStart(3, '0')}`,
        stepId,
        trigger,
        sealedAt: new Date().toISOString(),
        anchorStatus: prev.length % 2 === 0 ? 'ANCHORED' : 'PENDING',
      },
      ...prev,
    ])
  }

  const handleAddTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !transactionForm.batchId ||
      !transactionForm.actorId ||
      !transactionForm.summary ||
      !transactionForm.quantity ||
      !transactionForm.eventDate
    ) {
      setTransactionError('Semua field wajib diisi untuk menambah transaksi.')
      return
    }

    setStepTransactions((prev) => {
      const current = prev[activeActionId] ?? []
      const nextId = `TRX-${activeActionId}-${String(current.length + 1).padStart(3, '0')}`

      return {
        ...prev,
        [activeActionId]: [{ id: nextId, ...transactionForm }, ...current],
      }
    })

    setTransactionForm({
      batchId: '',
      actorId: '',
      summary: '',
      quantity: '',
      unit: 'kg',
      eventDate: '',
    })
    setTransactionError('')
    setTransactionPanelMode('list')
    createAutoSeal(activeActionId, `Submit transaction on Step ${activeActionId}`)
  }

  const handleIncomingOrderStatusChange = (orderId: string, status: IncomingOrderStatus) => {
    setIncomingOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
    createAutoSeal('3', `Update incoming order ${orderId} -> ${status}`)
  }

  const handleRequestSampling = (transaction: StepTransaction, sourceStepId: '1' | '4') => {
    setSamplingRequests((prev) => [
      {
        id: `SMP-${String(prev.length + 1).padStart(3, '0')}`,
        sourceTransactionId: transaction.id,
        sourceStepId,
        batchId: transaction.batchId,
        requesterActorId: transaction.actorId,
        requestedDate: new Date().toISOString().slice(0, 10),
        status: 'REQUESTED',
      },
      ...prev,
    ])
    createAutoSeal(sourceStepId, `Request sampling from ${transaction.id}`)
  }

  const handleSamplingStatusChange = (samplingId: string, status: SamplingStatus) => {
    setSamplingRequests((prev) =>
      prev.map((item) => (item.id === samplingId ? { ...item, status } : item)),
    )
    createAutoSeal('5', `Update sampling status ${samplingId} -> ${status}`)
  }

  const handleVerifyTrace = () => {
    if (!verificationTraceId) {
      return
    }

    const latestSeal = sealSnapshots[0]
    const isVerified = verificationTraceId.length % 2 === 0

    setVerificationResults((prev) => [
      {
        id: `VRF-${String(prev.length + 1).padStart(3, '0')}`,
        traceId: verificationTraceId,
        checkedAt: new Date().toISOString(),
        verdict: isVerified ? 'VERIFIED' : 'FLAGGED',
        note: isVerified
          ? `Seal ditemukan (${latestSeal?.id ?? 'N/A'}) dan konsisten dengan trace.`
          : 'Ada mismatch pada salah satu bukti (lineage/seal/attestation).',
      },
      ...prev,
    ])
    setVerificationTraceId('')
  }

  const getStatusClassName = (status: string) =>
    `transaction-status transaction-status--${status.toLowerCase().replace(/_/g, '-')}`

  const getSamplingStatusClassName = (status: SamplingStatus) =>
    `transaction-status transaction-status--${status.toLowerCase().replace(/_/g, '-')}`

  const handleToggleStockPublish = (stockId: string) => {
    setStockBatches((prev) =>
      prev.map((batch) => (batch.id === stockId ? { ...batch, published: !batch.published } : batch)),
    )
  }

  useEffect(() => {
    if (activeActionId === 'stock') {
      if (!canAccessStock) {
        setActiveActionId('overview')
      }
      return
    }

    if (activeActionId !== 'overview' && !visibleStepIds.includes(activeActionId)) {
      setActiveActionId('overview')
    }
  }, [activeActionId, canAccessStock, visibleStepIds])

  return (
    <section className="page page--wide">
      <div id="dashboard-overview-anchor" />
      <p className="eyebrow">Workspace</p>
      <h1 className="title">{title}</h1>
      <p className="description">
        Alur operasional tenant dari origin sampai verifikasi publik untuk menjaga
        traceability, anti-fraud, dan integrity checkpoint.
      </p>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar" aria-label="Dashboard actions">
          <p className="dashboard-sidebar__title">Actions</p>
          <div className="dashboard-sidebar__list">
            <button
              className={`dashboard-action ${activeActionId === 'overview' ? 'dashboard-action--active' : ''}`}
              onClick={handleOverviewClick}
              type="button"
            >
              Overview
            </button>
            {filteredFlowCards.map((card) => {
              const isActive = activeActionId === card.id
              return (
                <button
                  className={`dashboard-action ${isActive ? 'dashboard-action--active' : ''}`}
                  key={card.id}
                  onClick={() => handleActionClick(card.id)}
                  type="button"
                >
                  {card.title}
                </button>
              )
            })}
            {canAccessStock ? (
              <button
                className={`dashboard-action ${activeActionId === 'stock' ? 'dashboard-action--active' : ''}`}
                onClick={handleStockClick}
                type="button"
              >
                Stock
              </button>
            ) : null}
          </div>
        </aside>

        <div>
          {activeCard ? (
            <section className="transaction-panel">
              <div id="dashboard-transaction-anchor" />
              <article className="workflow-card">
                {activeActionId === '1' ? (
                  <>
                    <h2 className="workflow-title">Origin Creation Transactions</h2>
                    <p className="workflow-note">
                      Step 1 mendukung request sampling test untuk proses lab di Step 5.
                    </p>
                    <div className="transaction-toolbar">
                      <button
                        className={`transaction-toolbar__button ${transactionPanelMode === 'list' ? 'transaction-toolbar__button--active' : ''}`}
                        onClick={() => setTransactionPanelMode('list')}
                        type="button"
                      >
                        List
                      </button>
                      <button
                        className={`transaction-toolbar__button ${transactionPanelMode === 'add' ? 'transaction-toolbar__button--active' : ''}`}
                        onClick={() => setTransactionPanelMode('add')}
                        type="button"
                      >
                        Add New
                      </button>
                    </div>

                    {transactionPanelMode === 'list' ? (
                      <div className="transaction-list">
                        {activeTransactions.map((transaction) => (
                          <div className="transaction-list-item" key={transaction.id}>
                            <p className="transaction-list-item__id">{transaction.id}</p>
                            <p className="transaction-list-item__meta">
                              <strong>{transaction.batchId}</strong> - {transaction.summary}
                            </p>
                            <p className="transaction-list-item__meta">
                              Actor: {transaction.actorId} | Qty: {transaction.quantity} {transaction.unit}
                            </p>
                            <p className="transaction-list-item__meta">Tanggal: {transaction.eventDate}</p>
                            <button
                              className="secondary-button"
                              onClick={() => handleRequestSampling(transaction, '1')}
                              type="button"
                            >
                              Request Sampling Test
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <form className="transaction-form" onSubmit={handleAddTransaction}>
                        <label className="field">
                          <span>Batch ID</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('batchId', event.target.value)}
                            placeholder="COF-ACEH-0002"
                            value={transactionForm.batchId}
                          />
                        </label>
                        <label className="field">
                          <span>Actor ID</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('actorId', event.target.value)}
                            placeholder="ACT-002"
                            value={transactionForm.actorId}
                          />
                        </label>
                        <label className="field">
                          <span>Summary</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('summary', event.target.value)}
                            placeholder={`Transaksi ${activeCard.title}`}
                            value={transactionForm.summary}
                          />
                        </label>
                        <label className="field">
                          <span>Quantity</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('quantity', event.target.value)}
                            placeholder="1000"
                            value={transactionForm.quantity}
                          />
                        </label>
                        <label className="field">
                          <span>Unit</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('unit', event.target.value)}
                            placeholder="kg"
                            value={transactionForm.unit}
                          />
                        </label>
                        <label className="field">
                          <span>Tanggal Event</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('eventDate', event.target.value)}
                            type="date"
                            value={transactionForm.eventDate}
                          />
                        </label>
                        {transactionError ? <p className="transaction-form__error">{transactionError}</p> : null}
                        <button className="primary-button" type="submit">
                          Add Transaction
                        </button>
                      </form>
                    )}
                  </>
                ) : null}

                {activeActionId === '2' ? (
                  <>
                    <h2 className="workflow-title">Transaction History & Progress</h2>
                    <p className="workflow-note">
                      Step 2 menampilkan history transaksi dan status progress order secara kronologis.
                    </p>
                    <div className="transaction-list">
                      {incomingOrders.map((order) => (
                        <div className="transaction-list-item" key={`${order.id}-history`}>
                          <p className="transaction-list-item__id">{order.id}</p>
                          <p className="transaction-list-item__meta">
                            <strong>{order.salesOrderNo}</strong> - Batch <strong>{order.batchId}</strong>
                          </p>
                          <p className="transaction-list-item__meta">
                            Buyer: {order.buyerId} | Seller: {order.sellerId} | Qty: {order.quantity} {order.unit}
                          </p>
                          <p className="transaction-list-item__meta">Order Date: {order.orderDate}</p>
                          <p className="transaction-list-item__meta">
                            Progress: <span className={getStatusClassName(order.status)}>{order.status}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {activeActionId === '3' ? (
                  <>
                    <h2 className="workflow-title">Incoming Orders (Need Shipment)</h2>
                    <p className="workflow-note">
                      Incoming order dari marketplace diproses di sini sampai barang dikirim/diterima.
                    </p>
                    <div className="transaction-list">
                      {incomingOrders.map((order) => (
                        <div className="transaction-list-item" key={order.id}>
                          <p className="transaction-list-item__id">{order.id}</p>
                          <p className="transaction-list-item__meta">
                            <strong>{order.salesOrderNo}</strong> - Batch <strong>{order.batchId}</strong>
                          </p>
                          <p className="transaction-list-item__meta">
                            Buyer: {order.buyerId} | Seller: {order.sellerId} | Qty: {order.quantity} {order.unit}
                          </p>
                          <p className="transaction-list-item__meta">
                            Order Date: {order.orderDate}
                          </p>
                          <label className="field">
                            <span>Shipment Status</span>
                            <select
                              onChange={(event) =>
                                handleIncomingOrderStatusChange(order.id, event.target.value as IncomingOrderStatus)
                              }
                              value={order.status}
                            >
                              {incomingOrderStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </label>
                          <p className="transaction-list-item__meta">
                            <span className={getStatusClassName(order.status)}>{order.status}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {activeActionId === '5' ? (
                  <>
                    <h2 className="workflow-title">Sampling Test Queue (Step 5 Lab Attestation)</h2>
                    <p className="workflow-note">
                      Request sampling dibuat dari Step 1, lalu diproses dan dikonfirmasi statusnya di Step 5.
                    </p>
                    <div className="transaction-list">
                      {samplingRequests.map((sampling) => (
                        <div className="transaction-list-item" key={sampling.id}>
                          <p className="transaction-list-item__id">{sampling.id}</p>
                          <p className="transaction-list-item__meta">
                            Source: Step {sampling.sourceStepId} | Ref: <strong>{sampling.sourceTransactionId}</strong> | Batch:{' '}
                            {sampling.batchId}
                          </p>
                          <p className="transaction-list-item__meta">
                            Requester: {sampling.requesterActorId} | Requested Date: {sampling.requestedDate}
                          </p>
                          <p className="transaction-list-item__meta">
                            <span className={getSamplingStatusClassName(sampling.status)}>{sampling.status}</span>
                          </p>
                          <label className="field">
                            <span>Update Status Lab</span>
                            <select
                              onChange={(event) =>
                                handleSamplingStatusChange(sampling.id, event.target.value as SamplingStatus)
                              }
                              value={sampling.status}
                            >
                              {samplingStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {activeActionId === '6' ? (
                  <>
                    <h2 className="workflow-title">Auto Seal / Snapshot (System)</h2>
                    <p className="workflow-note">
                      Step 6 dieksekusi otomatis setiap submit event penting. Tidak perlu input manual.
                    </p>
                    <div className="transaction-list">
                      {sealSnapshots.map((seal) => (
                        <div className="transaction-list-item" key={seal.id}>
                          <p className="transaction-list-item__id">{seal.id}</p>
                          <p className="transaction-list-item__meta">
                            Trigger: <strong>{seal.trigger}</strong> (Step {seal.stepId})
                          </p>
                          <p className="transaction-list-item__meta">Sealed At: {seal.sealedAt}</p>
                          <p className="transaction-list-item__meta">
                            Anchor Status: <span className={getStatusClassName(seal.anchorStatus)}>{seal.anchorStatus}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {activeActionId !== '1' &&
                activeActionId !== '2' &&
                activeActionId !== '3' &&
                activeActionId !== '5' &&
                activeActionId !== '6' ? (
                  <>
                    <h2 className="workflow-title">{activeCard.title} Transactions</h2>
                    <p className="workflow-note">
                      Kelola transaksi untuk proses yang sedang dipilih di sidebar.
                    </p>
                    <div className="transaction-toolbar">
                      <button
                        className={`transaction-toolbar__button ${transactionPanelMode === 'list' ? 'transaction-toolbar__button--active' : ''}`}
                        onClick={() => setTransactionPanelMode('list')}
                        type="button"
                      >
                        List
                      </button>
                      <button
                        className={`transaction-toolbar__button ${transactionPanelMode === 'add' ? 'transaction-toolbar__button--active' : ''}`}
                        onClick={() => setTransactionPanelMode('add')}
                        type="button"
                      >
                        Add New
                      </button>
                    </div>

                    {transactionPanelMode === 'list' ? (
                      <div className="transaction-list">
                        {activeTransactions.map((transaction) => (
                          <div className="transaction-list-item" key={transaction.id}>
                            <p className="transaction-list-item__id">{transaction.id}</p>
                            <p className="transaction-list-item__meta">
                              <strong>{transaction.batchId}</strong> - {transaction.summary}
                            </p>
                            <p className="transaction-list-item__meta">
                              Actor: {transaction.actorId} | Qty: {transaction.quantity} {transaction.unit}
                            </p>
                            <p className="transaction-list-item__meta">Tanggal: {transaction.eventDate}</p>
                            {activeActionId === '4' ? (
                              <button
                                className="secondary-button"
                                onClick={() => handleRequestSampling(transaction, '4')}
                                type="button"
                              >
                                Request Sampling Test
                              </button>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <form className="transaction-form" onSubmit={handleAddTransaction}>
                        <label className="field">
                          <span>Batch ID</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('batchId', event.target.value)}
                            placeholder="COF-ACEH-0002"
                            value={transactionForm.batchId}
                          />
                        </label>
                        <label className="field">
                          <span>Actor ID</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('actorId', event.target.value)}
                            placeholder="ACT-002"
                            value={transactionForm.actorId}
                          />
                        </label>
                        <label className="field">
                          <span>Summary</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('summary', event.target.value)}
                            placeholder={`Transaksi ${activeCard.title}`}
                            value={transactionForm.summary}
                          />
                        </label>
                        <label className="field">
                          <span>Quantity</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('quantity', event.target.value)}
                            placeholder="1000"
                            value={transactionForm.quantity}
                          />
                        </label>
                        <label className="field">
                          <span>Unit</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('unit', event.target.value)}
                            placeholder="kg"
                            value={transactionForm.unit}
                          />
                        </label>
                        <label className="field">
                          <span>Tanggal Event</span>
                          <input
                            onChange={(event) => handleTransactionFieldChange('eventDate', event.target.value)}
                            type="date"
                            value={transactionForm.eventDate}
                          />
                        </label>
                        {transactionError ? <p className="transaction-form__error">{transactionError}</p> : null}
                        <button className="primary-button" type="submit">
                          Add Transaction
                        </button>
                      </form>
                    )}
                  </>
                ) : null}
              </article>
            </section>
          ) : null}

          {activeActionId === 'overview' ? (
            <>
              <section className="dashboard-main-panel" id="dashboard-verification-main">
                <article className="workflow-card">
                  <h2 className="workflow-title">Step 7 - Public Verification (Main Dashboard)</h2>
                  <p className="workflow-note">
                    Verifikasi publik menjadi tampilan utama dashboard: scan QR / input trace ID, lalu cek bukti.
                  </p>
                  <div className="scorecard-grid">
                    <div className="scorecard">
                      <p className="scorecard__label">Verified</p>
                      <p className="scorecard__value">{verifiedCount}</p>
                    </div>
                    <div className="scorecard">
                      <p className="scorecard__label">Flagged</p>
                      <p className="scorecard__value">{flaggedCount}</p>
                    </div>
                    <div className="scorecard">
                      <p className="scorecard__label">Pending Anchor</p>
                      <p className="scorecard__value">{pendingAnchorCount}</p>
                    </div>
                    <div className="scorecard">
                      <p className="scorecard__label">Active Sampling</p>
                      <p className="scorecard__value">{activeSamplingCount}</p>
                    </div>
                  </div>
                  <div className="transaction-toolbar">
                    <button
                      className="transaction-toolbar__button"
                      onClick={() => setVerificationTraceId('COF-TRF-0002')}
                      type="button"
                    >
                      Scan QR (Mock)
                    </button>
                  </div>
                  <div className="verification-box">
                    <label className="field">
                      <span>Trace ID</span>
                      <input
                        onChange={(event) => setVerificationTraceId(event.target.value)}
                        placeholder="Masukkan trace id atau hasil scan QR"
                        value={verificationTraceId}
                      />
                    </label>
                    <button className="primary-button" onClick={handleVerifyTrace} type="button">
                      Verify Trace
                    </button>
                  </div>
                  <div className="transaction-list">
                    {verificationResults.map((result) => (
                      <div className="transaction-list-item" key={result.id}>
                        <p className="transaction-list-item__id">{result.id}</p>
                        <p className="transaction-list-item__meta">
                          Trace: <strong>{result.traceId}</strong> | Checked At: {result.checkedAt}
                        </p>
                        <p className="transaction-list-item__meta">
                          Verdict:{' '}
                          <span className={getStatusClassName(result.verdict === 'VERIFIED' ? 'APPROVED' : 'REJECTED')}>
                            {result.verdict}
                          </span>
                        </p>
                        <p className="transaction-list-item__meta">{result.note}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>
          ) : null}

          {activeActionId === 'stock' && canAccessStock ? (
            <section className="transaction-panel" id="dashboard-stock-main">
              <article className="workflow-card">
                <h2 className="workflow-title">Stock Batches</h2>
                <p className="workflow-note">
                  Batch produk masuk dari creation/purchase. Tentukan publish ke marketplace per batch.
                </p>
                <div className="dashboard-stock-list">
                  {roleStockBatches.map((batch) => (
                    <article className="dashboard-stock-item" key={batch.id}>
                      <p className="dashboard-stock-item__id">{batch.id}</p>
                      <p className="dashboard-stock-item__meta">
                        Batch: <strong>{batch.batchId}</strong>
                      </p>
                      <p className="dashboard-stock-item__meta">
                        Source: {batch.source === 'CREATION' ? 'Creation' : 'Purchase'} | Qty: {batch.qtyKg} kg
                      </p>
                      <p className="dashboard-stock-item__meta">
                        Marketplace:{' '}
                        <span className={getStatusClassName(batch.published ? 'APPROVED' : 'PENDING')}>
                          {batch.published ? 'PUBLISHED' : 'NOT_PUBLISHED'}
                        </span>
                      </p>
                      <button
                        className="secondary-button"
                        onClick={() => handleToggleStockPublish(batch.id)}
                        type="button"
                      >
                        {batch.published ? 'Unpublish from Marketplace' : 'Publish to Marketplace'}
                      </button>
                    </article>
                  ))}
                </div>
              </article>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  )
}
