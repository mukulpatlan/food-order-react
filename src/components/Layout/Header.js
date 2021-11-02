import React from 'react';

import classes from './Header.module.css';

import mealsimg from '../../assets/meals.jpeg';
import HeaderCardButton from './HeaderCardButton';

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>Meals</h1>
            <HeaderCardButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsimg} alt='meals' />
        </div>
    </React.Fragment>
}

export default Header;