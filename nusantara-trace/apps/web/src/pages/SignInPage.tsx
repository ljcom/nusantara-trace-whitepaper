import { Link } from 'react-router-dom'

export function SignInPage() {
  return (
    <section className="page">
      <p className="eyebrow">Access</p>
      <h1 className="title">Sign In</h1>
      <p className="description">
        Masuk ke tenant kamu dan lanjutkan pemantauan trace di dashboard.
      </p>

      <form className="form-card" onSubmit={(event) => event.preventDefault()}>
        <label className="field">
          <span>Email</span>
          <input type="email" name="email" placeholder="admin@tenant.com" />
        </label>
        <label className="field">
          <span>Password</span>
          <input type="password" name="password" placeholder="********" />
        </label>
        <Link className="text-link" to="/dashboard">
          Continue to Dashboard
        </Link>
      </form>

      <p className="inline-note">
        Belum punya tenant? <Link to="/create-tenant">Create Tenant</Link>
      </p>
    </section>
  )
}
