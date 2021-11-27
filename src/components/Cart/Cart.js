import React, { useContext, useState } from 'react';
import classes from './Cart.module.css'

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dIdSubmitting, setDidSubmitting] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item => <CartItem key={item.id} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} name={item.name} amount={item.amount} price={item.price} />))}
        </ul>)

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-guide-9f34b.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmitting(true);
        cartCtx.clearCart();
    }

    const modalAction = (
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button-alt']}>Close</button>
            {hasItems && <button onClick={orderHandler} className={classes['button']}>Order</button>}
        </div>
    );

    const isSubmittingModalContent = <p>Sending order data..</p>;
    const didSubmittedModalContent = <React.Fragment>
        <p>Successfully sent order data!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>;

    const cartModalContent = <React.Fragment>
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitHandler} onClose={props.onClose} />}
            {!isCheckout && modalAction}
        </div>
    </React.Fragment>

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !dIdSubmitting && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {dIdSubmitting && !isSubmitting && didSubmittedModalContent}
    </Modal>
}

export default Cart;