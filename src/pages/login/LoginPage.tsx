import React, {  LegacyRef, useRef, useState } from 'react';
import './LoginPage.scss';
import { NavLink } from 'react-router-dom';
import { UserCredentials } from '../../interfaces/UserCredentials.interface';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { loginResponseMiddleware, recoverPasswordMiddleware } from '../../store/loginSlice/loginMiddlware';
import { selectForgotPasswordStatus, selectUserAuth } from '../../store/loginSlice/loginSlice';
import { Status } from '../../contants/enums/Status.enum';
import AbstractModal from '../../components/abstractModal/AbstractModal';

const LoginPage = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const userAuth = useSelector(selectUserAuth);  
    const forgotPasswordStatus = useSelector(selectForgotPasswordStatus);

    const emailRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);
    const passwordRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);

    const forgotPasswordRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);

    const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState<boolean>(false);

    const loginHandler = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(emailRef.current?.value && passwordRef.current?.value){
            dispatch(loginResponseMiddleware({
                email: emailRef.current.value,
                password: passwordRef.current.value
            } as UserCredentials));
            emailRef.current.value = '';
            passwordRef.current.value = '';
        };
    };

    const handleForgotPasswordHandler = (event: React.FormEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setOpenForgotPasswordModal(true);
    }

    const recoverButtonHandler = () => {
        if(forgotPasswordRef.current?.value){
            dispatch(recoverPasswordMiddleware(forgotPasswordRef.current.value));
            forgotPasswordRef.current.value = '';
        }
    }

    const closeModal = () => {
        setOpenForgotPasswordModal(false);
    }
    
    return (
        <React.Fragment>
            <div className="loginPage">
               <div className="loginPage__container">
                    <form  className='loginPage__container__form'>
                        <h1> Sign In </h1>
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        {
                            userAuth.status !== Status.FAILED ? <></> : <p className='loginPage__container__form__error-message'> Incorrect Credetials </p>
                        } 
                        <a onClick={handleForgotPasswordHandler} href=""> Forgot your password? </a>
                        <button type="button" onClick={loginHandler}> Sign In </button> 
                        <NavLink to='/register' className="loginPage__container__form__registerLink"> Dont have an account ?</NavLink>
                    </form>  
                </div>
            </div>  
            <AbstractModal isOpen={openForgotPasswordModal} closeModal={closeModal}>
                <button onClick={recoverButtonHandler} className='loginPage__recover-button'> Recover Password </button>
                {
                    forgotPasswordStatus !== Status.FAILED ? <></> : <p className='loginPage__recover-error'> Email not found </p>
                } 
                <input className='loginPage__recover-input' ref={forgotPasswordRef} placeholder='Email Address' />
            </AbstractModal>
        </React.Fragment>
    );
};

export default LoginPage