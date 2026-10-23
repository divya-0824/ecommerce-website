
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);

  return (
    <main className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR FAVOURITES</p>
          <h1>My Wishlist</h1>
          <p className="muted-text">
            {items.length} saved products
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <section className="empty-state">
          <div className="empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>
            Save products you like by clicking the heart icon.
          </p>
          <Link to="/" className="primary-button">
            Browse products
          </Link>
        </section>
      ) : (
        <div className="products-grid">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
