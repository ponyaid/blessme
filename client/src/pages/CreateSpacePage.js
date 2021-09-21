import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { CreateSpaceForm } from '../components/CreateSpaceForm'


export const CreateSpacePage = () => {
    
    const [initialCreate, setInitialCreate] = useState(false)

    const initialHandler = () => setInitialCreate(!initialCreate)

    return (
        <>
            <Navbar />
            <div className="content">
                {initialCreate ?
                    <CreateSpaceForm
                        backHandler={initialHandler}
                    />
                    :
                    <section className="component">
                        <h3 className="component__title">Become a creator</h3>
                        <p className="component__desc">
                            Almost ready! Complete and publish the page.
                        </p>
                        <div className="create">
                            <button
                                onClick={initialHandler}
                                className="btn btn_primary">
                                Create a page
                            </button>
                        </div>
                    </section>
                }
            </div>
        </>
    )
}