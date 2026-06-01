'use client';

import { useAddCartItem } from './cart.queries';
import { Button } from '../design-system';

export function AddToCartButton({
  productSlug,
  size,
  disabled = false,
}: Readonly<{ productSlug: string; size?: string; disabled?: boolean }>) {
  const addItem = useAddCartItem();
  const isDisabled = disabled || !size;

  return (
    <div className="add-to-cart-shell">
      <Button
        type="button"
        variant="primary"
        fullWidth
        className="add-to-cart-button"
        onClick={() => size && addItem.mutate({ productSlug, size, quantity: 1 })}
        loading={addItem.isPending}
        disabled={isDisabled}
      >
        {isDisabled ? 'Selecciona una talla' : addItem.isPending ? 'Agregando pieza' : 'Agregar al carrito'}
      </Button>
    </div>
  );
}
