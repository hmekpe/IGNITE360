'use client';

import { useRef, useState } from 'react';

const PROGRAMS = [
  'Emerging Leaders Accelerator',
  'Social Enterprise Foundations',
  'Digital Literacy & Innovation',
  'Policy & Community Advocacy',
  'Financial Empowerment Programme',
  'Public Speaking & Storytelling',
  'Wellbeing & Resilience',
  'NGO & Project Management',
  'Gender Equity & Inclusion',
  'Climate Action & Sustainability',
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const errorRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    motivation: '',
    organization: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) return 'Please enter your name';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email';
      if (!formData.phone.trim()) return 'Please enter your phone number';
    } else if (step === 2) {
      if (!formData.program) return 'Please select a program';
      if (!formData.motivation.trim()) return 'Please tell us your motivation';
    }
    return '';
  };

  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', program: '', motivation: '', organization: '' });
        setStep(1);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (submissionError) {
      setError(submissionError.message || 'An error occurred. Please try again.');
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[var(--border)] bg-white p-8 shadow-lg md:p-12">
      {success && (
        <div className="mb-6 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 shadow-sm">
          <p className="font-semibold">✓ Application submitted successfully</p>
          <p className="mt-2 text-sm">We&apos;ll review your application and contact you shortly.</p>
        </div>
      )}

      <div className="mb-8 md:mb-12">
        <div className="mb-4 flex items-center justify-between">
          {[1, 2, 3].map((currentStep) => (
            <div key={currentStep} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300 ${
                  currentStep <= step
                    ? 'bg-[var(--gold)] text-[var(--navy)]'
                    : 'bg-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {currentStep}
              </div>
              {currentStep < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 transition-all duration-300 ${
                    currentStep < step ? 'bg-[var(--gold)]' : 'bg-[var(--border)]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>Personal Info</span>
          <span>Programme & Motivation</span>
          <span>Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">Personal Information</h2>
            <p className="text-[var(--text-muted)]">Tell us about yourself.</p>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--navy)]">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--navy)]">Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--navy)]">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233 50 123 4567" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--navy)]">Organization (Optional)</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Your organization or company"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">Choose Your Programme</h2>
            <p className="text-[var(--text-muted)]">Select a course and tell us why you&apos;re interested.</p>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--navy)]">Which programme interests you? *</label>
              <select name="program" value={formData.program} onChange={handleChange} required className="w-full">
                <option value="">-- Select a Programme --</option>
                {PROGRAMS.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--navy)]">Why are you interested in this programme? *</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                placeholder="Tell us what you hope to achieve and why this programme matters to you..."
                rows="5"
                required
              />
              <p className="mt-2 text-xs text-[var(--text-muted)]">{formData.motivation.length}/500</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="font-serif text-2xl font-bold text-[var(--navy)]">Review Your Application</h2>
            <p className="text-[var(--text-muted)]">Please review the information below before submitting.</p>

            <div className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--sand)] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Name</p>
                  <p className="font-semibold text-[var(--navy)]">{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Email</p>
                  <p className="font-semibold text-[var(--navy)]">{formData.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Phone</p>
                  <p className="font-semibold text-[var(--navy)]">{formData.phone}</p>
                </div>
                {formData.organization && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Organization</p>
                    <p className="font-semibold text-[var(--navy)]">{formData.organization}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">Programme</p>
                <p className="font-semibold text-[var(--navy)]">{formData.program}</p>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">Motivation</p>
                <p className="leading-relaxed text-[var(--navy)]">{formData.motivation}</p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)]">
              By submitting this application, you agree to our privacy policy and terms of service.
            </p>
          </div>
        )}

        {error && (
          <div ref={errorRef} className="mb-6 rounded-[1.25rem] border border-rose-200 bg-rose-50 p-5 text-rose-800 shadow-sm">
            <p className="font-semibold">⚠ Please fix this error</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-8 flex gap-4 md:mt-12">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="flex-1 rounded-full border-2 border-[var(--border)] px-6 py-3 font-semibold text-[var(--navy)] transition-all duration-300 hover:border-[var(--navy)] hover:bg-[var(--sand)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {step < 3 ? (
            <button type="button" onClick={handleNext} className="btn-primary flex-1">
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
