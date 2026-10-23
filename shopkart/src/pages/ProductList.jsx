
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
} from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';

const categories = [
  'All',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

function ProductList() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const [selectedCategory, setSelectedCategory] =
    useState('All');

  const [sortBy, setSortBy] = useState('featured');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = useMemo(() => {
    let result = [...items];

    if (selectedCategory !== 'All') {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    result = result.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, selectedCategory, sortBy, search]);

  return (
    <main className="page-container">
      <section className="page-heading">
        <div>
          <p className="eyebrow">SHOPKART COLLECTION</p>
          <h1>All products</h1>
          <p className="muted-text">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="sort-control">
          <label htmlFor="sort">Sort by</label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to high</option>
            <option value="high-low">Price: High to low</option>
          </select>
        </div>
      </section>

      <div className="search-box">
        <span>⌕</span>
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search products"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="category-chips">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={
              selectedCategory === category
                ? 'category-chip active'
                : 'category-chip'
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'All'
              ? 'All'
              : category.charAt(0).toUpperCase() +
                category.slice(1)}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <p className="status-message">Loading products...</p>
      )}

      {status === 'failed' && (
        <div className="error-message">
          <p>
            Could not load products. {error}
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={() => dispatch(fetchProducts())}
          >
            Try again
          </button>
        </div>
      )}

      {status === 'succeeded' && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Try another search or category.</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default ProductList;
