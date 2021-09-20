import React from 'react'
import { Navbar } from '../components/Navbar'


export const CreateSpacePage = () => {
    return (
        <>
            <Navbar />
            <section className="content">
                <div className="component">
                    <h3 className="component__title">
                        You don't have a public page yet, but you can create one
                    </h3>
                    <p className="component__desc">
                        You need to go through 5 steps to create a public page
                    </p>
                    <div className="create">
                        <button className="btn btn_primary">Start creating</button>
                    </div>
                </div>
            </section>
        </>
    )
}