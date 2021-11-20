import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LevelSettings } from '../components/LevelSettings'
import {
    getLevel,
    updateLevel,
    uploadImage
} from '../redux/actions/level.actions'
import { BackButton } from '../components/BackButton'


const initialState = {
    name: '',
    price: '',
    picture: '',
    description: '',
}


export const LevelPage = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const [form, setForm] = useState(initialState)
    const { level } = useSelector(state => state.level)
    const { loading } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(getLevel(id))
    }, [dispatch, id])

    useEffect(() => {
        if (level) setForm(level)
    }, [level])

    const saveHandler = e => {
        e.preventDefault()
        dispatch(updateLevel(id, form))
    }

    const uploadHandler = async ({ target }) => {
        const formData = new FormData()
        formData.append('file', target.files[0])
        dispatch(uploadImage(id, formData))
        target.value = ''
    }

    const setEditorContent = description => {
        setForm({ ...form, description })
    }

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="content">
                <div className="content__head">
                    <div>
                        <BackButton />
                        <h1>Level Settings</h1>
                    </div>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div></div>
                        {level && <LevelSettings
                            form={form}
                            level={level}
                            loading={loading}
                            saveHandler={saveHandler}
                            uploadHandler={uploadHandler}
                            changeHandler={changeHandler}
                            setEditorContent={setEditorContent}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}