'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyBizumButtonProps {
  code: string;
  labelCopy: string;
  labelCopied: string;
}

export function CopyBizumButton({
  code,
  labelCopy,
  labelCopied,
}: CopyBizumButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer bg-white text-[var(--forest-dark)] hover:bg-[var(--paper)] border-[var(--border)] shadow-xs"
      aria-label={`${labelCopy} ${code}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700">{labelCopied}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-[var(--forest)]" />
          <span>{labelCopy}</span>
        </>
      )}
    </button>
  );
}
