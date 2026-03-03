import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/create-tenant', label: 'Create Tenant' },
  { to: '/signin', label: 'Sign In' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header__inner">
          <p className="brand">Nusantara Trace</p>
          <nav className="app-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `app-nav__link${isActive ? ' app-nav__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <small>Nusantara Trace mockup flow: tenant setup, sign in, dashboard</small>
        </div>
      </footer>
    </div>
  )
}
