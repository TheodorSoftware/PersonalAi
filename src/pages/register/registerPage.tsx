import React, { Dispatch, LegacyRef, useRef, useState } from "react";
import './registerPage.scss';
import { NavLink } from "react-router-dom";
import { RegisterUserData } from "../../interfaces/RegisterUserData.interface";
import registerResponseMiddleware from "../../store/registerSlice/registerMiddleware.middleware";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
    
    const dispatch: Dispatch<any> = useDispatch();
    const confirmPasswordRef: LegacyRef<HTMLInputElement> | undefined = useRef(null)
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [registerData,setRegisterData] = useState<RegisterUserData>({
        name: '',
        email: '',
        password: '',
    });

    const handleInputClientRegisterData = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setRegisterData(prevData => ({...prevData, [event.target.name]: event.target.value}))
    }

    const handleConfirmPassword = () =>{
        registerData.password === confirmPasswordRef.current?.value ? setPasswordMatch(true) : setPasswordMatch(false);
    }
    
    const registerHandler = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        passwordMatch ? dispatch(registerResponseMiddleware(registerData as RegisterUserData)) : void(0);
    }

    return (
        <React.Fragment>
            <div className="registerPage">
               <div className="registerPage__container">
                    <form className='registerPage__container__form' action=''>
                        <h1> Sign Up </h1>
                        <input onChange={handleInputClientRegisterData} type="text" placeholder="Name" name="name"/>
                        <input onChange={handleInputClientRegisterData} type="email" placeholder="Email" name="email"/>
                        <input onChange={handleInputClientRegisterData} type="password" placeholder="Password" name="password"/>
                        <input onBlur={handleConfirmPassword} ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                        <NavLink className="loginPage__container__form__registerLink" to="/login"> Already have an account ? </NavLink>
                        <button onClick={registerHandler} type="submit"> Sign Up </button>
                        {
                            passwordMatch ?  <></> : <span> Passwords don't match ! </span>
                        }
                    </form>    
                </div>
            </div>  
        </React.Fragment>
    )
};

export default RegisterPage