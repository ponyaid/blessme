import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostSettings } from '../components/PostSettings'
import { getLevelsByOwner } from '../redux/actions/level.actions'
import { createPost } from '../redux/actions/post.actions'
import { useUpload } from '../hooks/upload.hook'
import { BackButton } from '../components/BackButton'


const initialState = {
    body: '',
    title: '',
    level: '',
    public: true,
    commentsDisabled: false,
}

export const PostCreatePage = () => {
    const dispatch = useDispatch()
    const { uploadFile } = useUpload()
    const { user } = useSelector(state => state.auth)
    const { levels } = useSelector(state => state.level)
    const [isLevelsSelect, setIsLevelsSelect] = useState(false)
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        dispatch(getLevelsByOwner())
    }, [dispatch])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const setEditorContent = body => {
        setForm({ ...form, body })
    }

    const saveHandler = async (cover) => {
        const data = { ...form }
        if (cover) {
            const res = await uploadFile(cover)
            data['cover'] = res.secure_url
        }

        data['space'] = user.space._id || user.space
        dispatch(createPost(data))
    }

    const modesHandler = e => {
        if (e.target.value === 'Open to everyone') {
            setIsLevelsSelect(false)
            return setForm({ ...form, public: true, level: '' })
        }
        if (e.target.value === 'Only subscribers') {
            setIsLevelsSelect(false)
            return setForm({ ...form, public: false, level: '' })
        }
        if (e.target.value === 'Partners only') {
            setIsLevelsSelect(true)
            return setForm({ ...form, public: false, level: levels[0]?._id || '' })
        }
    }

    const toggleHandler = () => {
        return setForm({ ...form, commentsDisabled: !form.commentsDisabled })
    }

    return (
        <>
            <div className="content">
                <div className="content__head">
                    <div>
                        <BackButton />
                        <h1>Post Settings</h1>
                    </div>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div></div>
                        <PostSettings
                            form={form}
                            levels={levels}
                            saveHandler={saveHandler}
                            modesHandler={modesHandler}
                            toggleHandler={toggleHandler}
                            changeHandler={changeHandler}
                            isLevelsSelect={isLevelsSelect}
                            setEditorContent={setEditorContent}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}