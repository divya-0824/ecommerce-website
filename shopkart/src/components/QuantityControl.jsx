
import { useDispatch } from 'react-redux';
import { increase, decrease } from '../redux/cartSlice';

function QuantityControl({ productId, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="quantity-control">
      <button
        type="button"
        onClick={() => dispatch(decrease(productId))}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        onClick={() => dispatch(increase(productId))}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
