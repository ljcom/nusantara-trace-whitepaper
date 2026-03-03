import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page">
      <p className="eyebrow">404</p>
      <h1 className="title">Halaman tidak ditemukan</h1>
      <p className="description">
        URL yang kamu buka belum tersedia pada tahap mockup ini.
      </p>
      <Link to="/home" className="button-link">
        Kembali ke Home
      </Link>
    </section>
  )
}
