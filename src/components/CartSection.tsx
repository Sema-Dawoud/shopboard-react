import { formatPrice } from '../shared/utils/format-price.js';
import type { CartProduct } from '../modules/cart/cart.types.js';

interface CartSectionProps {
  items: CartProduct[];
  count: number;
  total: number;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number, productName: string) => void;
  onClear: () => void;
}

export function CartSection({
  items,
  count,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartSectionProps) {
  return (
    <section className="cart-section" id="cart" aria-labelledby="cart-title">
      <div className="cart-inner">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">YOUR LITTLE COLLECTION</p>
            <h2 id="cart-title">
              Shopping bag <span>({count})</span>
            </h2>
          </div>
          <a className="text-link" href="#favorites">
            Continue shopping <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div aria-live="polite">
          {items.length === 0 ? (
            <p className="empty-cart">
              Your bag is waiting for something lovely.
            </p>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} each</p>
                    <div className="cart-item-actions">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => onDecrease(item.id)}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        disabled={!item.inStock}
                        onClick={() => onIncrease(item.id)}
                      >
                        +
                      </button>
                      <button
                        className="remove-item"
                        type="button"
                        onClick={() => onRemove(item.id, item.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong className="cart-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </article>
              ))}
            </div>
          )}
        </div>
        <div className="cart-summary">
          <p>
            Subtotal <strong>{formatPrice(total)}</strong>
          </p>
          <button
            className="button button-secondary"
            type="button"
            disabled={items.length === 0}
            onClick={onClear}
          >
            Clear bag
          </button>
        </div>
        <p className="cart-note">
          Your bag stays saved on this device for your next visit.
        </p>
      </div>
    </section>
  );
}
