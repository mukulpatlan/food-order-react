import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        code: true
    });

    const nameInputRef = useRef();
    const streeInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streeInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredSteetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);

        setFormValidity({
            name: enteredNameIsValid,
            street: enteredSteetIsValid,
            city: enteredCityIsValid,
            code: enteredPostalCodeIsValid
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredSteetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            code: enteredPostalCode
        });
    };

    const nameControlClass = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
    const streetControlClass = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
    const cityControlClass = `${classes.control} ${formValidity.city ? '' : classes.invalid}`;
    const codeControlClass = `${classes.control} ${formValidity.code ? '' : classes.invalid}`;

    return <form onSubmit={confirmHandler}>
        <div className={nameControlClass}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formValidity.name && <p>Please enter valid name</p>}
        </div>
        <div className={streetControlClass}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streeInputRef} />
            {!formValidity.street && <p>Please enter valid street</p>}
        </div>
        <div className={codeControlClass}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalCodeInputRef} />
            {!formValidity.code && <p>Please enter valid code(5 char)</p>}
        </div>
        <div className={cityControlClass}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formValidity.city && <p>Please enter valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onClose}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
}

export default Checkout;