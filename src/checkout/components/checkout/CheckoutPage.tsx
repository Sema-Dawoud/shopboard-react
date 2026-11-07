import { useState, type HTMLInputTypeAttribute } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useCartStore } from '../../../cart/cart.store.js';
import type { CartProduct } from '../../../cart/cart.types.js';
import { useProducts } from '../../../products/useProducts.js';
import { formatPrice } from '../../../shared/utils/format-price.js';
import { Button } from '../../../shared/components/ui/button.js';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../shared/components/ui/card.js';
import { Input } from '../../../shared/components/ui/input.js';
import { Label } from '../../../shared/components/ui/label.js';

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s()-]{7,20}$/, 'Enter a valid phone number.')
    .refine(
      (phone) => phone.replace(/\D/g, '').length >= 7,
      'Enter at least 7 digits.',
    ),
  address: z.string().trim().min(5, 'Enter a complete street address.'),
  city: z.string().trim().min(2, 'Enter your city.'),
  postalCode: z.string().trim().min(3, 'Enter a valid postal code.'),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

type CheckoutField = Readonly<{
  name: keyof CheckoutValues;
  label: string;
  type: HTMLInputTypeAttribute;
  autoComplete: string;
}>;

const fields: readonly CheckoutField[] = [
  { name: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
  {
    name: 'address',
    label: 'Street address',
    type: 'text',
    autoComplete: 'street-address',
  },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
  {
    name: 'postalCode',
    label: 'Postal code',
    type: 'text',
    autoComplete: 'postal-code',
  },
];

export default function CheckoutPage() {
  const { products } = useProducts();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const items: CartProduct[] = cartItems.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  function placeOrder(): void {
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <section
        className="page-section checkout-page"
        aria-labelledby="checkout-title"
      >
        <Card className="ui-card checkout-confirmation" role="status">
          <CardHeader className="ui-card-header">
            <p className="eyebrow">ORDER CONFIRMED</p>
            <CardTitle className="ui-card-title" id="checkout-title">
              Thank you for your order.
            </CardTitle>
          </CardHeader>
          <CardContent className="ui-card-content">
            <p>Your mock order is confirmed. We’ve cleared your bag.</p>
            <Link className="button button-primary" to="/shop">
              Continue shopping
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section
        className="page-section checkout-page"
        aria-labelledby="checkout-title"
      >
        <p className="eyebrow">CHECKOUT</p>
        <h1 id="checkout-title">Your bag is empty.</h1>
        <p>Add something lovely to your bag before checking out.</p>
        <Link className="button button-primary" to="/shop">
          Browse the shop
        </Link>
      </section>
    );
  }

  return (
    <section
      className="page-section checkout-page"
      aria-labelledby="checkout-title"
    >
      <header className="checkout-heading">
        <p className="eyebrow">CHECKOUT</p>
        <h1 id="checkout-title">A few details, then it’s yours.</h1>
        <p>Enter your shipping details to place your order.</p>
      </header>
      <div className="checkout-layout">
        <Card className="ui-card">
          <CardHeader className="ui-card-header">
            <CardTitle className="ui-card-title">Shipping details</CardTitle>
          </CardHeader>
          <CardContent className="ui-card-content">
            <form
              className="checkout-form"
              noValidate
              onSubmit={form.handleSubmit(placeOrder)}
            >
              {fields.map(({ name, label, type, autoComplete }) => {
                const error = form.formState.errors[name];
                const errorId = `${name}-error`;
                return (
                  <div className="checkout-field" key={name}>
                    <Label className="ui-label" htmlFor={name}>
                      {label}
                    </Label>
                    <Input
                      className="ui-input"
                      id={name}
                      type={type}
                      autoComplete={autoComplete}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      {...form.register(name)}
                    />
                    {error?.message && (
                      <p className="field-error" id={errorId} role="alert">
                        {error.message}
                      </p>
                    )}
                  </div>
                );
              })}
              <Button
                className="ui-button ui-button-default checkout-submit"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Place mock order · {formatPrice(total)}
              </Button>
              <p className="checkout-note">
                This demo does not process payments or collect card details.
              </p>
            </form>
          </CardContent>
        </Card>
        <Card
          className="ui-card order-summary"
          aria-labelledby="order-summary-title"
        >
          <CardHeader className="ui-card-header">
            <CardTitle className="ui-card-title" id="order-summary-title">
              Order summary
            </CardTitle>
          </CardHeader>
          <CardContent className="ui-card-content">
            <ul className="checkout-items">
              {items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name}
                    <small>Qty {item.quantity}</small>
                  </span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <Link className="checkout-back-link" to="/cart">
              Edit your bag
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
