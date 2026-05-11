'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ignite360-application-draft';

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  courseSelection: '',
  motivation: '',
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ApplicationWizard({ programs }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [touched, setTouched] = useState({});

  const steps = useMemo(() => [
    { id: 1, label: 'Personal details', hint: 'Basic contact information' },
    { id: 2, label: 'Programme choice', hint: 'Choose one focus area' },
    { id: 3, label: 'Review and send', hint: 'Confirm before submission' },
  ], []);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm({ ...defaultForm, ...JSON.parse(saved) });
        setStatus({ type: 'info', message: 'Your previous progress was restored.' });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setLastSavedAt(new Date());
  }, [form]);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Enter your full name.';
    if (!form.email.trim()) nextErrors.email = 'Enter your email address.';
    else if (!isValidEmail(form.email)) nextErrors.email = 'Use a valid email address.';
    if (!form.phone.trim()) nextErrors.phone = 'Enter a phone number we can reach.';
    if (!form.courseSelection.trim()) nextErrors.courseSelection = 'Choose one programme to continue.';
    if (!form.motivation.trim()) nextErrors.motivation = 'Tell us why you want to join.';
    else if (form.motivation.trim().length < 40) nextErrors.motivation = 'Add a bit more detail so the team can understand your goals.';

    return nextErrors;
  }, [form]);

  const currentStepFields = {
    1: ['name', 'email', 'phone'],
    2: ['courseSelection', 'motivation'],
    3: [],
  };

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus((current) => (current.type === 'error' ? { type: '', message: '' } : current));
  }

  function fieldStatus(name) {
    if (!touched[name]) return '';
    return errors[name] ? 'error' : 'success';
  }

  function markStepTouched(currentStep) {
    setTouched((current) => ({
      ...current,
      ...Object.fromEntries(currentStepFields[currentStep].map((field) => [field, true])),
    }));
  }

  function stepHasErrors(currentStep) {
    return currentStepFields[currentStep].some((field) => errors[field]);
  }

  function nextStep() {
    markStepTouched(step);
    if (stepHasErrors(step)) {
      setStatus({ type: 'error', message: 'Please correct the highlighted fields before continuing.' });
      return;
    }

    setStatus({ type: '', message: '' });
    setStep((current) => Math.min(current + 1, steps.length));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    markStepTouched(1);
    markStepTouched(2);

    if (Object.keys(errors).length) {
      setStatus({ type: 'error', message: 'Please review the required fields before submitting.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: 'info', message: 'Submitting your application...' });

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed.');
      }

      setStatus({ type: 'success', message: 'Application submitted successfully. Ignite360 will contact you soon.' });
      setForm(defaultForm);
      setTouched({});
      setStep(1);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (submissionError) {
      setStatus({ type: 'error', message: submissionError.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-[var(--border)] bg-[linear-gradient(180deg,#fffdf9_0%,#fbf6ee_100%)] p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="section-tag">Fast application</p>
            <h2 className="mt-3 text-3xl text-[var(--navy)] md:text-4xl">Complete your application in a few focused steps.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)] md:text-base">
              We only ask for information needed to start review. Your draft saves automatically, so you can return
              without losing progress.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">
            {lastSavedAt ? `Draft saved at ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Draft not saved yet'}
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {steps.map((item) => {
            const active = item.id === step;
            const complete = item.id < step;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id < step) setStep(item.id);
                }}
                className={`rounded-[1.4rem] border p-4 text-left transition ${
                  active
                    ? 'border-[var(--gold)] bg-white shadow-sm'
                    : complete
                      ? 'border-[var(--border)] bg-white/85'
                      : 'border-transparent bg-white/45'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                      active || complete ? 'bg-[var(--gold)] text-[var(--navy)]' : 'bg-white text-[var(--text-muted)]'
                    }`}
                  >
                    {complete ? '✓' : item.id}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--navy)]">{item.label}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.hint}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8">
        {status.message ? (
          <div
            className={
              status.type === 'success' ? 'feedback-success' : status.type === 'error' ? 'feedback-error' : 'feedback-info'
            }
            role={status.type === 'error' ? 'alert' : 'status'}
          >
            {status.message}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="field-shell md:col-span-2">
                <label className="field-label" htmlFor="app-name">Full name</label>
                <input
                  id="app-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                  placeholder="Ama Mensah"
                  aria-invalid={fieldStatus('name') === 'error'}
                />
                {fieldStatus('name') === 'error' ? <p className="text-sm text-rose-700">{errors.name}</p> : null}
              </div>

              <div className="field-shell">
                <label className="field-label" htmlFor="app-email">Email address</label>
                <input
                  id="app-email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  placeholder="ama@example.com"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={fieldStatus('email') === 'error'}
                />
                {fieldStatus('email') === 'error' ? <p className="text-sm text-rose-700">{errors.email}</p> : null}
              </div>

              <div className="field-shell">
                <label className="field-label" htmlFor="app-phone">Phone number</label>
                <input
                  id="app-phone"
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
                  placeholder="+233 50 123 4567"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={fieldStatus('phone') === 'error'}
                />
                {fieldStatus('phone') === 'error' ? <p className="text-sm text-rose-700">{errors.phone}</p> : null}
              </div>
            </div>

            <div className="field-shell">
              <label className="field-label" htmlFor="app-organization">Organisation or school</label>
              <input
                id="app-organization"
                name="organization"
                value={form.organization}
                onChange={updateField}
                placeholder="Optional"
                autoComplete="organization"
              />
              <p className="field-help">Optional, but useful if you are applying through a school, group, or employer.</p>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <div className="field-shell">
              <label className="field-label">Choose one programme</label>
              <div className="grid gap-3 md:grid-cols-2">
                {programs.map((program) => {
                  const selected = form.courseSelection === program.title;
                  return (
                    <button
                      key={program.id}
                      type="button"
                      onClick={() => {
                        setForm((current) => ({ ...current, courseSelection: program.title }));
                        setTouched((current) => ({ ...current, courseSelection: true }));
                      }}
                      className={`rounded-[1.3rem] border p-4 text-left transition ${
                        selected ? 'border-[var(--gold)] bg-[var(--sand)] shadow-sm' : 'border-[var(--border)] bg-white hover:border-[rgba(21,35,63,0.16)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-[var(--navy)]">{program.title}</p>
                          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{program.summary}</p>
                        </div>
                        <span className={`mt-1 h-5 w-5 rounded-full border-2 ${selected ? 'border-[var(--gold-dark)] bg-[var(--gold)]' : 'border-[var(--border-strong)]'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
              {fieldStatus('courseSelection') === 'error' ? <p className="text-sm text-rose-700">{errors.courseSelection}</p> : null}
            </div>

            <div className="field-shell">
              <label className="field-label" htmlFor="app-motivation">Why do you want to join?</label>
              <textarea
                id="app-motivation"
                name="motivation"
                value={form.motivation}
                onChange={updateField}
                onBlur={() => setTouched((current) => ({ ...current, motivation: true }))}
                placeholder="Tell Ignite360 what you want to learn, change, or build through this programme."
                aria-invalid={fieldStatus('motivation') === 'error'}
              />
              <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
                <span>Short, practical answers are fine.</span>
                <span>{form.motivation.trim().length} / 40+ suggested</span>
              </div>
              {fieldStatus('motivation') === 'error' ? <p className="text-sm text-rose-700">{errors.motivation}</p> : null}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            <div className="rounded-[1.6rem] border border-[var(--border)] bg-[var(--sand)] p-5">
              <h3 className="text-2xl text-[var(--navy)]">Review before sending</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                This step reduces submission errors and gives you a chance to confirm the key details.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Name', form.name || 'Not provided'],
                ['Email', form.email || 'Not provided'],
                ['Phone', form.phone || 'Not provided'],
                ['Organisation', form.organization || 'Not provided'],
                ['Programme', form.courseSelection || 'Not selected'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.3rem] border border-[var(--border)] bg-white p-4">
                  <p className="info-label">{label}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.3rem] border border-[var(--border)] bg-white p-4">
              <p className="info-label">Motivation</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{form.motivation || 'Not provided'}</p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 1))}
            disabled={step === 1}
            className="btn-tertiary"
          >
            Back
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-[var(--text-muted)]">Step {step} of {steps.length}</p>
            {step < steps.length ? (
              <button type="button" onClick={nextStep} className="btn-primary min-w-[180px]">
                Continue
              </button>
            ) : (
              <button type="submit" disabled={submitting} className="btn-primary min-w-[220px]">
                {submitting ? 'Submitting...' : 'Submit application'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
