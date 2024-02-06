import React, { AnchorHTMLAttributes, LegacyRef, useEffect, useRef, useState } from 'react';
import './LoginPage.scss';
import { NavLink } from 'react-router-dom';
import { UserCredentials } from '../../interfaces/UserCredentials.interface';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import loginResponseMiddleware from '../../store/loginSlice/loginMiddlware';
import { selectUserAuth } from '../../store/loginSlice/loginSlice';
import { Status } from '../../contants/enums/Status.enum';
import { eventNames } from 'process';
import AbstractModal from '../../components/abstractModal/AbstractModal';
const LoginPage = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const userAuth = useSelector(selectUserAuth);  

    const emailRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);
    const passwordRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);

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
        console.log(userAuth);
    };

    const handleForgotPasswordHandler = (event: React.FormEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setOpenForgotPasswordModal(true);
    }

    const closeModal = () => {
        setOpenForgotPasswordModal(false);
    }
    
    return (
        <React.Fragment>
            <div className="loginPage">
               <div className="loginPage__container">
                    <form className='loginPage__container__form'>
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
                <input placeholder='Email Address'  />
            </AbstractModal>
        </React.Fragment>
    );
};

export default LoginPage