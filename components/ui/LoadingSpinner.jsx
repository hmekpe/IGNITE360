'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--gold)]/20 border-b-[var(--gold)] shadow-lg shadow-[var(--gold)]/20"></div>
    </div>
  );
}
