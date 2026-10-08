import { useState, useRef, useEffect } from 'react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

export default function Appointment() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '',
    service: '', date: '', time: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone)) e.phone = 'Valid phone number required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.service) e.service = 'Please select a service';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time slot';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);

    // Build WhatsApp message
    const msg = [
      '🦷 *New Appointment Request - Pearl Dental Clinic*',
      '',
      `👤 *Patient Name:* ${form.name}`,
      `📱 *Phone:* ${form.phone}`,
      form.email ? `📧 *Email:* ${form.email}` : '',
      `🦷 *Service:* ${form.service}`,
      `📅 *Date:* ${form.date}`,
      `🕐 *Time:* ${form.time}`,
      form.message ? `💬 *Message:* ${form.message}` : '',
      '',
      '_Sent via Pearl Dental Website_',
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, '_blank');
    }, 800);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  if (submitted) {
    return (
      <section id="appointment" style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{
            maxWidth: 600, margin: '0 auto', textAlign: 'center',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
            border: '2px solid #86efac',
            borderRadius: 28,
            boxShadow: '0 20px 60px rgba(16,185,129,0.15)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>✅</div>
            <h2 style={{ color: '#065f46', fontFamily: 'Playfair Display, serif', marginBottom: 12 }}>
              Appointment Request Sent!
            </h2>
            <p style={{ color: '#047857', marginBottom: 28, lineHeight: 1.7 }}>
              Your appointment request has been sent via WhatsApp! Our team will confirm within 2 hours during clinic hours.
            </p>
            <div style={{
              background: 'white', borderRadius: 16, padding: '20px 24px',
              marginBottom: 28, textAlign: 'left',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>📋 Appointment Summary</div>
              {[
                ['👤 Name', form.name],
                ['📱 Phone', form.phone],
                ['🦷 Service', form.service],
                ['📅 Date', form.date],
                ['🕐 Time', form.time],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>{label}</span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' }); }}
                className="btn btn-secondary"
              >
                📅 Book Another
              </button>
              <a href={`tel:${CLINIC_INFO.phone}`} className="btn btn-primary">📞 Call Clinic</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: 12,
    border: hasError ? '2px solid #ef4444' : '1.5px solid #e2e8f0',
    fontSize: '0.92rem',
    fontFamily: 'Inter, sans-serif',
    color: '#0f172a',
    background: '#fafafa',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  });

  const errorStyle: React.CSSProperties = {
    color: '#ef4444', fontSize: '0.78rem', marginTop: 4, display: 'block',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontWeight: 600, fontSize: '0.85rem',
    color: '#334155', marginBottom: 6, fontFamily: 'Inter, sans-serif',
  };

  return (
    <section id="appointment" ref={ref as any} style={{ padding: '100px 0', background: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }}>
          {/* Left info */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
          }}>
            <div className="section-tag">📅 Book Now</div>
            <h2 className="section-title">Book Your <span>Appointment</span></h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              Fill the form and your details will be sent directly to our team via WhatsApp for instant confirmation. We respond within 2 hours!
            </p>

            {/* Process steps */}
            {[
              { icon: '📝', title: 'Fill the Form', desc: 'Enter your details and preferred appointment time' },
              { icon: '📲', title: 'WhatsApp Confirmation', desc: 'Your details are sent to our team instantly via WhatsApp' },
              { icon: '📞', title: 'We Confirm', desc: 'Our team calls or messages you to confirm your slot' },
              { icon: '🦷', title: 'Visit & Smile!', desc: 'Come to the clinic and walk out with a beautiful smile' },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex', gap: 16, marginBottom: 20,
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateX(-20px)',
                transition: `all 0.6s ease ${0.1 * i + 0.3}s`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: 2 }}>{step.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}

            {/* Quick actions */}
            <div style={{
              marginTop: 32, padding: '24px',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              borderRadius: 20, color: 'white',
            }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16 }}>⚡ Quick Booking</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi%20Pearl%20Dental%2C%20I%20want%20to%20book%20an%20appointment.`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(255,255,255,0.2)', borderRadius: 10,
                    padding: '10px 16px', color: 'white',
                    textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  💬 WhatsApp Us Directly
                </a>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'rgba(255,255,255,0.2)', borderRadius: 10,
                    padding: '10px 16px', color: 'white',
                    textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  📞 {CLINIC_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'white', borderRadius: 24, padding: '36px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                border: '1px solid rgba(226,232,240,0.8)',
              }}
            >
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '1.5rem',
                color: '#0f172a', marginBottom: 28, textAlign: 'center',
              }}>
                📅 Schedule an Appointment
              </h3>

              {/* Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text" placeholder="Your full name"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    style={inputStyle(!!errors.name)}
                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.name && <span style={errorStyle}>{errors.name}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel" placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    style={inputStyle(!!errors.phone)}
                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.phone ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email Address (Optional)</label>
                <input
                  type="email" placeholder="your@email.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  style={inputStyle(!!errors.email)}
                  onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </div>

              {/* Service */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Service Required *</label>
                <select
                  value={form.service}
                  onChange={e => handleChange('service', e.target.value)}
                  style={{ ...inputStyle(!!errors.service), cursor: 'pointer' }}
                  onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.service ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.icon} {s.title}</option>
                  ))}
                  <option value="General Check-up">🏥 General Check-up / Cleaning</option>
                  <option value="Emergency Dental">🚨 Emergency Dental Care</option>
                  <option value="Consultation">💬 Free Consultation</option>
                </select>
                {errors.service && <span style={errorStyle}>{errors.service}</span>}
              </div>

              {/* Date + Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Preferred Date *</label>
                  <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={e => handleChange('date', e.target.value)}
                    style={inputStyle(!!errors.date)}
                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.date ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.date && <span style={errorStyle}>{errors.date}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Preferred Time *</label>
                  <select
                    value={form.time}
                    onChange={e => handleChange('time', e.target.value)}
                    style={{ ...inputStyle(!!errors.time), cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.time ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <span style={errorStyle}>{errors.time}</span>}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Additional Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any specific concerns, medical conditions, or requests..."
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  style={{ ...inputStyle(false), resize: 'vertical', minHeight: 90 }}
                  onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%', fontSize: '1rem', padding: '16px',
                  justifyContent: 'center', opacity: loading ? 0.8 : 1,
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: 18, height: 18, border: '2px solid white',
                      borderTopColor: 'transparent', borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin-slow 0.8s linear infinite',
                    }} />
                    Sending...
                  </>
                ) : (
                  <>💬 Book via WhatsApp</>
                )}
              </button>

              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.78rem', marginTop: 14 }}>
                🔒 Your information is secure and will only be used to confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #appointment .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          #appointment form > div:first-of-type > div:first-child + div {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
