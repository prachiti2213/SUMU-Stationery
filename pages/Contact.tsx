import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import emailjs from '@emailjs/browser';
import { MessageCircle } from 'lucide-react';


export const Contact = () => {
  const { content } = useContent();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [sendVia, setSendVia] = useState('whatsapp'); // NEW
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const whatsappMessage = `
Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}
Message: ${form.message}
    `.trim();

    const whatsappUrl =
      `https://wa.me/919022854954?text=${encodeURIComponent(whatsappMessage)}`;

    /* ---------- EMAIL SEND (ALWAYS WHEN EMAIL SELECTED) ---------- */
    emailjs.send(
      'service_ld0vcfi',
      'template_w71kp1q',
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      },
      'pPakc2yTJv4iqvpF7'
    ).catch((err) => {
      console.error('EmailJS error:', err);
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      if (sendVia === 'whatsapp') {
        window.open(whatsappUrl, '_blank');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-8">
          <h1 className="text-4xl font-semibold">Contact Us</h1>
          <p className="text-gray-600 max-w-md">
            For business inquiries, partnerships, or bulk orders,
            please contact us using the details below or submit the form.
          </p>

          <div className="space-y-5">
            <Info icon={MapPin} label="Location" value="Pune, India" />
            <Info icon={Phone} label="Phone" value={content.contactPhone} />
            <Info icon={Mail} label="Email" value={content.contactEmail} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8 max-w-md">

          {!submitted ? (
            <div className="animated-border rounded-lg p-[2px]">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">

                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E6B800]"
                    >
                      <option>General Inquiry</option>
                      <option>Bulk Order</option>
                      <option>Branding</option>
                      <option>Export</option>
                    </select>
                  </div>

                  <Field
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    error={errors.message}
                    textarea
                  />

                  {/* ===== SEND VIA OPTION (NEW) ===== */}
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="sendVia"
                        value="whatsapp"
                        checked={sendVia === 'whatsapp'}
                        onChange={() => setSendVia('whatsapp')}
                      />
                      WhatsApp
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="sendVia"
                        value="email"
                        checked={sendVia === 'email'}
                        onChange={() => setSendVia('email')}
                      />
                      Email
                    </label>
                  </div>

                 <button
  type="submit"
  disabled={loading}
  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-white
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-sumu-charcoal hover:bg-[#E6B800]'}`}
>
  {loading && <Spinner />}

  {!loading && sendVia === 'whatsapp' && (
    <MessageCircle size={16} />
  )}

  {!loading && sendVia === 'email' && (
    <Mail size={16} />
  )}

  {loading
    ? 'Sending...'
    : sendVia === 'whatsapp'
      ? 'Send via WhatsApp'
      : 'Send via Email'}
</button>

                </form>

              </div>
            </div>
          ) : (
            <ThankYou />
          )}

            <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Our Location
            </h3>

            <div className="w-full h-56 border border-gray-200 rounded-lg overflow-hidden">
              <iframe
                title="SUMU Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.70906370868!2d73.69814981881794!3d18.524564859885973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709228549540!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>

      {/* BORDER ANIMATION */}
      <style>{`
        .animated-border {
          background: linear-gradient(120deg, #f5f5f5, #E6B800, #f5f5f5);
          background-size: 200% 200%;
          animation: borderMove 6s ease infinite;
        }
        @keyframes borderMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

/* ---------- THANK YOU ---------- */
const ThankYou = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.confetti').forEach(el => el.remove());
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-8 text-center overflow-hidden">
      <Confetti />
      <CheckCircle size={48} className="text-[#E6B800] mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        Thank you for contacting our team
      </h3>
      <p className="text-gray-600 text-sm">
        We will contact you soon, sir.
      </p>
    </div>
  );
};

/* ---------- CONFETTI ---------- */
const Confetti = () => (
  <>
    {[...Array(12)].map((_, i) => (
      <span
        key={i}
        className="confetti absolute w-2 h-2 rounded-full bg-[#E6B800]"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 20}px`,
          animation: `fall 1.2s ease-out ${i * 0.05}s forwards`
        }}
      />
    ))}
    <style>{`
      @keyframes fall {
        to {
          transform: translateY(120px);
          opacity: 0;
        }
      }
    `}</style>
  </>
);

const Spinner = () => (
  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const Field = ({ label, name, value, onChange, error, type = 'text', textarea = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className={`w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2
        ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#E6B800]'}`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2
        ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#E6B800]'}`}
      />
    )}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4">
    <Icon size={18} className="text-[#E6B800] mt-1" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);
