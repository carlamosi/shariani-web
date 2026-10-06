'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ShieldCheck, ChevronDown, Mail } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export function Contact() {
  const { tr } = useLang();
  const c = tr.contact;

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [botCheck, setBotCheck] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHash = () => { if (window.location.hash === '#contacto') setIsOpen(true); };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleForm = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) setTimeout(() => { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) { setErrorMessage(c.errName); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) { setErrorMessage(c.errEmail); return; }
    if (!message.trim() || message.trim().length < 10) { setErrorMessage(c.errMessage); return; }
    if (!privacyAccepted) { setErrorMessage(c.errPrivacy); return; }

    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), topic: 'Mensaje desde formulario web', organization: organization.trim(), phone: phone.trim(), message: message.trim(), botCheck }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || c.errGeneric);
      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : c.errGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName(''); setEmail(''); setOrganization(''); setPhone(''); setMessage('');
    setPrivacyAccepted(false); setIsSuccess(false); setErrorMessage(null);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative w-full bg-[var(--ivory)] py-14 md:py-20 text-[var(--ink)] border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      <div className="container-page">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--paper)] p-6 sm:p-10 transition-all duration-300 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[var(--forest)]" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">{c.channelLabel}</p>
              </div>
              <h2
                id="contacto-heading"
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] font-normal tracking-[-0.02em] leading-[1.18] mb-3"
              >
                {c.heading}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-sm sm:text-[15px] leading-relaxed text-[var(--ink-muted)]">
                {c.body}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center lg:flex-col lg:items-end gap-3">
              <button
                type="button"
                onClick={toggleForm}
                aria-expanded={isOpen}
                aria-controls="formulario-desplegable"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-[var(--forest)] text-[var(--ivory)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--forest-dark)] transition-all duration-200 shadow-sm active:scale-98 cursor-pointer group"
              >
                <Mail className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                <span>{isOpen ? c.btnClose : c.btnOpen}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-300' : 'text-emerald-100 group-hover:translate-y-0.5'}`} aria-hidden="true" />
              </button>
              <span className="font-mono text-[11px] text-[var(--text-secondary)] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--forest)]" />
                {c.confidential}
              </span>
            </div>
          </div>

          {isOpen && (
            <div id="formulario-desplegable" ref={formRef} className="mt-8 pt-8 border-t border-[var(--border)] calculator-enter">
              {isSuccess ? (
                <div className="rounded-lg border border-[var(--forest-mid)] bg-[var(--ivory)] p-8 sm:p-10 text-center shadow-xs">
                  <div className="w-14 h-14 rounded-full bg-[var(--forest)] text-[var(--ivory)] flex items-center justify-center mx-auto mb-5 shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--forest-mid)] font-semibold">{c.successLabel}</span>
                  <h3 style={{ fontFamily: 'var(--font-editorial)' }} className="text-2xl sm:text-3xl text-[var(--ink)] font-normal mt-2 mb-3">
                    {c.successHeading(name.split(' ')[0])}
                  </h3>
                  <p className="text-sm text-[var(--ink-muted)] max-w-lg mx-auto leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: c.successBody(email) }} />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button type="button" onClick={handleReset} className="px-5 py-2.5 rounded-md bg-[var(--forest)] text-[var(--ivory)] font-medium text-xs uppercase tracking-wider hover:bg-[var(--forest-dark)] transition-all active:scale-95 cursor-pointer">
                      {c.btnSendAnother}
                    </button>
                    <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--paper)] text-[var(--ink)] font-medium text-xs uppercase tracking-wider hover:bg-[var(--ivory)] transition-all cursor-pointer">
                      {c.btnClose2}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5">
                        {c.labelName} <span className="text-red-600">{c.requiredMark}</span>
                      </label>
                      <input id="contact-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={c.placeholderName}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5">
                        {c.labelEmail} <span className="text-red-600">{c.requiredMark}</span>
                      </label>
                      <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={c.placeholderEmail}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all" />
                    </div>
                    <div>
                      <label htmlFor="contact-org" className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5">
                        {c.labelOrg} <span className="text-xs text-[var(--text-secondary)] font-normal">{c.optional}</span>
                      </label>
                      <input id="contact-org" type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder={c.placeholderOrg}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all" />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5">
                        {c.labelPhone} <span className="text-xs text-[var(--text-secondary)] font-normal">{c.optional}</span>
                      </label>
                      <input id="contact-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={c.placeholderPhone}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message" className="block text-xs font-medium text-[var(--ink-muted)]">
                        {c.labelMessage} <span className="text-red-600">{c.requiredMark}</span>
                      </label>
                      <span className="text-[11px] font-mono text-[var(--text-secondary)]">{c.chars(message.length)}</span>
                    </div>
                    <textarea id="contact-message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={c.placeholderMessage}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all resize-y min-h-[100px]" />
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="botCheck" tabIndex={-1} autoComplete="off" value={botCheck} onChange={(e) => setBotCheck(e.target.value)} />
                  </div>

                  {errorMessage && (
                    <div className="mb-5 p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-[var(--border)] text-[var(--forest)] focus:ring-[var(--forest)] cursor-pointer accent-[var(--forest)]" />
                      <span className="text-xs text-[var(--text-secondary)] leading-tight">{c.privacyText}</span>
                    </label>
                    <button type="submit" disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[var(--forest)] text-[var(--ivory)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--forest-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xs active:scale-98 shrink-0 group cursor-pointer"
                    >
                      {isLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /><span>{c.sending}</span></>
                      ) : (
                        <><span>{c.btnSend}</span><ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
