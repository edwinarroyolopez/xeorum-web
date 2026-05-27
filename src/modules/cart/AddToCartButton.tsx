'use client';

import { useState } from 'react';
import { useAddCartItem } from './cart.queries';

export function AddToCartButton({
  productSlug,
  availableSizes,
}: Readonly<{ productSlug: string; availableSizes: string[] }>) {
  const [size, setSize] = useState(availableSizes[0] ?? 'M');
  const addItem = useAddCartItem();

  return (
    <div className="add-to-cart-shell">
      <label className="field-shell">
        <span>Size</span>
        <select value={size} onChange={(event) => setSize(event.target.value)}>
          {availableSizes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => addItem.mutate({ productSlug, size, quantity: 1 })}
        disabled={addItem.isPending}
      >
        {addItem.isPending ? 'Adding' : 'Add to Cart'}
      </button>
    </div>
  );
}
