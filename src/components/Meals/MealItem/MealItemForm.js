import { useRef, useState } from 'react';
import Input from '../../UI/input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true)

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmt = amountInputRef.current.value;
        const enteredAmtNum = +enteredAmt;

        if (enteredAmt.trim().length === 0 ||
            enteredAmtNum < 1 ||
            enteredAmtNum > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmtNum);
    }
    return (
        <form className={classes.form}>
            <Input ref={amountInputRef} label="Amount" input={{ id: 'amount_' + props.id, type: 'number', min: '1', max: '5', step: '1', defaultValue: '1' }} />
            {!amountIsValid && <p>Please enter a valid amount(1 - 5).</p>}
            <button onClick={submitHandler}>+ Add</button>
        </form>
    )
}

export default MealItemForm;