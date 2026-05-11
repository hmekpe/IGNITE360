'use client';

import { useState } from 'react';

export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-[1.75rem] shadow-2xl max-w-md w-full mx-4 border border-[var(--border)]">
        <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--navy)]">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-[var(--text-muted)] hover:text-[var(--navy)] transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--sand)]"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
