import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { useTranslation } from 'react-i18next'
import { login } from '../redux/actions/auth.actions'
import { GoogleLogin } from 'react-google-login'


export const LoginForm = () => {
    const { t } = useTranslation()
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
            <h3 className="component__title">
                {t('login.title')}
            </h3>
            <form className="form">
                <div className="form__inputs">
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        placeholder={t('login.email-label')}
                        onChange={changeHandler}
                        className="form__input"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        placeholder={t('login.password-label')}
                        onChange={changeHandler}
                        className="form__input"
                    />
                </div>
                <button
                    disabled={loading}
                    onClick={loginHandler}
                    className="btn btn_primary">
                    {t('login.button')}
                </button>
                <div className="form__details">
                    <p className="form__detailsTitle">
                        {t('login.or')}
                    </p>
                    <GoogleLogin
                        clientId="86367296794-tc24t2daos7ogmd399qbl6gumf7mlv5h.apps.googleusercontent.com"
                        render={props => (
                            <button
                                onClick={props.onClick}
                                disabled={props.disabled}
                                className="btn btn_border">
                                <FcGoogle />
                                {t('login.google')}
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
                        {t('login.forgot-password')}
                    </a>
                </div>
            </form>
        </section>
    )
}