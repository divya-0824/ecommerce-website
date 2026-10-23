
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  removeFromCart,
  selectTotalItems,
  selectTotalPrice,
} from '../redux/cartSlice';
import QuantityControl from '../components/QuantityControl';

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectTotalPrice);

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    alert('Demo checkout: payment is not connected yet.');
  };

  return (
    <main className="page-container">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SHOPPING BAG</p>
          <h1>Your cart ({totalItems} items)</h1>
        </div>

        <Link to="/" className="text-link">
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="empty-state cart-empty">
          <div className="empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>
            Looks like you haven't added anything yet.
            Browse the products and add your favourites.
          </p>
          <Link to="/" className="primary-button">
            Browse products
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-panel">
            <div className="cart-panel-heading">
              <h2>Products</h2>

              <button
                type="button"
                className="text-button danger-text"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to clear your cart?'
                    )
                  ) {
                    dispatch(clearCart());
                  }
                }}
              >
                Clear cart
              </button>
            </div>

            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link
                  to={`/product/${item.id}`}
                  className="cart-item-image"
                >
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="cart-item-info">
                  <p className="product-category">
                    {item.category}
                  </p>

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-title"
                  >
                    {item.title}
                  </Link>

                  <p className="cart-item-unit-price">
                    ${item.price.toFixed(2)} each
                  </p>

                  <button
                    type="button"
                    className="text-button danger-text"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-right">
                  <QuantityControl
                    productId={item.id}
                    quantity={item.quantity}
                  />

                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Order summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {subtotal > 0 && subtotal < 100 && (
              <p className="shipping-note">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}

            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="primary-button checkout-button"
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>

            <p className="persist-note">
              Your cart is saved. Refresh the page and it stays.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
