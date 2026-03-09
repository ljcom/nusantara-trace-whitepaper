import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const signupRoles = [
  { id: 'farmer', label: 'Farmer (Producer)' },
  { id: 'distributor', label: 'Distributor' },
  { id: 'lab', label: 'Lab Tester' },
  { id: 'customer', label: 'Customer' },
] as const

type RoleId = (typeof signupRoles)[number]['id']
type VerificationStatus = 'DRAFT' | 'PENDING_VERIFICATION' | 'VERIFIED_LIMITED' | 'VERIFIED_FULL'

const roleRequirements: Record<RoleId, string[]> = {
  farmer: ['Bukti kebun / koperasi', 'Lokasi produksi', 'Kapasitas produksi'],
  distributor: ['Dokumen legal usaha', 'Alamat gudang', 'Izin distribusi'],
  lab: ['Sertifikat akreditasi lab', 'Scope pengujian', 'Masa berlaku lisensi'],
  customer: ['Profil perusahaan pembeli', 'Alamat penerimaan', 'PIC procurement'],
}

export function CreateTenantPage() {
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1)
  const [selectedRole, setSelectedRole] = useState<RoleId>('farmer')
  const [status, setStatus] = useState<VerificationStatus>('DRAFT')
  const [error, setError] = useState('')
  const [signupForm, setSignupForm] = useState({
    tenantName: '',
    adminEmail: '',
    adminPhone: '',
    otpCode: '',
    companyDomain: '',
    termsAccepted: false,
  })
  const [requirementChecks, setRequirementChecks] = useState<Record<string, boolean>>({})

  const selectedRoleLabel = signupRoles.find((role) => role.id === selectedRole)?.label ?? 'Selected Role'

  const activeRequirements = useMemo(() => roleRequirements[selectedRole], [selectedRole])

  const allRequirementsChecked =
    activeRequirements.length > 0 &&
    activeRequirements.every((item) => Boolean(requirementChecks[`${selectedRole}-${item}`]))

  const handleContinueToSignup = () => {
    setWizardStep(2)
    setError('')
  }

  const handleSignUp = () => {
    if (
      !signupForm.tenantName ||
      !signupForm.adminEmail ||
      !signupForm.adminPhone ||
      !signupForm.otpCode ||
      !signupForm.companyDomain
    ) {
      setError('Lengkapi semua field validasi minimum sebelum lanjut.')
      return
    }

    if (!signupForm.termsAccepted) {
      setError('Kamu harus menyetujui terms & consent data.')
      return
    }

    setError('')
    setStatus('PENDING_VERIFICATION')
    setWizardStep(3)
  }

  const handleSubmitVerification = () => {
    if (!allRequirementsChecked) {
      setError('Checklist verifikasi profile harus lengkap sebelum submit.')
      return
    }

    setError('')
    setStatus('VERIFIED_LIMITED')
  }

  const statusClassName = `transaction-status transaction-status--${status.toLowerCase().replace(/_/g, '-')}`

  return (
    <section className="page">
      <p className="eyebrow">Tenant Setup</p>
      <h1 className="title">Sign Up Wizard</h1>
      <p className="description">
        Validasi minimum dilakukan saat sign up, lalu verifikasi profile berbasis role dilakukan setelah akun dibuat.
      </p>

      <form className="form-card" onSubmit={(event) => event.preventDefault()}>
        <p className="wizard-step">Step {wizardStep} of 3</p>

        {wizardStep === 1 ? (
          <>
            <p className="workflow-note">Pilih role akun saat sign up.</p>
            <div className="role-grid">
              {signupRoles.map((role) => (
                <button
                  className={`role-option ${selectedRole === role.id ? 'role-option--active' : ''}`}
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  type="button"
                >
                  {role.label}
                </button>
              ))}
            </div>
            <button className="primary-button" onClick={handleContinueToSignup} type="button">
              Continue
            </button>
          </>
        ) : null}

        {wizardStep === 2 ? (
          <>
            <p className="workflow-note">
              Role terpilih: <strong>{selectedRoleLabel}</strong>
            </p>
            <label className="field">
              <span>Tenant Name</span>
              <input
                onChange={(event) => setSignupForm((prev) => ({ ...prev, tenantName: event.target.value }))}
                placeholder="PT Nusantara Logistik"
                type="text"
                value={signupForm.tenantName}
              />
            </label>
            <label className="field">
              <span>Admin Email</span>
              <input
                onChange={(event) => setSignupForm((prev) => ({ ...prev, adminEmail: event.target.value }))}
                placeholder="admin@tenant.com"
                type="email"
                value={signupForm.adminEmail}
              />
            </label>
            <label className="field">
              <span>Admin Phone</span>
              <input
                onChange={(event) => setSignupForm((prev) => ({ ...prev, adminPhone: event.target.value }))}
                placeholder="+62-812-0000-0000"
                type="text"
                value={signupForm.adminPhone}
              />
            </label>
            <label className="field">
              <span>OTP Code</span>
              <input
                onChange={(event) => setSignupForm((prev) => ({ ...prev, otpCode: event.target.value }))}
                placeholder="123456"
                type="text"
                value={signupForm.otpCode}
              />
            </label>
            <label className="field">
              <span>Company Domain</span>
              <input
                onChange={(event) => setSignupForm((prev) => ({ ...prev, companyDomain: event.target.value }))}
                placeholder="tenant.nusantaratrace.id"
                type="text"
                value={signupForm.companyDomain}
              />
            </label>
            <label className="wizard-check">
              <input
                checked={signupForm.termsAccepted}
                onChange={(event) => setSignupForm((prev) => ({ ...prev, termsAccepted: event.target.checked }))}
                type="checkbox"
              />
              <span>Saya setuju terms of service dan consent pemrosesan data.</span>
            </label>

            <div className="wizard-actions">
              <button className="text-link" onClick={() => setWizardStep(1)} type="button">
                Back
              </button>
              <button className="primary-button" onClick={handleSignUp} type="button">
                Create Account
              </button>
            </div>
          </>
        ) : null}

        {wizardStep === 3 ? (
          <>
            <p className="workflow-note">
              Role: <strong>{selectedRoleLabel}</strong>
            </p>
            <p className="workflow-note">
              Account Status: <span className={statusClassName}>{status}</span>
            </p>

            <div className="verification-list">
              {activeRequirements.map((requirement) => {
                const key = `${selectedRole}-${requirement}`
                return (
                  <label className="wizard-check" key={requirement}>
                    <input
                      checked={Boolean(requirementChecks[key])}
                      onChange={(event) =>
                        setRequirementChecks((prev) => ({ ...prev, [key]: event.target.checked }))
                      }
                      type="checkbox"
                    />
                    <span>{requirement}</span>
                  </label>
                )
              })}
            </div>

            <div className="wizard-actions">
              <button className="text-link" onClick={() => setWizardStep(2)} type="button">
                Back
              </button>
              <button className="primary-button" onClick={handleSubmitVerification} type="button">
                Submit Profile Verification
              </button>
            </div>

            {status === 'VERIFIED_LIMITED' ? (
              <button className="primary-button" onClick={() => setStatus('VERIFIED_FULL')} type="button">
                Request Full Verification
              </button>
            ) : null}
          </>
        ) : null}

        {error ? <p className="transaction-form__error">{error}</p> : null}
      </form>

      <p className="inline-note">
        Tenant sudah punya akun? <Link to="/signin">Lanjut ke Sign In</Link>
      </p>
    </section>
  )
}
