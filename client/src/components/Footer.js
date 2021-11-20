import React from 'react'
import { Link } from 'react-router-dom'
import { FaCcMastercard, FaCcVisa, FaCcApplePay } from 'react-icons/fa'
import { Select } from './Select'


export const Footer = () => {
    return (
        <section className="footer">
            <div style={{ padding: '1rem 0' }}>
                <Link to="/"
                    className="logo navbar__logo">
                    blessme
                </Link>
            </div>
            <div className="footer__content">
                
                <div>
                    <p className="footer__title">
                        Details
                    </p>
                    <div>
                        <Link
                            to="/"
                            className="footer__listItem">
                            About us
                        </Link>
                        <Link
                            to="/"
                            className="footer__listItem">
                            Help center
                        </Link>
                    </div>
                </div>
                <div>
                    <p className="footer__title">
                        Legal
                    </p>
                    <div>
                        <Link
                            to="/"
                            className="footer__listItem">
                            Terms of use
                        </Link>
                        <Link
                            to="/"
                            className="footer__listItem">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <p className="footer__title">
                        Contacts
                    </p>
                    <address className="footer__address">
                        600 Townsend Street, Suite 500<br />
                        San Francisco, CA 94103<br />
                        Telephone: +1 (833) 972-8766<br />
                    </address>
                </div>
            </div>

            <div className="footer__payments">
                <FaCcMastercard />
                <FaCcVisa />
                <FaCcApplePay />
            </div>
            <div className="footer__copyright">
                <p>Copyright © 2021 Blessme Inc. All rights reserved.</p>
                <Select
                    name='language'
                    options={[
                        { value: 'en', text: 'EN' },
                        { value: 'ru', text: 'RU' }
                    ]}
                />
            </div>
        </section>
    )
}