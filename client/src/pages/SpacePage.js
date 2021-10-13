import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from '../components/Navbar'
import { Loader } from '../components/Loader'
import { Post } from '../components/Post'
import { NotFoundPage } from './NotFoundPage'
import { FaInstagram } from 'react-icons/fa'
import { FiFacebook } from 'react-icons/fi'
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

    const createPostHandler = () => {

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
                                <h2 className={classes.head__title}>
                                    {space?.title}
                                </h2>
                                <div className={classes.head__desc}>
                                    <span>@{space?.alias}</span>
                                    <span>{space.followers.length} followers</span>
                                </div>
                                <p className={classes.head__status}>Статус</p>
                            </div>
                            {isOwner ?
                                <button
                                    onClick={createPostHandler}
                                    className={`btn btn_primary ${classes.head__btn}`}>
                                    Create post
                                </button>
                                :
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
                    <div className={classes.body}>
                        <div className={classes.body__column}>
                            <div className={classes.component}>
                                <div className={`${classes.component__head} ${classes.component__head_center}`}>
                                    <p className={classes.component__title}>
                                        Partnership levels
                                    </p>
                                </div>
                                <div className={classes.partnership}>
                                    <div className={classes.partnership__pic} />
                                    <p className={classes.partnership__title}>
                                        Subscription name
                                    </p>
                                    <p className={classes.partnership__price}>
                                        $10 per month
                                    </p>
                                    <button className={`btn ${classes.partnership__btn}`}>
                                        Edit level
                                    </button>
                                </div>
                            </div>
                            {isOwner && <button
                                className={`btn btn_secondary`}>
                                Add new level
                            </button>}
                        </div>
                        <div>
                            <div className={`${classes.component} ${classes.about}`}>
                                <div className={classes.component__head}>
                                    <p className={classes.component__title}>About</p>
                                </div>
                                <div className={classes.component__content}>
                                    <div className={classes.component__text}>
                                        <p>
                                            Привет! Меня зовут Андрей Замай,
                                            я придумал такую мультизабаву как "Антихайп" (товарных знак зарегистрирован)
                                            и я продолжаю свой путь в освоении новых форм донесения идей
                                        </p>
                                    </div>
                                    <button className={classes.component__readMoreBtn}>
                                        Read more
                                    </button>
                                </div>
                            </div>
                            <div className={classes.feed}>
                                <Post />
                                <Post />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={classes.component}>
                                    <div className={classes.component__head}>
                                        <p className={classes.component__title}>Contacts</p>
                                    </div>
                                    <div className={classes.component__content}>
                                        <div className={classes.component__list}>
                                            <a
                                                href="/"
                                                target="_blank"
                                                className={classes.component__listItem}>
                                                <span><FaInstagram /></span>
                                                Instagram
                                            </a>
                                            <a
                                                href="/"
                                                target="_blank"
                                                className={classes.component__listItem}>
                                                <span><FiFacebook /></span>
                                                Facebook
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}