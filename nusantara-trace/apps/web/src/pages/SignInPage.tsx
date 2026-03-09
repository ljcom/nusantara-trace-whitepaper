import { Link } from 'react-router-dom'

const roleLinks = [
  { to: '/dashboard-farmer', label: 'Continue as Farmer' },
  { to: '/dashboard-distributor', label: 'Continue as Distributor' },
  { to: '/dashboard-tester', label: 'Continue as Lab Tester' },
  { to: '/dashboard-customer', label: 'Continue as Customer' },
]

export function SignInPage() {
  return (
    <section className="page page--wide">
      <p className="eyebrow">Access</p>
      <h1 className="title">Sign In</h1>
      <p className="description">
        Masuk ke tenant kamu dan lanjutkan pemantauan trace di dashboard.
      </p>

      <div className="signin-layout">
        <form className="form-card" onSubmit={(event) => event.preventDefault()}>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" placeholder="admin@tenant.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" placeholder="********" />
          </label>
          <Link className="text-link" to="/dashboard-farmer">
            Continue to Dashboard
          </Link>
        </form>

        <aside className="signin-role-card">
          <p className="workflow-section-title">Quick Role Access</p>
          <div className="signin-role-list">
            {roleLinks.map((role) => (
              <Link className="signin-role-link" key={role.to} to={role.to}>
                {role.label}
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <p className="inline-note">
        Belum punya tenant? <Link to="/create-tenant">Create Tenant</Link>
      </p>
    </section>
  )
}
