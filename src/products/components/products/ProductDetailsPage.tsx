import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiError } from '../../../shared/api/client.js';
import { formatPrice } from '../../../shared/utils/format-price.js';
import { fetchProductById } from '../../products.api.js';
import type { Product } from '../../products.types.js';
import { useCartStore } from '../../../cart/cart.store.js';
import { useProducts } from '../../useProducts.js';
import { useToast } from '../../../app/useToast.js';

type DetailState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'not-found' }
  | { status: 'success'; product: Product };

function parseProductId(id: string | undefined): number | undefined {
  if (id === undefined) return undefined;

  const productId = Number(id);
  return Number.isSafeInteger(productId) && productId > 0
    ? productId
    : undefined;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const [retryCount, setRetryCount] = useState(0);
  const requestKey = `${id ?? ''}:${retryCount}`;
  const productId = parseProductId(id);
  const catalogProduct = productId
    ? products.find((product) => product.id === productId)
    : undefined;
  const [request, setRequest] = useState<{
    key: string;
    state: DetailState;
  }>({ key: requestKey, state: { status: 'loading' } });
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();
    const requestedProductId = parseProductId(id);
    const key = `${id ?? ''}:${retryCount}`;

    if (requestedProductId && !catalogProduct) {
      fetchProductById(requestedProductId, controller.signal)
        .then((product) => {
          if (isActive) {
            setRequest({
              key,
              state: { status: 'success', product },
            });
          }
        })
        .catch((error: unknown) => {
          if (
            !isActive ||
            controller.signal.aborted ||
            (error instanceof Error && error.name === 'AbortError')
          ) {
            return;
          }

          if (error instanceof ApiError && error.status === 404) {
            setRequest({ key, state: { status: 'not-found' } });
            return;
          }

          setRequest({
            key,
            state: {
              status: 'error',
              message:
                error instanceof Error
                  ? error.message
                  : 'The product could not be loaded.',
            },
          });
        });
    }

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [catalogProduct, id, retryCount]);

  const detail: DetailState =
    productId === undefined
      ? { status: 'not-found' }
      : catalogProduct
        ? { status: 'success', product: catalogProduct }
        : request.key === requestKey
          ? request.state
          : { status: 'loading' };

  if (detail.status === 'loading') {
    return (
      <p className="products-status" role="status">
        Loading product…
      </p>
    );
  }

  if (detail.status === 'not-found') {
    return (
      <section className="page-section">
        <h1>Product not found</h1>
        <Link className="text-link" to="/shop">
          Return to the shop
        </Link>
      </section>
    );
  }

  if (detail.status === 'error') {
    return (
      <section
        className="page-section products-status products-error"
        role="alert"
      >
        <h1>Product unavailable</h1>
        <p>{detail.message}</p>
        <button
          className="button button-primary"
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
        >
          Try again
        </button>
      </section>
    );
  }

  const { product } = detail;
  function handleAddToCart(): void {
    const availableProduct =
      products.find((item) => item.id === product.id) ?? product;
    if (addToCart(product.id, [availableProduct])) {
      showToast(`${product.name} added to your bag.`, 'success');
    }
  }

  return (
    <section className="page-section product-detail-page">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={product.imageAlt}
        />
      </div>
      <div className="product-details-copy">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong className="price">{formatPrice(product.price)}</strong>
        <button
          className="button button-primary"
          type="button"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          Add to bag
        </button>
      </div>
    </section>
  );
}
