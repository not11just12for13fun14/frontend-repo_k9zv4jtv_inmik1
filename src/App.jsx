import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const technologies = ['Python', 'Java', 'AI/ML', 'IoT', 'Web', 'Android']

function Navbar({ onAuthOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-white/60 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0A1D41] text-white grid place-items-center font-bold">A&V</div>
          <span className="font-semibold text-[#0A1D41]">TechSolutions</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#0A1D41]">
          <a href="#about" className="hover:text-[#4FC3F7]">About</a>
          <a href="#services" className="hover:text-[#4FC3F7]">Services</a>
          <a href="#tech" className="hover:text-[#4FC3F7]">Technologies</a>
          <a href="#contact" className="hover:text-[#4FC3F7]">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => onAuthOpen('login')} className="px-4 py-2 rounded-lg text-[#0A1D41] hover:bg-[#0A1D41]/5">Login</button>
          <button onClick={() => onAuthOpen('register')} className="px-4 py-2 rounded-lg bg-[#4FC3F7] text-[#0A1D41] font-semibold hover:brightness-95">Register</button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative h-[80vh] grid place-items-center overflow-hidden" id="hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">Student Project Portal</h1>
        <p className="mt-4 text-white/90 text-lg md:text-xl">Register, request your project, pay securely, and track every step — all in one place.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#register" className="px-6 py-3 rounded-xl bg-white text-[#0A1D41] font-semibold hover:opacity-90">Register Now</a>
          <a href="#login" className="px-6 py-3 rounded-xl bg-[#0A1D41] text-white font-semibold hover:opacity-90">Login</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A1D41]/30 via-transparent to-white"></div>
    </section>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A1D41] mb-8">{title}</h2>
        {children}
      </div>
    </section>
  )
}

function Services() {
  const items = [
    { title: 'Final Year Projects', desc: 'End-to-end guidance with code, report, and PPT.' },
    { title: 'Custom Development', desc: 'Tailored solutions for web, mobile, and embedded.' },
  ]
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((i) => (
        <div key={i.title} className="rounded-2xl border border-[#0A1D41]/10 p-6 shadow-sm hover:shadow-md transition bg-white">
          <h3 className="text-[#0A1D41] font-semibold text-lg">{i.title}</h3>
          <p className="text-[#0A1D41]/70 mt-2">{i.desc}</p>
        </div>
      ))}
    </div>
  )
}

function Technologies() {
  return (
    <div className="flex flex-wrap gap-3">
      {technologies.map((t) => (
        <span key={t} className="px-4 py-2 rounded-full bg-[#4FC3F7]/20 text-[#0A1D41]">{t}</span>
      ))}
    </div>
  )
}

function Contact() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-[#0A1D41]">Contact</h3>
        <p className="text-[#0A1D41]/70 mt-2">Email: support@avtechsolutions.com</p>
        <p className="text-[#0A1D41]/70">Phone: +91 98765 43210</p>
        <p className="text-[#0A1D41]/70">Location: Hyderabad, India</p>
      </div>
      <div className="rounded-2xl bg-[#0A1D41] text-white p-6">
        <p>UPI ID: avtechsolutions@upi</p>
        <p className="opacity-80 text-sm mt-1">Use this for manual payments. Upload proof from your dashboard.</p>
      </div>
    </div>
  )
}

