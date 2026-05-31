import React from 'react';
import type { ReactNode } from 'react';
import { Card } from '../components/Card';
import { Toolbar, ToolbarGroup } from '../components/Toolbar';
import { Kicker } from '../primitives/Kicker';

export function FilterBar({
  kicker = 'Refinar la seleccion',
  title,
  description,
  controls,
  summary,
}: Readonly<{
  kicker?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  controls: ReactNode;
  summary?: ReactNode;
}>) {
  return (
    <Card className="filter-bar" aria-label="Herramientas de refinamiento">
      <div className="filter-bar-copy">
        <Kicker>{kicker}</Kicker>
        <h3>{title}</h3>
        <div className="editorial-ornament filter-bar-ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        {description ? <p>{description}</p> : null}
      </div>
      <Toolbar className="filter-bar-controls">
        <ToolbarGroup>{controls}</ToolbarGroup>
      </Toolbar>
      {summary ? <Toolbar className="filter-bar-summary">{summary}</Toolbar> : null}
    </Card>
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
