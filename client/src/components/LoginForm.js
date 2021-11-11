import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { login } from '../redux/actions/auth.actions'
import { GoogleLogin } from 'react-google-login'


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

    const googleSuccess = async (res) => {
        const userData = res.profileObj
        dispatch(login({ ...userData }))
    }

    const googleFailure = async (error) => console.log(error)


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
                <button
                    disabled={loading}
                    onClick={loginHandler}
                    className="btn btn_primary">
                    Login
                </button>
                <div className="form__details">
                    <p className="form__detailsTitle">or</p>
                    <GoogleLogin
                        clientId="86367296794-tc24t2daos7ogmd399qbl6gumf7mlv5h.apps.googleusercontent.com"
                        render={props => (
                            <button
                                onClick={props.onClick}
                                disabled={props.disabled}
                                className="btn btn_border">
                                <FcGoogle />
                                Login with Google
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="form__link">
                        Forgot password?
                    </a>
                </div>
            </form>
        </section>
    )
}