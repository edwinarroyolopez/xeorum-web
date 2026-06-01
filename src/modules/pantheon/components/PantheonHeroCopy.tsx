import React from 'react';
import Link from 'next/link';
import { Badge, Kicker, LinkButton } from '../../design-system';
import type { PantheonArchetype } from '../pantheon.types';
import styles from '../PantheonExperience.module.css';
import { getPantheonEntryHref, getPantheonMirrorHref } from '../services';

const pantheonSignals = ['Fuerzas, no categorias', 'Selector vivo por aura', 'La lectura afina sin bloquear'] as const;

export function PantheonHeroCopy({ archetype }: Readonly<{ archetype: PantheonArchetype }>) {
  return (
    <div className={styles.heroCopy}>
      <span className={styles.eyebrow}>Pantheon Selector</span>
      <div>
        <h1 className={styles.heroTitle}>Elige la fuerza que ya te esta mirando.</h1>
      </div>
      <p className={styles.heroBody}>
        XEORUM no abre por categorias. Abre por presencia, deseo y simbolo. Recorre el pantheon, activa un dios y entra por el arquetipo que mejor ordena tu impulso.
      </p>
      <div className={styles.heroSignals} aria-label="Claves de la experiencia Pantheon Selector">
        {pantheonSignals.map((signal) => <Badge key={signal} size="sm">{signal}</Badge>)}
      </div>
      <div className={styles.heroActions}>
        <LinkButton href={getPantheonEntryHref(archetype)}>{archetype.ctaLabel}</LinkButton>
        <LinkButton href="/identity" variant="ghost">Descubrir mi fuerza</LinkButton>
        <LinkButton href="/products" variant="ghost">Ver mercado abierto</LinkButton>
      </div>
      <Kicker tone="muted">{archetype.coreEnergy}</Kicker>
      <p className={styles.heroMeta}>
        Portal activo: <strong>{archetype.name}</strong>. Espejo narrativo disponible en <Link href={getPantheonMirrorHref(archetype)}>{getPantheonMirrorHref(archetype)}</Link>.
      </p>
    </div>
  );
}
