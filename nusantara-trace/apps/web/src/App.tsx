import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AboutPage } from './pages/AboutPage'
import { CreateTenantPage } from './pages/CreateTenantPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { MarketplacePage } from './pages/MarketplacePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate replace to="signin" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="create-tenant" element={<CreateTenantPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route
            path="dashboard"
            element={<DashboardPage title="Farmer Dashboard" visibleStepIds={['1', '3', '4']} role="farmer" />}
          />
          <Route
            path="dashboard-farmer"
            element={<DashboardPage title="Farmer Dashboard" visibleStepIds={['1', '3', '4']} role="farmer" />}
          />
          <Route
            path="dashboard-tester"
            element={<DashboardPage title="Lab Tester Dashboard" visibleStepIds={['5']} role="tester" />}
          />
          <Route
            path="dashboard-distributor"
            element={
              <DashboardPage title="Distributor Dashboard" visibleStepIds={['2', '3', '4']} role="distributor" />
            }
          />
          <Route
            path="dashboard-customer"
            element={<DashboardPage title="Customer Dashboard" visibleStepIds={['2']} role="customer" />}
          />
          <Route path="marketplace" element={<MarketplacePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
