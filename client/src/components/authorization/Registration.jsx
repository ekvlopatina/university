import React, {useState} from 'react';
import './authorization.css'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [passwordNew, setPasswordNew] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={login} setValue={setLogin} type="text" placeholder="Введите login..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите старый пароль..."/>
            <Input value={passwordNew} setValue={setPasswordNew} type="password" placeholder="Введите новый пароль..."/>
            <button className="authorization__btn" onClick={() => registration(login, password, passwordNew)}>Сменить пароль</button>
        </div>
    );
};

export default Registration;