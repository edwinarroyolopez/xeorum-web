import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from './Button';
import { EmptyState } from './State';
import { Input } from './Input';
import { SegmentedGroup } from './SegmentedGroup';
import { ToggleSwitch } from './ToggleSwitch';

describe('design system components', () => {
  it('renders button variants with unified sizing and loading classes', () => {
    const html = renderToStaticMarkup(
      <Button variant="primary" size="sm" loading>
        Confirmar
      </Button>
    );

    expect(html).toContain('ds-button-primary');
    expect(html).toContain('ds-button-sm');
    expect(html).toContain('is-loading');
    expect(html).toContain('aria-busy="true"');
  });

  it('renders field metadata for inputs', () => {
    const html = renderToStaticMarkup(
      <Input label="Email" hint="Usamos este correo para la orden." error="Correo invalido" defaultValue="test@example.com" />
    );

    expect(html).toContain('Usamos este correo para la orden.');
    expect(html).toContain('Correo invalido');
    expect(html).toContain('aria-invalid="true"');
  });

  it('renders empty state actions when provided', () => {
    const html = renderToStaticMarkup(
      <EmptyState action={<Button variant="ghost">Volver</Button>}>
        Sin piezas activas.
      </EmptyState>
    );

    expect(html).toContain('Sin resultados');
    expect(html).toContain('Sin piezas activas.');
    expect(html).toContain('Volver');
  });

  it('renders segmented controls and toggle switch accessibly', () => {
    const html = renderToStaticMarkup(
      <>
        <SegmentedGroup
          label="Modo de vista"
          value="grid"
          onChange={() => undefined}
          options={[
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
          ]}
        />
        <ToggleSwitch active activeLabel="Activo" inactiveLabel="Inactivo" aria-label="Estado" />
      </>
    );

    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('Modo de vista');
    expect(html).toContain('Activo');
  });
});
