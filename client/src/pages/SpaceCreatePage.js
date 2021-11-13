import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'react-use'
import Swal from 'sweetalert2'
import Confetti from 'react-confetti'
import { CreateSpaceForm } from '../components/CreateSpaceForm'
import { Navbar } from '../components/Navbar'
import classes from '../static/scss/settings.module.scss'
import { createSpace } from '../redux/actions/space.actions'



const initialState = {
    alias: '',
    title: '',
    onlyAdult: false
}

export const SpaceCreatePage = () => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)
    const { width, height } = useWindowSize()
    const [form, setForm] = useState(initialState)
    const [success, setSuccess] = useState(false)
    const { loading } = useSelector(state => state.app)
    const { user } = useSelector(state => state.auth)

    const backHandler = e => {
        e.preventDefault()
        setStep(step - 1)
    }

    const nextHandler = e => {
        e.preventDefault()
        setStep(step + 1)
    }

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const toggleHandler = e => {
        setForm({ ...form, [e.target.name]: !form[e.target.name] })
    }

    const createHandler = async (e) => {
        e.preventDefault()
        dispatch(createSpace({ ...form }))
        setSuccess(true)
        Swal.fire({
            title: 'Great job!',
            text: 'The public page has been successfully created!',
            icon: 'success',
        }).then(() => window.location.href = `/${form.alias}`)
    }

    return (
        <>
            <Confetti
                width={width}
                height={height}
                run={success}
            />
            <Navbar />
            <div className="content">
                <div className="content__head">
                    <div>
                        <h1>Become a creator</h1>
                        <p className="content__desc">
                            Please follow the steps to configure your Project and deploy it.
                        </p>
                    </div>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div>
                            <ul className={classes.progressList}>
                                <li
                                    className={`${classes.progressList__item} 
                                    ${step > 0 && classes.progressList__item_active}`}>
                                    Page alias
                                </li>
                                <li
                                    className={`${classes.progressList__item} 
                                    ${step > 1 && classes.progressList__item_active}`}>
                                    Visible title
                                </li>
                                <li
                                    className={`${classes.progressList__item} 
                                    ${step > 2 && classes.progressList__item_active}`}>
                                    Adult content
                                </li>
                                <li
                                    className={`${classes.progressList__item} 
                                    ${step > 3 && classes.progressList__item_active}`}>
                                    Confirmation
                                </li>
                            </ul>
                        </div>
                        <CreateSpaceForm
                            form={form}
                            step={step}
                            loading={loading}
                            nextHandler={nextHandler}
                            backHandler={backHandler}
                            changeHandler={changeHandler}
                            toggleHandler={toggleHandler}
                            createHandler={createHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}