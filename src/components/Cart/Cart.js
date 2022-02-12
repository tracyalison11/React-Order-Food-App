import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$$cartCtx.totalAmount.toFixed(2)`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {

  };

  const cartItemAddHandler = item => {

  };

  const cartItems = (
    <ul className={classes['cart-tems']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAddProp={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
      <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
     </Modal>
  )
};

export default Cart;
