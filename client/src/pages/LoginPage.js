import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { LoginForm } from '../components/LoginForm'


export const LoginPage = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <div className="content__body">
                    <LoginForm />
                    <section className="component component_sm">
                        <p className="component__text">
                            Don't have an account yet?&nbsp;
                            <Link to="/register" className="component__link">Registration</Link>
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}