import { useMemo, useState } from 'react'

type Product = {
  id: string
  title: string
  imageUrl: string
  origin: string
  grade: string
  stockKg: number
  pricePerKg: number
}

type CartItem = {
  productId: string
  qtyKg: number
}

const products: Product[] = [
  {
    id: 'P-001',
    title: 'Arabica Gayo Premium',
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    origin: 'Aceh',
    grade: 'Specialty Grade 1',
    stockKg: 1200,
    pricePerKg: 128000,
  },
  {
    id: 'P-002',
    title: 'Toraja Washed Bean',
    imageUrl:
      'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1200&q=80',
    origin: 'Toraja',
    grade: 'Grade 1',
    stockKg: 860,
    pricePerKg: 116000,
  },
  {
    id: 'P-003',
    title: 'Java Preanger Natural',
    imageUrl:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    origin: 'West Java',
    grade: 'Specialty Grade 2',
    stockKg: 540,
    pricePerKg: 109000,
  },
]

const rupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export function MarketplacePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'delivery' | 'payment'>('cart')

  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          if (!product) {
            return null
          }

          return {
            ...item,
            product,
            subtotal: item.qtyKg * product.pricePerKg,
          }
        })
        .filter((value): value is NonNullable<typeof value> => Boolean(value)),
    [cart],
  )

  const totalPrice = useMemo(() => cartDetails.reduce((sum, item) => sum + item.subtotal, 0), [cartDetails])

  const handleAddToCart = (productId: string) => {
    setCart((prev) => {
      const found = prev.find((item) => item.productId === productId)
      if (found) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, qtyKg: item.qtyKg + 50 } : item,
        )
      }

      return [...prev, { productId, qtyKg: 100 }]
    })
    setCheckoutStep('cart')
  }

  const handleQtyChange = (productId: string, qtyKg: number) => {
    if (qtyKg <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId))
      return
    }

    setCart((prev) => prev.map((item) => (item.productId === productId ? { ...item, qtyKg } : item)))
  }

  return (
    <section className="page page--wide">
      <p className="eyebrow">Marketplace</p>
      <h1 className="title">Coffee Marketplace</h1>
      <p className="description">
        Pilih produk, lanjutkan ke cart, atur delivery, lalu selesaikan payment.
      </p>

      <div className="market-grid">
        {products.map((product) => (
          <article className="market-card" key={product.id}>
            <img alt={product.title} className="market-card__image" src={product.imageUrl} />
            <div className="market-card__content">
              <h2 className="market-card__title">{product.title}</h2>
              <p className="market-card__meta">Origin: {product.origin}</p>
              <p className="market-card__meta">Grade: {product.grade}</p>
              <p className="market-card__meta">Stock: {product.stockKg} kg</p>
              <p className="market-card__price">{rupiah(product.pricePerKg)} / kg</p>
              <button className="primary-button" onClick={() => handleAddToCart(product.id)} type="button">
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="checkout-panel">
        <div className="checkout-steps">
          <button
            className={`checkout-step ${checkoutStep === 'cart' ? 'checkout-step--active' : ''}`}
            onClick={() => setCheckoutStep('cart')}
            type="button"
          >
            1. Cart
          </button>
          <button
            className={`checkout-step ${checkoutStep === 'delivery' ? 'checkout-step--active' : ''}`}
            disabled={cartDetails.length === 0}
            onClick={() => setCheckoutStep('delivery')}
            type="button"
          >
            2. Delivery
          </button>
          <button
            className={`checkout-step ${checkoutStep === 'payment' ? 'checkout-step--active' : ''}`}
            disabled={cartDetails.length === 0}
            onClick={() => setCheckoutStep('payment')}
            type="button"
          >
            3. Payment
          </button>
        </div>

        {checkoutStep === 'cart' ? (
          <article className="workflow-card">
            <h2 className="workflow-title">Cart</h2>
            {cartDetails.length === 0 ? (
              <p className="workflow-note">Belum ada produk di cart.</p>
            ) : (
              <div className="transaction-list">
                {cartDetails.map((item) => (
                  <div className="transaction-list-item" key={item.product.id}>
                    <p className="transaction-list-item__meta">
                      <strong>{item.product.title}</strong>
                    </p>
                    <label className="field">
                      <span>Qty (kg)</span>
                      <input
                        min={50}
                        onChange={(event) => handleQtyChange(item.product.id, Number(event.target.value))}
                        step={50}
                        type="number"
                        value={item.qtyKg}
                      />
                    </label>
                    <p className="transaction-list-item__meta">Subtotal: {rupiah(item.subtotal)}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="market-total">Total: {rupiah(totalPrice)}</p>
            <button
              className="primary-button"
              disabled={cartDetails.length === 0}
              onClick={() => setCheckoutStep('delivery')}
              type="button"
            >
              Lanjut ke Delivery
            </button>
          </article>
        ) : null}

        {checkoutStep === 'delivery' ? (
          <article className="workflow-card">
            <h2 className="workflow-title">Delivery</h2>
            <form className="transaction-form" onSubmit={(event) => event.preventDefault()}>
              <label className="field">
                <span>Receiver Name</span>
                <input placeholder="PT Roastery Nusantara" />
              </label>
              <label className="field">
                <span>Delivery Address</span>
                <input placeholder="Jl. Industri Kopi No. 10, Bandung" />
              </label>
              <label className="field">
                <span>Courier</span>
                <select defaultValue="">
                  <option value="" disabled>
                    Pilih kurir
                  </option>
                  <option value="truck">Truck Logistics</option>
                  <option value="container">Container Freight</option>
                </select>
              </label>
              <button className="primary-button" onClick={() => setCheckoutStep('payment')} type="button">
                Lanjut ke Payment
              </button>
            </form>
          </article>
        ) : null}

        {checkoutStep === 'payment' ? (
          <article className="workflow-card">
            <h2 className="workflow-title">Payment</h2>
            <p className="workflow-note">Pilih metode pembayaran untuk menyelesaikan order.</p>
            <form className="transaction-form" onSubmit={(event) => event.preventDefault()}>
              <label className="field">
                <span>Payment Method</span>
                <select defaultValue="">
                  <option value="" disabled>
                    Pilih metode
                  </option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="virtual_account">Virtual Account</option>
                  <option value="escrow">Escrow</option>
                </select>
              </label>
              <p className="market-total">Total Pembayaran: {rupiah(totalPrice)}</p>
              <button className="primary-button" type="button">
                Confirm Payment
              </button>
            </form>
          </article>
        ) : null}
      </section>
    </section>
  )
}
