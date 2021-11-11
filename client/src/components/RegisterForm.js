import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { GoogleLogin } from 'react-google-login'
import { register } from '../redux/actions/auth.actions'


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

    const googleSuccess = async (res) => {
        const userData = res.profileObj
        dispatch(register({ ...userData }))
    }

    const googleFailure = async (error) => console.log(error)

    return (
        <section className="component component_sm">
            <h3 className="component__title">Registration</h3>
            <form className="form">
                <div className="form__details">
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
                    <p className="form__detailsTitle">or</p>
                </div>
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
                <div className="form__details">
                    <p className="form__detailsText">
                        By registering, you agree to our&nbsp;
                        <a href="/">Terms of Service</a>,&nbsp;
                        <a href="/">Privacy Policy</a> and&nbsp;
                        <a href="/">Cookie Policy</a>.
                    </p>
                </div>
            </form>
        </section>
    )
}