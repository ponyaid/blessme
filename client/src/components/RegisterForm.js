import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { useTranslation } from 'react-i18next'
import { GoogleLogin } from 'react-google-login'
import { register } from '../redux/actions/auth.actions'


export const RegisterForm = () => {
    const { t } = useTranslation()
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
            <h3 className="component__title">
                {t('register.title')}
            </h3>
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
                                {t('register.google')}
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <p className="form__detailsTitle">
                        {t('register.or')}
                    </p>
                </div>
                <div className="form__inputs">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        placeholder={t('register.name-label')}
                        onChange={changeHandler}
                        className="form__input"
                    />
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        placeholder={t('register.email-label')}
                        onChange={changeHandler}
                        className="form__input"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        placeholder={t('register.password-label')}
                        onChange={changeHandler}
                        className="form__input"
                    />
                </div>
                <button
                    disabled={loading}
                    onClick={registerHandler}
                    className="btn btn_primary form__btn">
                    {t('register.button')}
                </button>
                <div className="form__details">
                    <p className="form__detailsText">
                        {t('register.details')}&nbsp;
                        <a href="/">Terms of Service</a>,&nbsp;
                        <a href="/">Privacy Policy</a> and&nbsp;
                        <a href="/">Cookie Policy</a>.
                    </p>
                </div>
            </form>
        </section>
    )
}