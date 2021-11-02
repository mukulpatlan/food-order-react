import classes from './Cart.module.css'

import Modal from '../UI/Modal';

const Cart = (props) => {
    const cartItems = (
        <ul className={classes['cart-items']}>
            {[{ id: 'c1', name: 'Sushi', description: "Tasty", price: '$2' }]
                .map((item => <li key={item.id}>{item.name}</li>))}
        </ul>)

    return <Modal onClose={props.onClose}>
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>33.52</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button-alt']}>Close</button>
                <button className={classes['button']}>Order</button>
            </div>
            <div></div>
        </div>
    </Modal>
}

export default Cart;