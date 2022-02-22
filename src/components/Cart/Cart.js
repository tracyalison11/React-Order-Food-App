import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';


const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes['cart-tems']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>};

  return (
      <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
        <div className={classes.actions}>

        </div>
     </Modal>
  )
};

export default Cart;
