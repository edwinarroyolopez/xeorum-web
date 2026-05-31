import React from 'react';

export function OrnamentalMark({
  symbol = '•',
  align = 'start',
  className,
}: Readonly<{
  symbol?: string;
  align?: 'start' | 'center';
  className?: string;
}>) {
  return <span aria-hidden="true" className={className ? `ds-ornamental-mark ds-ornamental-mark-${align} ${className}` : `ds-ornamental-mark ds-ornamental-mark-${align}`}>{symbol}</span>;
}
