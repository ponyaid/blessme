import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions'


export const RegisterForm = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        dispatch(register({ ...form }))
    }

    return (
        <div className="component">
            <h3 className="component__title">Registration</h3>
            <form className="form">
                <div className="form__inputs">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        placeholder="Enter your name"
                        onChange={changeHandler}
                        className="form__input"
                    />
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        placeholder="Enter your email"
                        onChange={changeHandler}
                        className="form__input"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        placeholder="Enter password"
                        onChange={changeHandler}
                        className="form__input"
                    />
                </div>
                <button
                    disabled={loading}
                    onClick={registerHandler}
                    className="btn btn_primary form__btn">
                    Registration
                </button>
            </form>
            <div className="form__details">
                <p>
                    By registering, you agree to our&nbsp;
                    <a href="/">Terms of Service</a>,&nbsp;
                    <a href="/">Privacy Policy</a> and&nbsp;
                    <a href="/">Cookie Policy</a>.
                </p>
            </div>
        </div>
    )
}