function AuthModal({ mode, onClose, onLoggedIn }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    const endpoint = mode === 'register' ? '/api/register' : '/api/login'
    const body = mode === 'register' ? { name, email } : { email }
    const res = await fetch(baseUrl + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (data?.id) {
      localStorage.setItem('av_user', JSON.stringify(data))
      onLoggedIn(data)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/40 grid place-items-center">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#0A1D41]">{mode === 'register' ? 'Register' : 'Login'}</h3>
          <button onClick={onClose} className="text-[#0A1D41]/70">✕</button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-3">
          {mode === 'register' && (
            <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Full Name" className="w-full px-4 py-2 rounded-xl border" />
          )}
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full px-4 py-2 rounded-xl border" />
          <button className="w-full bg-[#4FC3F7] text-[#0A1D41] font-semibold rounded-xl py-2">{mode === 'register' ? 'Create account' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}

function Dashboard({ user }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [projects, setProjects] = useState([])
  const [payments, setPayments] = useState([])
  const [form, setForm] = useState({ title: '', technology: technologies[0], description: '' })
  const [amount, setAmount] = useState('')
  const [proof, setProof] = useState(null)

  const load = async () => {
    const p = await fetch(`${baseUrl}/api/projects?studentId=${user.id}`).then(r=>r.json())
    const pays = await fetch(`${baseUrl}/api/payments?studentId=${user.id}`).then(r=>r.json())
    setProjects(p)
    setPayments(pays)
  }

  useEffect(() => { load() }, [])

  const submitProject = async (e) => {
    e.preventDefault()
    let fileUrl
    if (proof) {
      const fd = new FormData()
      fd.append('file', proof)
      const up = await fetch(`${baseUrl}/api/upload`, { method: 'POST', body: fd }).then(r=>r.json())
      fileUrl = up.url
    }
    await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: user.id, title: form.title, technology: form.technology, description: form.description, fileUrl })
    })
    setForm({ title: '', technology: technologies[0], description: '' })
    setProof(null)
    await load()
  }

  const makePayment = async (e) => {
    e.preventDefault()
    let proofUrl
    if (proof) {
      const fd = new FormData()
      fd.append('file', proof)
      const up = await fetch(`${baseUrl}/api/upload`, { method: 'POST', body: fd }).then(r=>r.json())
      proofUrl = up.url
    }
    await fetch(`${baseUrl}/api/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: user.id, amount: Number(amount), paymentProofURL: proofUrl })
    })
    setAmount('')
    setProof(null)
    await load()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#0A1D41]">Welcome, {user.name}</h2>
        <p className="text-[#0A1D41]/70">Submit your project, upload payment proof, and track progress.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-[#0A1D41]">Submit Project Request</h3>
            <form onSubmit={submitProject} className="mt-4 space-y-3">
              <input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required placeholder="Project Title" className="w-full px-4 py-2 rounded-xl border" />
              <select value={form.technology} onChange={(e)=>setForm({...form, technology:e.target.value})} className="w-full px-4 py-2 rounded-xl border">
                {technologies.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full px-4 py-2 rounded-xl border min-h-[120px]" />
              <input type="file" onChange={(e)=>setProof(e.target.files?.[0]||null)} className="w-full" />
              <button className="w-full bg-[#0A1D41] text-white rounded-xl py-2">Submit</button>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-[#0A1D41]">Make Payment (Manual)</h3>
            <p className="text-sm text-[#0A1D41]/70">UPI: avtechsolutions@upi. Upload screenshot or add Transaction ID.</p>
            <form onSubmit={makePayment} className="mt-4 space-y-3">
              <input value={amount} onChange={(e)=>setAmount(e.target.value)} required type="number" min="0" step="0.01" placeholder="Amount" className="w-full px-4 py-2 rounded-xl border" />
              <input type="file" onChange={(e)=>setProof(e.target.files?.[0]||null)} className="w-full" />
              <button className="w-full bg-[#4FC3F7] text-[#0A1D41] font-semibold rounded-xl py-2">Pay Now</button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-[#0A1D41]">Your Projects</h3>
            <div className="mt-4 space-y-3">
              {projects.map(p => (
                <div key={p.id} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#0A1D41]">{p.title}</p>
                      <p className="text-xs text-[#0A1D41]/60">{p.technology} • {p.status}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${p.paymentStatus==='verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paymentStatus}</span>
                  </div>
                  {p.deliverables?.length>0 && (
                    <div className="mt-2 text-sm">
                      <p className="text-[#0A1D41]/70">Files:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {p.deliverables.map((u, idx)=> (
                          <a key={idx} href={u} target="_blank" className="text-[#4FC3F7] underline">File {idx+1}</a>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.adminRemarks && <p className="text-sm text-[#0A1D41]/70 mt-2">Note: {p.adminRemarks}</p>}
                </div>
              ))}
              {projects.length===0 && <p className="text-sm text-[#0A1D41]/60">No projects yet.</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-[#0A1D41]">Payments</h3>
            <div className="mt-4 space-y-3">
              {payments.map(p => (
                <div key={p.id} className="rounded-xl border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#0A1D41] font-medium">₹{p.amount}</p>
                    <p className="text-xs text-[#0A1D41]/60">{p.verified? 'Verified' : 'Pending'}</p>
                  </div>
                  {p.paymentProofURL && <a href={p.paymentProofURL} className="text-[#4FC3F7] underline" target="_blank">View Proof</a>}
                </div>
              ))}
              {payments.length===0 && <p className="text-sm text-[#0A1D41]/60">No payments yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminPanel() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [payments, setPayments] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [deliverable, setDeliverable] = useState(null)

  const load = async () => {
    const us = await fetch(`${baseUrl}/api/users`).then(r=>r.json()).catch(()=>[])
    const ps = await fetch(`${baseUrl}/api/projects`).then(r=>r.json())
    const pays = await fetch(`${baseUrl}/api/payments`).then(r=>r.json())
    setUsers(us); setProjects(ps); setPayments(pays)
  }

  useEffect(()=>{ load() }, [])

  const verifyPayment = async (payId) => {
    await fetch(`${baseUrl}/api/payments/${payId}`, { method:'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ verified: true, verifiedBy: 'admin', verifiedDate: new Date().toISOString() }) })
    await load()
  }

  const updateProject = async (id, status, remark) => {
    await fetch(`${baseUrl}/api/projects/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status, adminRemarks: remark }) })
    await load()
  }

  const uploadDeliverable = async (projectId) => {
    if (!deliverable) return
    const fd = new FormData()
    fd.append('file', deliverable)
    const up = await fetch(`${baseUrl}/api/upload`, { method:'POST', body: fd }).then(r=>r.json())
    const url = up.url
    const project = projects.find(p=>p.id===projectId)
    await fetch(`${baseUrl}/api/projects/${projectId}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ deliverables: [...(project.deliverables||[]), url] }) })
    setDeliverable(null)
    await load()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#0A1D41]">Admin Dashboard</h2>
        <p className="text-[#0A1D41]/70">Manage students, projects, payments and deliverables.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-[#0A1D41]">Projects</h3>
            <div className="mt-4 space-y-3">
              {projects.map(p => (
                <div key={p.id} className="rounded-xl border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#0A1D41]">{p.title}</p>
                      <p className="text-xs text-[#0A1D41]/60">{p.technology} • {p.status}</p>
                    </div>
                    <select defaultValue={p.status} onChange={(e)=>updateProject(p.id, e.target.value, p.adminRemarks)} className="px-2 py-1 border rounded-lg">
                      {['Requested','In Review','In Development','Completed'].map(s=> <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <input type="file" onChange={(e)=>setDeliverable(e.target.files?.[0]||null)} />
                  <button onClick={()=>uploadDeliverable(p.id)} className="px-3 py-1 rounded-lg bg-[#0A1D41] text-white">Upload Deliverable</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-[#0A1D41]">Payments</h3>
            <div className="mt-4 space-y-3">
              {payments.map(py => (
                <div key={py.id} className="rounded-xl border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#0A1D41] font-medium">₹{py.amount}</p>
                    <p className="text-xs text-[#0A1D41]/60">{py.verified ? 'Approved' : 'Pending'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {py.paymentProofURL && <a href={py.paymentProofURL} target="_blank" className="text-[#4FC3F7] underline">View Proof</a>}
                    {!py.verified && <button onClick={()=>verifyPayment(py.id)} className="px-3 py-1 rounded-lg bg-green-600 text-white">Verify</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [authMode, setAuthMode] = useState(null)
  const [user, setUser] = useState(null)
  const [adminView, setAdminView] = useState(false)

  useEffect(() => {
    const u = localStorage.getItem('av_user')
    if (u) setUser(JSON.parse(u))
  }, [])

  if (user && !adminView) return <Dashboard user={user} />
  if (adminView) return <AdminPanel />

  return (
    <div className="bg-white min-h-screen">
      <Navbar onAuthOpen={(m)=>setAuthMode(m)} />
      <Hero />

      <Section id="about" title="About A&V TechSolutions">
        <p className="text-[#0A1D41]/80 max-w-3xl">We help students build impactful final-year projects with clean code, documentation, and real-world guidance. Our team covers ideation to deployment with a focus on quality and timelines.</p>
      </Section>

      <Section id="services" title="Services">
        <Services />
      </Section>

      <Section id="tech" title="Technologies">
        <Technologies />
      </Section>

      <Section id="contact" title="Contact & Location">
        <Contact />
      </Section>

      <footer className="py-10 text-center text-sm text-[#0A1D41]/60">© {new Date().getFullYear()} A&V TechSolutions</footer>

      {authMode && <AuthModal mode={authMode} onClose={()=>setAuthMode(null)} onLoggedIn={(u)=>setUser(u)} />}

      <div id="register" />
      <div id="login" />
    </div>
  )
}
