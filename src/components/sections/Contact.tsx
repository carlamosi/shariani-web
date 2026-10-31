'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLang } from '@/context/LangContext';

const MAPS_URL =
  'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12a4942497a6cf55:0xef891ebd88b4d839?sa=X&ved=1t:8290&ictx=111';
const INSTAGRAM_URL = 'https://www.instagram.com/amara.la_vall/';

function IconInstagram() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Contact() {
  const { tr } = useLang();
  const c = tr.contact;
  const contactEmail = tr.footer.email || 'shariani@la-vall.org';

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [botCheck, setBotCheck] = useState(''); // honeypot

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus('error');
      setErrorMessage(c.errName || 'Por favor, indica tu nombre.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setErrorMessage(c.errEmail || 'Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setStatus('error');
      setErrorMessage(c.errMessage || 'Por favor, escribe un mensaje de al menos 10 caracteres.');
      return;
    }
    if (!privacyAgreed) {
      setStatus('error');
      setErrorMessage(c.errPrivacy || 'Es necesario aceptar la política de privacidad.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim(),
          phone: phone.trim(),
          message: message.trim(),
          botCheck,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || c.errGeneric || 'Error al enviar el mensaje.');
      }
    } catch {
      setStatus('error');
      setErrorMessage(c.errGeneric || 'Error de conexión. Inténtalo de nuevo.');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setOrganization('');
    setPhone('');
    setMessage('');
    setPrivacyAgreed(false);
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section
      id="contacto"
      className="relative w-full bg-[var(--ivory)] py-14 sm:py-18 lg:py-20 text-[var(--ink)] border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      {/* Legacy anchor compatibility */}
      <span id="colabora" className="absolute -top-24" aria-hidden="true" />

      <div className="container-page max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ── LEFT COLUMN: Context & Direct Contact Channels ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--forest)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {c.sectionLabel || 'CONTACTO'}
                </span>
                <span className="h-px w-12 bg-[var(--forest)]/40" aria-hidden="true" />
              </div>

              <h2
                id="contacto-heading"
                className="text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[1.12] text-[var(--ink)] tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                {c.heading || 'Hablemos de cómo colaborar.'}
              </h2>

              <p
                className="text-sm sm:text-base leading-relaxed text-[var(--ink-muted)] mb-8"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {c.body ||
                  'Para alianzas con empresas, donaciones de materiales escolares o de obra, resolver cualquier duda o coordinar una visita a La Vall: respondemos personalmente a cada propuesta.'}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              {/* Direct Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[var(--forest)]/10 text-[var(--forest)] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] block">
                    {c.emailLabel || 'Correo de coordinación'}
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm sm:text-base font-semibold text-[var(--forest)] hover:underline underline-offset-2 break-all"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[var(--forest)]/10 text-[var(--forest)] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] block">
                    {c.addressLabel || 'Sede del proyecto'}
                  </span>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[var(--ink)] hover:text-[var(--forest)] transition-colors leading-snug block"
                  >
                    <span className="font-semibold block">{c.addressSchool || 'Col·legi La Vall'}</span>
                    <span className="text-[var(--ink-muted)]">{c.addressStreet || 'Ctra. Sabadell a Bellaterra, km 4,6'}</span>
                    <span className="text-[var(--ink-muted)] block">{c.addressCity || '08205 Sabadell (Barcelona)'}</span>
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @amara.la_vall"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-white text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--forest)] hover:border-[var(--forest)] transition-all shadow-xs"
                >
                  <IconInstagram />
                  <span>@amara.la_vall</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive Collaboration Form ── */}
          <div className="lg:col-span-7 bg-[var(--paper)] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[var(--border)] shadow-xs">
            {status === 'success' ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} strokeWidth={2} />
                </div>
                <h3
                  className="text-2xl font-normal text-[var(--ink)] mb-2"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {typeof c.successHeading === 'function'
                    ? c.successHeading(name || 'Amigo')
                    : 'Mensaje recibido correctamente'}
                </h3>
                <p
                  className="text-sm text-[var(--ink-muted)] max-w-md leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof c.successBody === 'function'
                        ? c.successBody(email)
                        : `Hemos recibido tu propuesta. El equipo de coordinación de La Vall te responderá con la máxima brevedad a ${email}.`,
                  }}
                />
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full border border-[var(--border)] bg-white hover:bg-[var(--ivory)] text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer"
                >
                  {c.btnSendAnother || 'Enviar otro mensaje'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
                    >
                      {c.labelName || 'Nombre y apellidos'} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={c.placeholderName || 'Ej. María García'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
                    >
                      {c.labelEmail || 'Correo electrónico'} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={c.placeholderEmail || 'tu@email.com'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization */}
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
                    >
                      {c.labelOrg || 'Empresa o entidad'} <span className="text-[var(--ink-muted)] font-normal text-[11px]">{c.optional || '(opcional)'}</span>
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={c.placeholderOrg || 'Empresa, fundación, AMPA...'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
                    >
                      {c.labelPhone || 'Teléfono'} <span className="text-[var(--ink-muted)] font-normal text-[11px]">{c.optional || '(opcional)'}</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={c.placeholderPhone || '+34 600 000 000'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>
                </div>

                {/* Honeypot field (hidden from humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="botCheck">Leave this empty</label>
                  <input
                    id="botCheck"
                    type="text"
                    tabIndex={-1}
                    value={botCheck}
                    onChange={(e) => setBotCheck(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
                  >
                    {c.labelMessage || 'Tu mensaje o propuesta de colaboración'} *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      c.placeholderMessage ||
                      'Cuéntanos con detalle cómo te gustaría colaborar, qué materiales deseas donar o cualquier duda sobre el proyecto...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--forest)] transition-all resize-y"
                  />
                </div>

                {/* Privacy Agreement */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    required
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[var(--forest)] focus:ring-[var(--forest)] border-[var(--border)] cursor-pointer"
                  />
                  <label
                    htmlFor="contact-privacy"
                    className="text-xs text-[var(--ink-muted)] leading-relaxed cursor-pointer"
                  >
                    {c.privacyText ||
                      'Acepto que mis datos sean tratados exclusivamente para atender esta solicitud de contacto.'}
                  </label>
                </div>

                {/* Error Banner */}
                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs"
                  >
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-[var(--forest)] hover:bg-[var(--forest-dark)] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-sm disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forest)] focus-visible:ring-offset-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        <span>{c.sending || 'Enviando...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} strokeWidth={2} aria-hidden="true" />
                        <span>{c.btnSend || 'Enviar mensaje de colaboración'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
