import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaCcMastercard, FaCcVisa, FaCcApplePay } from 'react-icons/fa'
import { Select } from './Select'


export const Footer = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value)
    }

    return (
        <section
            className="footer"
            style={{ marginTop: 'auto' }}>
            <div style={{ padding: '1rem 0' }}>
                <Link to="/"
                    className="logo navbar__logo">
                    blessme
                </Link>
            </div>
            <div className="footer__content">
                <div>
                    <p className="footer__title">
                        {t('footer.legal')}
                    </p>
                    <div>
                        <Link
                            to="/"
                            className="footer__listItem">
                            {t('footer.terms-of-use')}
                        </Link>
                        <Link
                            to="/"
                            className="footer__listItem">
                            {t('footer.privacy-policy')}
                        </Link>
                    </div>
                </div>
                <div>
                    <p className="footer__title">
                        {t('footer.details')}
                    </p>
                    <div>
                        <Link
                            to="/"
                            className="footer__listItem">
                            {t('footer.about-us')}
                        </Link>
                        <Link
                            to="/"
                            className="footer__listItem">
                            {t('footer.help-center')}
                        </Link>
                    </div>
                </div>

                <div style={{ marginLeft: 'auto' }}>
                    <p className="footer__title">
                        {t('footer.contacts')}
                    </p>
                    <address className="footer__address">
                        {t('footer.address')}
                        <br />
                        {t('footer.telephone')}
                    </address>
                </div>
            </div>

            <div className="footer__payments">
                <FaCcMastercard />
                <FaCcVisa />
                <FaCcApplePay />
            </div>
            <div className="footer__copyright">
                <p>{t('footer.copyright')}</p>
                <Select
                    name='language'
                    options={[
                        { value: 'en', text: 'EN' },
                        { value: 'ru', text: 'RU' }
                    ]}
                    value={i18n.language}
                    selectHandler={changeLanguage}
                />
            </div>
        </section>
    )
}