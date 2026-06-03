'use client';

import React from 'react';
import { ActionRow, DropCard, EditorialPanel, EmptyState, LinkButton, ProductCard } from '../../design-system';
import styles from '../ArchetypeLanding.module.css';
import type { PantheonArchetypeLanding } from '../pantheon.types';
import type { ArchetypeLandingViewModel } from '../services';

export function ArchetypeProducts({ archetype, viewModel }: Readonly<{ archetype: PantheonArchetypeLanding; viewModel: ArchetypeLandingViewModel }>) {
  const featuredProducts = archetype.products.slice(0, 4);
  const featuredDrops = archetype.drops.slice(0, 3);

  return (
    <section className={styles.chapter}>
      <div className={styles.chapterHeader}>
        <p className={styles.chapterKicker}>Capitulo 5</p>
        <h2 className={styles.chapterTitle}>Piezas con esta fuerza</h2>
        <p className={styles.chapterDescription}>{archetype.commerce.productSubheading}</p>
      </div>
      <div className={styles.shopLayout}>
        <div className={styles.chapter}>
          <EditorialPanel className={styles.quietPanel}>
            <p className={styles.panelEyebrow}>Seleccion curada</p>
            <h3 className={styles.panelTitle}>{archetype.commerce.productHeading}</h3>
            <p className={styles.summaryBody}>{archetype.commerce.openMarketAngle}</p>
          </EditorialPanel>
          {featuredProducts.length === 0 ? (
            <EmptyState title="Todavia no hay piezas publicadas" description="Cuando esta fuerza reciba producto publico, aparecera aqui con acceso directo al mercado filtrado." action={<LinkButton href={viewModel.primaryCta.href}>Ver mercado de {archetype.name}</LinkButton>} />
          ) : (
            <>
              <section className={styles.productGrid}>
                {featuredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
              </section>
              <ActionRow>
                <LinkButton href={viewModel.primaryCta.href}>Ver todas las piezas de {archetype.name}</LinkButton>
              </ActionRow>
            </>
          )}
        </div>
        <div className={styles.secondaryStack}>
          {featuredDrops.length ? (
            <section className={styles.secondarySection}>
              <h3 className={styles.secondaryHeading}>Ediciones de {archetype.name}</h3>
              <section className={styles.dropGrid}>
                {featuredDrops.map((drop) => <DropCard key={drop.slug} drop={drop} />)}
              </section>
            </section>
          ) : null}
          <section className={styles.secondarySection}>
            <h3 className={styles.secondaryHeading}>Explora otras fuerzas</h3>
            {viewModel.relatedArchetypes.length ? (
              <section className={styles.relatedGrid}>
                {viewModel.relatedArchetypes.map((item) => (
                  <EditorialPanel key={item.slug} className={styles.relatedCard}>
                    <p className={styles.panelEyebrow}>{item.name}</p>
                    <p className={styles.relatedReason}>{item.reason}</p>
                    <LinkButton href={item.href} variant="ghost">Entrar a {item.name}</LinkButton>
                  </EditorialPanel>
                ))}
              </section>
            ) : (
              <EmptyState title="Todavia no hay relaciones publicas" description="La exploracion continuara aqui cuando se publiquen fuerzas relacionadas." />
            )}
          </section>
          <section className={styles.finalCtaPanel}>
            <p className={styles.panelEyebrow}>Siguiente paso</p>
            <h3 className={styles.panelTitle}>Confirma tu fuerza con el test de identidad</h3>
            <p className={styles.finalCtaBody}>Si la lectura resuena, el test te ayuda a confirmar la afinidad antes de seguir explorando producto.</p>
            <ActionRow>
              <LinkButton href={viewModel.secondaryCta.href}>{viewModel.secondaryCta.label}</LinkButton>
              <LinkButton href="/pantheon" variant="ghost">Explorar todo el pantheon</LinkButton>
            </ActionRow>
          </section>
        </div>
      </div>
    </section>
  );
}
