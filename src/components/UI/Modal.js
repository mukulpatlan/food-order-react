import React from 'react';
import ReactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div onClick={props.onClose} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalEle = document.getElementById('modal-div');

const Modal = (props) => {
    return <React.Fragment>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, portalEle)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEle)}
    </React.Fragment>
}

export default Modal;