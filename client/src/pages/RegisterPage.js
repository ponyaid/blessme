import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RegisterForm } from '../components/RegisterForm'


export const RegisterPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className="content">
                <div className="content__body">
                    <RegisterForm />
                    <section className="component component_sm">
                        <p className="component__text">
                            {t('register.desc-title')}&nbsp;
                            <Link to="/login" className="component__link">
                                {t('register.desc-button')}
                            </Link>
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}