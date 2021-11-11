import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../components/Navbar'
import { LevelSettings } from '../components/LevelSettings'
import { createLevel } from '../redux/actions/level.actions'

const initialState = {
    name: '',
    price: 0,
    picture: '',
    description: '',
}

export const LevelCreatePage = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [form, setForm] = useState(initialState)

    const saveHandler = e => {
        e.preventDefault()
        dispatch(createLevel({ ...form, space: user.space }))
    }

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            <div className="content">
                <div className="content__head">
                    <h1>Level Settings</h1>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div></div>
                        <LevelSettings
                            form={form}
                            saveHandler={saveHandler}
                            changeHandler={changeHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}