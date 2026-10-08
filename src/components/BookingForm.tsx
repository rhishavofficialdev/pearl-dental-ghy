import { useState } from 'react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';

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

export default function BookingForm() {
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

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: hasError ? '2px solid #ef4444' : '1.5px solid #e2e8f0',
    fontSize: '0.9rem',
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
    color: '#334155', marginBottom: 4, fontFamily: 'Inter, sans-serif',
  };

  if (submitted) {
    return (
      <div style={{
        background: 'white', borderRadius: 24, padding: '36px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid rgba(226,232,240,0.8)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
        <h3 style={{ color: '#065f46', fontFamily: 'Playfair Display, serif', marginBottom: 12, fontSize: '1.4rem' }}>
          Request Sent!
        </h3>
        <p style={{ color: '#047857', marginBottom: 20, fontSize: '0.9rem' }}>
          Your appointment request has been sent via WhatsApp!
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' }); }}
          className="btn btn-secondary"
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'white', borderRadius: 24, padding: '28px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        border: '1px solid rgba(226,232,240,0.8)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <h3 style={{
        fontFamily: 'Playfair Display, serif', fontSize: '1.4rem',
        color: '#0f172a', marginBottom: 20, textAlign: 'center',
      }}>
        📅 Schedule an Appointment
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text" placeholder="Your name"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            style={inputStyle(!!errors.name)}
            onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
        </div>
        <div>
          <label style={labelStyle}>Phone *</label>
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

      <div style={{ marginBottom: 12 }}>
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
            <option key={s.id} value={s.title}>{s.title}</option>
          ))}
          <option value="General Check-up">🏥 General Check-up / Cleaning</option>
          <option value="Emergency Dental">🚨 Emergency Dental Care</option>
          <option value="Consultation">💬 Free Consultation</option>
        </select>
        {errors.service && <span style={errorStyle}>{errors.service}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={labelStyle}>Date *</label>
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
          <label style={labelStyle}>Time *</label>
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

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          width: '100%', fontSize: '0.95rem', padding: '14px',
          justifyContent: 'center', opacity: loading ? 0.8 : 1,
          marginTop: 8
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 16, height: 16, border: '2px solid white',
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
      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
