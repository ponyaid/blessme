import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { RegisterForm } from '../components/RegisterForm'


export const RegisterPage = () => {
    return (
        <>
            <Navbar />
            <section className="content">
                <div className="content__wrap">
                    <RegisterForm />
                    <div className="content__details">
                        <p>
                            Already have an account?&nbsp;
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}