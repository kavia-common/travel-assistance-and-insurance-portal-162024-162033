import React, { useMemo, useState, useEffect } from 'react';
import './App.css';

/**
 * Travel Assistance & Insurance Portal (Single Page)
 * - Modern, minimalistic, responsive design
 * - Light theme using provided palette (primary #1976d2, secondary #388e3c, accent #ffc107)
 * - Sections: Hero, Tabs (Assistance / Insurance), Features Grid, Forms (Contact, Assistance), FAQ, Footer
 */

// Utility: palette and CSS variable sync
const PALETTE = {
  primary: '#1976d2',
  secondary: '#388e3c',
  accent: '#ffc107',
  bg: '#ffffff',
  surface: '#f8f9fa',
  text: '#1f2a37',
  textMuted: '#4b5563',
  border: '#e5e7eb'
};

// PUBLIC_INTERFACE
function App() {
  /** Root application shell; composes all sections into a single-page layout. */
  const [activeTab, setActiveTab] = useState('assistance');

  // Sync palette to CSS variables so CSS can leverage dynamic colors if needed
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', PALETTE.primary);
    root.style.setProperty('--color-secondary', PALETTE.secondary);
    root.style.setProperty('--color-accent', PALETTE.accent);
    root.style.setProperty('--color-bg', PALETTE.bg);
    root.style.setProperty('--color-surface', PALETTE.surface);
    root.style.setProperty('--color-text', PALETTE.text);
    root.style.setProperty('--color-text-muted', PALETTE.textMuted);
    root.style.setProperty('--color-border', PALETTE.border);
  }, []);

  return (
    <div className="taip-app">
      <Header />
      <main>
        <Hero />
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === 'assistance' ? <AssistanceSection /> : <InsuranceSection />}
        <FeaturesGrid />
        <FormsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

/* Header */
function Header() {
  return (
    <header className="taip-header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <span className="brand-name">TravelCare</span>
        </div>
        <nav className="nav">
          <a href="#assistance" className="nav-link">Assistance</a>
          <a href="#insurance" className="nav-link">Insurance</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

/* Hero */
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">Travel with confidence</h1>
          <p className="hero-subtitle">
            24/7 assistance and flexible insurance plans tailored to every journey.
          </p>
          <div className="hero-actions">
            <a href="#assistance" className="btn btn-primary">Request Assistance</a>
            <a href="#insurance" className="btn btn-outline">Compare Insurance</a>
          </div>
          <ul className="hero-meta">
            <li>Global coverage</li>
            <li>Instant support</li>
            <li>Transparent pricing</li>
          </ul>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <div className="hero-card-badge">New</div>
            <h3>Trip Shield Plus</h3>
            <p>Cancel for any reason coverage with fast claims.</p>
            <div className="hero-card-tags">
              <span>Medical</span>
              <span>Lost baggage</span>
              <span>Delays</span>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">95%</div>
              <div className="stat-label">Claims approved</div>
            </div>
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Live support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tabs */
function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs container">
      <button
        className={`tab ${activeTab === 'assistance' ? 'active' : ''}`}
        onClick={() => onChange('assistance')}
        aria-selected={activeTab === 'assistance'}
        id="assistance"
      >
        Assistance
      </button>
      <button
        className={`tab ${activeTab === 'insurance' ? 'active' : ''}`}
        onClick={() => onChange('insurance')}
        aria-selected={activeTab === 'insurance'}
        id="insurance"
      >
        Insurance
      </button>
    </div>
  );
}

