import React from 'react'
import { Navbar } from '../components/Navbar'


export const SpacePage = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <section className="component">
                    <h3 className="component__title">Public Page</h3>
                </section>
            </div>
        </>
    )
}