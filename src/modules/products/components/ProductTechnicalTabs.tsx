'use client';

import React, { useState } from 'react';
import type { ProductTechnicalTab } from '../services/product-detail.viewmodel';
import { ProductConstructionPanel } from '../../design-system';

export function ProductTechnicalTabs({
  tabs,
  activeTabId,
  onTabChange,
}: Readonly<{
  tabs: ProductTechnicalTab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
}>) {
  const [internalActiveTabId, setInternalActiveTabId] = useState(tabs[0]?.id ?? '');
  const resolvedActiveTabId = activeTabId ?? internalActiveTabId;
  const activeTab = tabs.find((tab) => tab.id === resolvedActiveTabId) ?? tabs[0] ?? null;

  if (!activeTab) return null;

  function handleTabChange(tabId: string) {
    if (activeTabId === undefined) {
      setInternalActiveTabId(tabId);
    }
    onTabChange?.(tabId);
  }

  return (
    <section className="xeorum-product-technical-tabs">
      <div className="xeorum-product-technical-tab-list" role="tablist" aria-label="Informacion tecnica del producto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={`xeorum-product-technical-tab${tab.id === activeTab.id ? ' is-active' : ''}`}
            aria-selected={tab.id === activeTab.id}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <ProductConstructionPanel
          label={activeTab.label}
          description={activeTab.id === 'care' ? 'Indicaciones para sostener la pieza con continuidad.' : 'Construccion completa de la pieza con lectura ordenada.'}
          items={activeTab.items}
        />
      </div>
    </section>
  );
}
