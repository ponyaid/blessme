import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'


export const NotFoundPage = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <section className="component">
                    <h1>Page not found</h1>
                    <Link to="/">Back to home</Link>
                </section>
            </div>
        </>
    )
}