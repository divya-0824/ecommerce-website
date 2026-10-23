
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [quantity, setQuantity] = useState(1);

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setStatus('loading');
      setProduct(null);

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();

        if (!cancelled) {
          setProduct(data);
          setStatus('succeeded');
        }
      } catch {
        if (!cancelled) {
          setStatus('failed');
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  if (status === 'loading') {
    return (
      <main className="page-container">
        <p className="status-message">Loading product...</p>
      </main>
    );
  }

  if (status === 'failed' || !product) {
    return (
      <main className="page-container">
        <div className="error-message">
          <p>Unable to load this product.</p>
          <button
            className="primary-button"
            onClick={() => dispatch(fetchProducts())}
          >
            Load product list
          </button>
          <Link to="/">Back to products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <p className="breadcrumb">
        <Link to="/">Products</Link>
        {' / '}
        {product.category}
        {' / '}
        {product.title}
      </p>

      <section className="detail-layout">
        <div className="detail-image-panel">
          <img
            src={product.image}
            alt={product.title}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="product-rating">
            ★ {product.rating?.rate ?? 'N/A'}
            <span>
              ({product.rating?.count ?? 0} reviews)
            </span>
          </p>

          <p className="detail-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="detail-quantity">
            <label htmlFor="quantity">Quantity</label>

            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="detail-buttons">
            <button
              type="button"
              className="primary-button large-button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            <Link
              to="/cart"
              className="secondary-button large-button"
            >
              {cartItem ? 'Go to cart' : 'View cart'}
            </Link>
          </div>

          <div className="shopping-benefits">
            <p>✓ Free shipping on orders of $100 or more</p>
            <p>✓ 30-day easy returns</p>
          </div>
        </div>
      </section>

      <section className="detail-extra">
        <h2>Product information</h2>
        <p>{product.description}</p>
      </section>
    </main>
  );
}

export default ProductDetails;
