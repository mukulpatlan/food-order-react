import { useReducer } from "react";
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const itemIdx = state.items.findIndex(item => item.id === action.item.id);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        let updatedItems;

        if (itemIdx > -1) {
            const updatedItem = {
                ...state.items[itemIdx],
                amount: state.items[itemIdx].amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[itemIdx] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE') {
        const itemIdx = state.items.findIndex(item => item.id === action.id);
        const updatedTotalAmount = state.totalAmount - state.items[itemIdx].price;
        let updatedItems;
        if (state.items[itemIdx].amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...state.items[itemIdx], amount: state.items[itemIdx].amount - 1 };
            updatedItems = [...state.items];
            updatedItems[itemIdx] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'CLEAR') {
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItem = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    }
    const removeItem = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }
    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }

    const cartContext = { items: cartState.items, totalAmount: cartState.totalAmount, addItem: addItem, removeItem: removeItem, clearCart: clearCartHandler }
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;