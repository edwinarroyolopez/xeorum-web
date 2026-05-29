'use client';

import { useState } from 'react';
import { useAddCartItem } from './cart.queries';
import { Button, Select } from '../design-system';

export function AddToCartButton({
  productSlug,
  availableSizes,
}: Readonly<{ productSlug: string; availableSizes: string[] }>) {
  const [size, setSize] = useState(availableSizes[0] ?? 'M');
  const addItem = useAddCartItem();

  return (
    <div className="add-to-cart-shell">
      <Select
        label="Size"
        value={size}
        onChange={(event) => setSize(event.target.value)}
        options={availableSizes.map((option) => ({ label: option, value: option }))}
      />
      <Button type="button" onClick={() => addItem.mutate({ productSlug, size, quantity: 1 })} loading={addItem.isPending}>
        {addItem.isPending ? 'Adding' : 'Add to Cart'}
      </Button>
    </div>
  );
}
