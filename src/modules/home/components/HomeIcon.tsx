import React from 'react';

export function HomeIcon({ name, className = 'home-icon', color = 'currentColor' }: Readonly<{ name: 'arrow' | 'check' | 'crown' | 'ruler' | 'shield' | 'sparkles'; className?: string; color?: string }>) {
  const common = {
    className,
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === 'check') {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (name === 'crown') {
    return (
      <svg {...common}>
        <path d="m3.5 8.5 4 3.5L12 5l4.5 7 4-3.5-2 9h-13l-2-9Z" />
        <path d="M6 20h12" />
      </svg>
    );
  }

  if (name === 'ruler') {
    return (
      <svg {...common}>
        <path d="m4 17 13-13 3 3L7 20l-3-3Z" />
        <path d="m14 6 2 2" />
        <path d="m11 9 2 2" />
        <path d="m8 12 2 2" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />
        <path d="m8.5 12 2.2 2.2L15.8 9" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8" />
      <path d="m15.6 15.6 2.8 2.8" />
      <path d="m18.4 5.6-2.8 2.8" />
      <path d="m8.4 15.6-2.8 2.8" />
    </svg>
  );
}
