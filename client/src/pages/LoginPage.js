import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '../components/LoginForm'


export const LoginPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className="content">
                <div className="content__body">
                    <LoginForm />
                    <section className="component component_sm">
                        <p className="component__text">
                            {t('login.desc-title')}&nbsp;
                            <Link to="/register" className="component__link">
                                {t('login.desc-button')}
                            </Link>
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}