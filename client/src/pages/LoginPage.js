import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { LoginForm } from '../components/LoginForm'


export const LoginPage = () => {
    return (
        <>
            <Navbar />
            <section className="content">
                <div className="content__wrap">
                    <LoginForm />
                    <div className="content__details">
                        <p>
                            Don't have an account yet?&nbsp;
                            <Link to="/register">Registration</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}