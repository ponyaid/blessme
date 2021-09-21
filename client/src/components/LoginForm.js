import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions'


export const LoginForm = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)
    const [form, setForm] = useState({ email: '', password: '' })

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        dispatch(login({ ...form }))
    }

    return (
        <section className="component component_sm">
            <h3 className="component__title">Login</h3>
            <form className="form">
                <div className="form__inputs">
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
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="form__link">
                    Forgot password?
                </a>
                <button
                    disabled={loading}
                    onClick={loginHandler}
                    className="btn btn_primary form__btn">
                    Login
                </button>
            </form>
        </section>
    )
}