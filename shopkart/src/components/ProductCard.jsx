
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import QuantityControl from './QuantityControl';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some(
      (item) => item.id === product.id
    )
  );

  const category = product.category || '';

  return (
    <article className="product-card">
      <button
        type="button"
        className={`wishlist-button ${
          isWishlisted ? 'wishlisted' : ''
        }`}
        onClick={() => dispatch(toggleWishlist(product))}
        aria-label={
          isWishlisted
            ? 'Remove from wishlist'
            : 'Add to wishlist'
        }
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      <Link
        to={`/product/${product.id}`}
        className="product-image-wrapper"
      >
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <p className="product-category">{category}</p>

        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <p className="product-rating">
          ★ {product.rating?.rate ?? 'N/A'}
          <span>
            ({product.rating?.count ?? 0} reviews)
          </span>
        </p>

        <div className="product-card-bottom">
          <strong className="product-price">
            ${product.price.toFixed(2)}
          </strong>

          {cartItem ? (
            <QuantityControl
              productId={product.id}
              quantity={cartItem.quantity}
            />
          ) : (
            <button
              type="button"
              className="primary-button add-button"
              onClick={() =>
                dispatch(
                  addToCart({ product, quantity: 1 })
                )
              }
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
