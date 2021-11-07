import { useContext, useEffect, useState } from 'react';

import classes from './HeaderCardButton.module.css';

import CardIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context';

const HeaderCardButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberofCartItems = items.reduce((prev, curr) => prev + curr.amount, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`


    useEffect(() => {
        if (!cartCtx.items.length) return;
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => setBtnIsHighlighted(false), 300);
        return () => { clearTimeout(timer) };
    }, [items]);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CardIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberofCartItems}</span>
        </button>
    )
}

export default HeaderCardButton;