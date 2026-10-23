
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../redux/cartSlice';

function Navbar() {
  const cartCount = useSelector(selectTotalItems);

  const wishlistCount = useSelector(
    (state) => state.wishlist.items.length
  );

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          ShopKart
        </Link>

        <nav className="nav-actions">
          <Link to="/">Products</Link>

          <Link to="/wishlist">
            Wishlist
            <span className="nav-badge">{wishlistCount}</span>
          </Link>

          <Link to="/cart" className="cart-link">
            Cart
            <span className="nav-badge">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