/* Assistance Section */
function AssistanceSection() {
  const services = useMemo(() => ([
    { title: 'Emergency Medical', desc: 'Immediate coordination with local hospitals and providers.' },
    { title: 'Travel Concierge', desc: 'Itineraries, bookings, and on-trip recommendations.' },
    { title: 'Document Support', desc: 'Passport, visa, and documentation guidance.' },
    { title: 'Baggage Assistance', desc: 'Help tracking and recovering lost or delayed baggage.' },
  ]), []);

  return (
    <section className="section container" aria-labelledby="assistance-heading">
      <h2 className="section-title" id="assistance-heading">Travel Assistance</h2>
      <p className="section-desc">
        Get help whenever you need it—before, during, and after your trip.
      </p>
      <div className="cards-grid">
        {services.map((s) => (
          <div className="card" key={s.title}>
            <div className="card-icon" aria-hidden="true">🛟</div>
            <h3 className="card-title">{s.title}</h3>
            <p className="card-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Insurance Section with comparison */
function InsuranceSection() {
  const plans = [
    { name: 'Basic', price: 19, coverage: ['Emergency medical', 'Baggage loss'], best: false },
    { name: 'Standard', price: 39, coverage: ['Medical + evacuation', 'Trip delay', 'Baggage loss'], best: true },
    { name: 'Premium', price: 69, coverage: ['All Standard', 'Cancel Anytime', 'Priority claims'], best: false },
  ];

  return (
    <section className="section container" aria-labelledby="insurance-heading">
      <h2 className="section-title" id="insurance-heading">Travel Insurance</h2>
      <p className="section-desc">
        Flexible plans for every traveler. Compare coverage and choose what fits best.
      </p>
      <div className="plans-grid">
        {plans.map((p) => (
          <div key={p.name} className={`plan ${p.best ? 'plan-best' : ''}`} aria-label={`${p.name} plan`}>
            {p.best && <div className="plan-badge">Most Popular</div>}
            <h3 className="plan-name">{p.name}</h3>
            <div className="plan-price">
              <span className="price">${p.price}</span>
              <span className="per">/trip</span>
            </div>
            <ul className="plan-list">
              {p.coverage.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <a href="#contact" className={`btn ${p.best ? 'btn-primary' : 'btn-outline'}`}>Get this plan</a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Features Grid */
function FeaturesGrid() {
  const features = [
    { icon: '⚡', title: 'Fast claims', desc: 'Streamlined digital claims with status tracking.' },
    { icon: '🌍', title: 'Worldwide', desc: 'Support in 150+ countries and territories.' },
    { icon: '🔒', title: 'Secure', desc: 'Bank-grade security for your data and payments.' },
    { icon: '📞', title: 'Human support', desc: 'Real agents on chat, phone, and email.' },
    { icon: '🧭', title: 'Flexible', desc: 'Single trip, annual multi-trip, and family plans.' },
    { icon: '💳', title: 'Transparent', desc: 'Clear pricing with no hidden fees.' },
  ];

  return (
    <section className="section surface" id="features" aria-labelledby="features-heading">
      <div className="container">
        <h2 className="section-title" id="features-heading">Why choose us</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature" key={f.title}>
              <div className="feature-icon" aria-hidden="true">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Forms: Contact + Assistance request */
function FormsSection() {
  return (
    <section className="section container" id="contact" aria-labelledby="forms-heading">
      <h2 className="section-title" id="forms-heading">Get in touch</h2>
      <p className="section-desc">Have a question or need assistance now? Send us a message.</p>
      <div className="forms-grid">
        <ContactForm />
        <AssistanceForm />
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function ContactForm() {
  /** Simple contact form for inquiries (no backend; logs to console). */
  const [form, setForm] = useState({ name: '', email: '', topic: 'General', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // In a real app, integrate with backend API here.
    // eslint-disable-next-line no-console
    console.log('Contact form submitted:', form);
    setSubmitted(true);
  };

  return (
    <form className="form card" onSubmit={onSubmit} aria-label="Contact form">
      <h3 className="form-title">Contact us</h3>
      <label className="input">
        <span>Name</span>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your full name"
          required
        />
      </label>
      <label className="input">
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="input">
        <span>Topic</span>
        <select name="topic" value={form.topic} onChange={onChange}>
          <option>General</option>
          <option>Policy details</option>
          <option>Claims</option>
          <option>Billing</option>
        </select>
      </label>
      <label className="input">
        <span>Message</span>
        <textarea
          rows="4"
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="How can we help?"
          required
        />
      </label>
      <button className="btn btn-primary" type="submit">Send message</button>
      {submitted && <p className="form-success">Thanks! We will get back to you soon.</p>}
    </form>
  );
}

// PUBLIC_INTERFACE
function AssistanceForm() {
  /** Assistance request form for immediate help (no backend; logs to console). */
  const [form, setForm] = useState({
    traveler: '',
    phone: '',
    location: '',
    assistanceType: 'Medical',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Assistance request submitted:', form);
    setSubmitted(true);
  };

  return (
    <form className="form card" onSubmit={onSubmit} aria-label="Assistance request form">
      <h3 className="form-title">Request assistance</h3>
      <label className="input">
        <span>Traveler name</span>
        <input
          name="traveler"
          value={form.traveler}
          onChange={onChange}
          placeholder="Traveler full name"
          required
        />
      </label>
      <label className="input">
        <span>Phone</span>
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="+1 555 0102"
          required
        />
      </label>
      <label className="input">
        <span>Current location</span>
        <input
          name="location"
          value={form.location}
          onChange={onChange}
          placeholder="City, Country"
        />
      </label>
      <label className="input">
        <span>Assistance type</span>
        <select name="assistanceType" value={form.assistanceType} onChange={onChange}>
          <option>Medical</option>
          <option>Lost baggage</option>
          <option>Travel disruption</option>
          <option>Documentation</option>
        </select>
      </label>
      <label className="input">
        <span>Details</span>
        <textarea
          rows="4"
          name="details"
          value={form.details}
          onChange={onChange}
          placeholder="Describe your situation"
        />
      </label>
      <button className="btn btn-secondary" type="submit">Request now</button>
      {submitted && <p className="form-success">Request received. Our team will contact you ASAP.</p>}
    </form>
  );
}

/* FAQ */
function FAQSection() {
  const faqs = [
    { q: 'What does travel assistance cover?', a: 'We provide 24/7 support for medical issues, lost baggage, document support, and travel disruptions.' },
    { q: 'Can I cancel my trip for any reason?', a: 'Yes, certain plans include Cancel for Any Reason (CFAR) coverage. Check plan details.' },
    { q: 'How fast are claims processed?', a: 'Most claims are reviewed within 48 hours, with fast-track options on Premium plans.' },
    { q: 'Is international coverage included?', a: 'All plans offer global assistance; coverage specifics vary per plan.' },
  ];

  return (
    <section className="section container" id="faq" aria-labelledby="faq-heading">
      <h2 className="section-title" id="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((f) => (
          <details key={f.q} className="faq-item">
            <summary className="faq-q">{f.q}</summary>
            <p className="faq-a">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-mark small" aria-hidden="true" />
          <span className="brand-name">TravelCare</span>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#insurance">Plans</a>
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-note">© {new Date().getFullYear()} TravelCare. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default App;
