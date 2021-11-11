import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { RegisterForm } from '../components/RegisterForm'


export const RegisterPage = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <div className="content__body">
                    <RegisterForm />
                    <section className="component component_sm">
                        <p className="component__text">
                            Already have an account?&nbsp;
                            <Link to="/login" className="component__link">Login</Link>
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}