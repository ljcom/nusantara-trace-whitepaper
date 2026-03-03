import { Link } from 'react-router-dom'

export function CreateTenantPage() {
  return (
    <section className="page">
      <p className="eyebrow">Tenant Setup</p>
      <h1 className="title">Create Tenant</h1>
      <p className="description">
        Buat tenant baru untuk mulai menggunakan Nusantara Trace.
      </p>

      <form className="form-card" onSubmit={(event) => event.preventDefault()}>
        <label className="field">
          <span>Tenant Name</span>
          <input type="text" name="tenantName" placeholder="PT Nusantara Logistik" />
        </label>
        <label className="field">
          <span>Admin Email</span>
          <input type="email" name="adminEmail" placeholder="admin@tenant.com" />
        </label>
        <label className="field">
          <span>Company Domain</span>
          <input type="text" name="companyDomain" placeholder="tenant.nusantaratrace.id" />
        </label>
        <button className="primary-button" type="submit">
          Create Tenant
        </button>
      </form>

      <p className="inline-note">
        Tenant sudah punya akun? <Link to="/signin">Lanjut ke Sign In</Link>
      </p>
    </section>
  )
}
