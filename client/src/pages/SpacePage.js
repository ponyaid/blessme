import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import { Post } from '../components/Post'
import { ReadMoreWrapper } from '../components/ReadMoreWrapper'
import { NotFoundPage } from './NotFoundPage'
import { FaUserCog } from 'react-icons/fa'
import avatarSvg from '../static/img/avatar.svg'
import { FaInstagram, FaFacebook, FaYoutube, FaTelegram } from 'react-icons/fa'
import classes from '../static/scss/space.module.scss'
import { getLevelsBySpace } from '../redux/actions/level.actions'
import {
    subscribe,
    unsubscribe,
    updateSubscription,
    getSubscription,
    getSubscribers
} from '../redux/actions/subscription.actions'
import { getSpace, uploadOne } from '../redux/actions/space.actions'
import { deletePost, getPosts } from '../redux/actions/post.actions'


export const SpacePage = () => {
    const dispatch = useDispatch()
    const alias = useParams().alias
    const { user } = useSelector(state => state.auth)
    const { levels } = useSelector(state => state.level)
    const { loading } = useSelector(state => state.app)
    const { subscribers, subscription } = useSelector(state => state.subscription)
    const { space, isOwner } = useSelector(state => state.space)
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getSpace(alias))
    }, [dispatch, alias])

    useEffect(() => {
        if (space) {
            dispatch(getLevelsBySpace(space._id))
            dispatch(getPosts({ space: space._id }))
            dispatch(getSubscription(space._id))
        }
    }, [dispatch, space])

    useEffect(() => {
        if (space) dispatch(getSubscribers(space._id))
    }, [dispatch, space, subscription])

    const removePostHandler = e => {
        e.preventDefault()
        const postId = e.target.getAttribute('data-post-id')
        dispatch(deletePost(postId))
    }

    const subscribeHandler = () => {
        dispatch(subscribe(space._id))
    }

    const unsubscribeHandler = () => {
        dispatch(unsubscribe(subscription._id))
    }

    const becomePartnerHandler = e => {
        const level = e.target.id
        if (subscription) {
            return dispatch(updateSubscription(subscription._id, { level }))
        }
        dispatch(subscribe(space._id, level))
    }

    const uploadHandler = async ({ target }) => {
        const form = new FormData()
        form.append('file', target.files[0])
        dispatch(uploadOne(alias, form, 'cover'))
        target.value = ''
    }

    if (loading && !space) return <Loader />

    if (!loading && !space) return <NotFoundPage />

    const { instagram, facebook, telegram, youtube } = space

    return (
        <>
            <div className={classes.space}>
                <div className={classes.cover}>
                    {space.cover &&
                        <img
                            alt="cover"
                            src={space.cover}
                            className={classes.cover__img} />
                    }
                    <div className={classes.cover__content}>
                        {isOwner &&
                            <div className={classes.cover__nav}>
                                <div className={classes.uploadCover}>
                                    <label
                                        htmlFor="cover"
                                        style={{
                                            border: 'none',
                                            backgroundColor: '#fff'
                                        }}
                                        className={`btn btn_border`}>
                                        Change cover
                                    </label>
                                    <input
                                        id="cover"
                                        type="file"
                                        accept="image/*"
                                        disabled={loading}
                                        onChange={uploadHandler}
                                        className={classes.uploadCover__input}
                                    />
                                </div>
                                <Link
                                    to="/settings"
                                    style={{
                                        border: 'none',
                                        backgroundColor: '#fff'
                                    }}
                                    className='btn btn_border'>
                                    <FaUserCog />
                                    Settings
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                <div className={classes.main}>
                    <div className={classes.head}>
                        <div>
                            <div className={classes.avatar}>
                                <img
                                    alt="avatar"
                                    width="184"
                                    height="184"
                                    className={classes.avatar__pic}
                                    src={space.avatar || avatarSvg} />
                            </div>
                        </div>
                        <div>
                            <div className={classes.head__content}>
                                <div>
                                    <h2 className={classes.head__title}>
                                        {space.title}
                                    </h2>
                                    <div className={classes.head__desc}>
                                        <span>@{space.alias}</span>
                                        <span>{subscribers.length} followers</span>
                                    </div>
                                </div>
                                <div className={classes.head__nav}>
                                    {isOwner ?
                                        <Link
                                            to="/posts/create"
                                            className={`btn btn_primary ${classes.head__btn}`}>
                                            Create post
                                        </Link>
                                        :
                                        <>
                                            {subscription ?
                                                <button
                                                    onClick={unsubscribeHandler}
                                                    className={`btn btn_gray ${classes.head__btn}`}>
                                                    Unfollow
                                                </button> :
                                                <button
                                                    onClick={subscribeHandler}
                                                    className={`btn btn_primary ${classes.head__btn}`}>
                                                    Follow
                                                </button>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content__grid'>
                        <div>
                            {!Object.values({ instagram, facebook, telegram, youtube }).every(e => !e)
                                && <div style={{ marginBottom: '8px' }}>
                                    <div className={classes.social}>
                                        {instagram && <a
                                            rel="nofollow"
                                            target="blank"
                                            href={instagram}
                                            className={classes.social__item}>
                                            <FaInstagram />
                                        </a>}
                                        {facebook && <a
                                            rel="nofollow"
                                            target="blank"
                                            href={facebook}
                                            className={classes.social__item}>
                                            <FaFacebook />
                                        </a>}
                                        {telegram && <a
                                            rel="nofollow"
                                            target="blank"
                                            href={telegram}
                                            className={classes.social__item}>
                                            <FaTelegram />
                                        </a>}
                                        {youtube && <a
                                            rel="nofollow"
                                            target="blank"
                                            href={youtube}
                                            className={classes.social__item}>
                                            <FaYoutube />
                                        </a>}
                                    </div>
                                </div>
                            }
                            {!!levels.length && <div
                                style={{ marginBottom: '12px' }}
                                className={classes.component}>
                                <div className={`${classes.component__head} ${classes.component__head_center}`}>
                                    <p className={classes.component__title}>
                                        Partnership levels
                                    </p>
                                </div>
                                {levels.map(level =>
                                    <div
                                        key={level._id}
                                        className={classes.partnership}>
                                        <div className={classes.partnership__pic} >
                                            {level.picture && <img
                                                alt="pic"
                                                src={level.picture}
                                            />}
                                        </div>
                                        <p className={classes.partnership__title}>
                                            {level.name}
                                        </p>
                                        <p className={classes.partnership__price}>
                                            ${level.price} per month
                                        </p>
                                        {isOwner ?
                                            <Link
                                                to={`/levels/${level._id}`}
                                                className={`btn btn_border ${classes.partnership__btn}`}>
                                                Edit level
                                            </Link> :
                                            <button
                                                id={level._id}
                                                onClick={becomePartnerHandler}
                                                disabled={subscription?.level === level._id}
                                                className={`btn btn_border ${classes.partnership__btn}`}>
                                                {subscription?.level === level._id ?
                                                    'Subscribed' : 'Become a partner'}
                                            </button>
                                        }
                                    </div>
                                )}
                            </div>}
                            {isOwner && <Link
                                to="/settings/levels"
                                className={`btn btn_secondary`}>
                                Add new level
                            </Link>}
                        </div>
                        <div>
                            {space.about && <div className={`${classes.component}`}>
                                <div className={`${classes.component__head}`}>
                                    <div>
                                        <p className={classes.component__title}>
                                            About
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.component__content}>
                                    <ReadMoreWrapper
                                        limit="2"
                                        className={classes.component__text}>
                                        {space.about}
                                    </ReadMoreWrapper>
                                </div>
                            </div>}
                            <div className={classes.feed}>
                                <div className="dropdownGroup">
                                    <div className="dropdown">
                                        <p className="dropdown__title">?????? ????????????</p>
                                    </div>
                                    <div className="dropdown">
                                        <p className="dropdown__title">?????? ????????????</p>
                                    </div>
                                    <div className="dropdown">
                                        <p className="dropdown__title">?????? ????????????</p>
                                    </div>
                                </div>
                                {posts.map(post =>
                                    <Post
                                        post={post}
                                        user={user}
                                        key={post._id}
                                        removeHandler={removePostHandler}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}