import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../components/Navbar'
import { PostSettings } from '../components/PostSettings'
import { createLevel } from '../redux/actions/level.actions'

const initialState = {
    body: '',
    title: '',
    cover: '',
    level: '',
}

export const PostCreatePage = () => {
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
                    <h1>Post Settings</h1>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div></div>
                        <PostSettings
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