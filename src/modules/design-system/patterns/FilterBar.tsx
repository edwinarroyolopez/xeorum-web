import React from 'react';
import type { ReactNode } from 'react';

export function FilterBar({
  title,
  description,
  controls,
  summary,
}: Readonly<{
  title: ReactNode;
  description?: ReactNode;
  controls: ReactNode;
  summary?: ReactNode;
}>) {
  return (
    <section className="filter-bar" aria-label="Herramientas de refinamiento">
      <div className="filter-bar-copy">
        <p className="portal-card-kicker">Refinar la seleccion</p>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="filter-bar-controls">{controls}</div>
      {summary ? <div className="filter-bar-summary">{summary}</div> : null}
    </section>
  );
}

export function ActiveFilterChips({
  items,
  onClear,
}: Readonly<{
  items: string[];
  onClear?: () => void;
}>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="product-filter-summary" aria-label="Filtros activos">
      {items.map((item) => <span key={item} className="product-filter-chip">{item}</span>)}
      {onClear ? <button type="button" className="product-filter-clear" onClick={onClear}>Limpiar</button> : null}
    </div>
  );
}
