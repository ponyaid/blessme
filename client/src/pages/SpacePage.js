import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from '../components/Navbar'
import { Loader } from '../components/Loader'
import { NotFoundPage } from './NotFoundPage'
import classes from '../static/scss/space.module.scss'
import {
    getSpace,
    followSpace,
    unfollowSpace
} from '../redux/actions'


export const SpacePage = () => {
    const dispatch = useDispatch()
    const alias = useParams().alias
    const { user } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.app)
    const { space, isOwner, isFollower } = useSelector(state => state.space)

    useEffect(() => {
        dispatch(getSpace(alias))
    }, [dispatch, alias, user])

    const followHandler = () => {
        dispatch(followSpace(alias))
    }

    const unfollowHandler = () => {
        dispatch(unfollowSpace(alias))
    }

    if (loading && !space) return <Loader />

    if (!loading && !space) return <NotFoundPage />

    return (
        <>
            <Navbar />
            <div className={classes.space}>
                <div className={classes.cover}>
                    <div className={classes.cover__content}>
                        {isOwner && <button className={`btn ${classes.cover__btn}`}>
                            Update cover
                        </button>}
                    </div>
                </div>
                <div className={classes.main}>
                    <div className={classes.head}>
                        <div className={classes.avatar} />
                        <div className={classes.head__content}>
                            <div>
                                <h3 className={classes.head__title}>
                                    {space?.title}
                                </h3>
                                <div className={classes.head__desc}>
                                    <span>@{space?.alias}</span>
                                    <span>{space.followers.length} followers</span>
                                </div>
                            </div>
                            {!isOwner &&
                                <>
                                    {isFollower ?
                                        <button
                                            onClick={unfollowHandler}
                                            className={`btn btn_gray ${classes.head__btn}`}>
                                            Unfollow
                                        </button> :
                                        <button
                                            onClick={followHandler}
                                            className={`btn btn_primary ${classes.head__btn}`}>
                                            Follow
                                        </button>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className={classes.main__content}>
                        <div className={classes.main__left}>
                            {isOwner && <button
                                className={`btn btn_secondary ${classes.main__leftBtn}`}>
                                Add new level
                            </button>}
                        </div>
                        <div className={classes.main__right}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}