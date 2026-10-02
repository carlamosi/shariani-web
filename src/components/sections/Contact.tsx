'use client';

import { useState, useRef } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Building2,
  FileText,
  HelpCircle,
  Users2,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface TopicOption {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: 'Alianzas y Empresas',
    label: 'Alianza empresarial o donación de material',
    badge: 'Empresas',
    icon: Building2,
  },
  {
    id: 'Deducción Fiscal y Donaciones',
    label: 'Certificado fiscal / Donación particular',
    badge: 'Fiscalidad',
    icon: FileText,
  },
  {
    id: 'Dudas sobre el Proyecto',
    label: 'Obras y seguimiento de las expediciones',
    badge: 'Shariani',
    icon: HelpCircle,
  },
  {
    id: 'Otras Consultas',
    label: 'Visitar La Vall o proponer iniciativas',
    badge: 'General',
    icon: Users2,
  },
];

export function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPIC_OPTIONS[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [botCheck, setBotCheck] = useState(''); // Honeypot antispam

  // Estados de envío y feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validación cliente
    if (!name.trim()) {
      setErrorMessage('Por favor, indica tu nombre y apellidos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Por favor, escribe un mensaje de al menos 10 caracteres.');
      return;
    }

    if (!privacyAccepted) {
      setErrorMessage('Es necesario aceptar la política de privacidad para procesar el envío.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic: selectedTopic,
          organization: organization.trim(),
          phone: phone.trim(),
          message: message.trim(),
          botCheck,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado al enviar el formulario.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setOrganization('');
    setPhone('');
    setMessage('');
    setPrivacyAccepted(false);
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative w-full bg-[var(--ivory)] py-16 md:py-24 text-[var(--ink)] border-t border-[var(--border)] overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      <div className="container-page">
        {/* ── Encabezado Editorial ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--forest)]" />
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
              Canal de Enlace Oficial · La Vall × Shariani
            </p>
          </div>

          <h2
            id="contacto-heading"
            style={{ fontFamily: 'var(--font-editorial)' }}
            className="text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] font-normal tracking-[-0.02em] leading-[1.15] mb-4"
          >
            Hablemos de cómo sumar juntos.
          </h2>

          <p
            style={{ fontFamily: 'var(--font-body)' }}
            className="text-base sm:text-[16.5px] leading-relaxed text-[var(--ink-muted)]"
          >
            Ya sea para proponer una alianza empresarial, donar materiales de obra, resolver dudas sobre
            el proyecto o coordinar una visita a La Vall: respondemos personalmente a cada mensaje.
          </p>
        </div>

        {/* ── Marco del Formulario ── */}
        <div className="max-w-4xl mx-auto">
          {isSuccess ? (
            /* ── Pantalla de Éxito Inmersiva ── */
            <div className="rounded-xl border border-[var(--forest-mid)] bg-[var(--paper)] p-8 sm:p-12 text-center shadow-sm animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[var(--forest)] text-[var(--ivory)] flex items-center justify-center mx-auto mb-6 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="font-mono text-xs uppercase tracking-wider text-[var(--forest-mid)] font-semibold">
                Mensaje recibido correctamente
              </span>

              <h3
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-3xl text-[var(--ink)] font-normal mt-2 mb-4"
              >
                Gracias por ponerte en contacto, {name.split(' ')[0]}.
              </h3>

              <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-lg mx-auto leading-relaxed mb-8">
                Tu propuesta ha sido remitida directamente a la coordinación del proyecto en La Vall.
                Te responderemos a la mayor brevedad posible en la dirección <strong>{email}</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-md bg-[var(--forest)] text-[var(--ivory)] font-medium text-xs uppercase tracking-wider hover:bg-[var(--forest-dark)] transition-all shadow-xs active:scale-95"
                >
                  Enviar otro mensaje
                </button>
                <a
                  href="#ayuda"
                  className="px-6 py-3 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-[var(--ink)] font-medium text-xs uppercase tracking-wider hover:bg-[var(--paper)] transition-all"
                >
                  Ver vías de donación
                </a>
              </div>
            </div>
          ) : (
            /* ── Formulario Interactivo ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-[var(--border)] bg-[var(--paper)] p-6 sm:p-10 md:p-12 shadow-sm"
            >
              {/* 1. Selector de Motivo (Pills de Alta Gama) */}
              <div className="mb-8">
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  1. ¿Sobre qué te gustaría hablar?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOPIC_OPTIONS.map((t) => {
                    const Icon = t.icon;
                    const isSelected = selectedTopic === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTopic(t.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-[var(--forest)] bg-[var(--ivory)] text-[var(--ink)] shadow-xs ring-1 ring-[var(--forest)]/20'
                            : 'border-[var(--border)] bg-[var(--paper)] text-[var(--ink-muted)] hover:border-[var(--forest-light)] hover:bg-[var(--ivory)]'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[var(--forest)] text-[var(--ivory)]'
                              : 'bg-[var(--border)] text-[var(--ink-muted)]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-xs font-bold leading-tight truncate">
                            {t.label}
                          </span>
                          <span className="text-[10.5px] font-mono text-[var(--text-secondary)]">
                            {t.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Datos de Contacto */}
              <div className="mb-8">
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  2. Tus datos de contacto
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre y Apellidos */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5"
                    >
                      Nombre y apellidos <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. María García Soler"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5"
                    >
                      Correo electrónico <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>

                  {/* Empresa / Organización (opcional) */}
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5"
                    >
                      Empresa u organización <span className="text-xs text-[var(--text-secondary)] font-normal">(opcional)</span>
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Ej. Fundación, Despacho, Empresa..."
                      className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>

                  {/* Teléfono de contacto (opcional) */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-medium text-[var(--ink-muted)] mb-1.5"
                    >
                      Teléfono de contacto <span className="text-xs text-[var(--text-secondary)] font-normal">(opcional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Mensaje */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[var(--ink-muted)]"
                  >
                    Tu mensaje o propuesta <span className="text-red-600">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                    {message.length} caracteres
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos con detalle cómo te gustaría colaborar, qué materiales deseas donar o cualquier duda sobre el proyecto..."
                  className="w-full px-3.5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--ivory)] text-sm text-[var(--ink)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--forest)] focus:ring-1 focus:ring-[var(--forest)] transition-all resize-y min-h-[110px]"
                />
              </div>

              {/* Campo Honeypot Oculto (Anti-bots) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="botCheck"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botCheck}
                  onChange={(e) => setBotCheck(e.target.value)}
                />
              </div>

              {/* Banner de Error (si ocurre) */}
              {errorMessage && (
                <div className="mb-6 p-3.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 4. Privacidad & Botón de Envío */}
              <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[var(--border)] text-[var(--forest)] focus:ring-[var(--forest)] cursor-pointer accent-[var(--forest)]"
                  />
                  <span className="text-xs text-[var(--text-secondary)] leading-tight">
                    Acepto que mis datos sean tratados exclusivamente para responder a esta consulta.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[var(--forest)] text-[var(--ivory)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--forest-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xs active:scale-98 shrink-0 group cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitiendo mensaje...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Sello de Confianza y Rigor al Pie del Formulario */}
              <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--forest)]" />
                  Envío seguro y confidencial gestionado por el equipo de La Vall
                </span>
                <span>Barcelona · Kenia</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
