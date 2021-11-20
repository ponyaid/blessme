import React, { useState } from 'react'
import Moment from 'react-moment'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { FaEllipsisV } from 'react-icons/fa'
import { ReadMoreWrapper } from '../components/ReadMoreWrapper'
import { OutsideClickWrapper } from '../components/OutsideClickWrapper'
import classes from '../static/scss/post.module.scss'


export const Post = ({ post, removeHandler, user }) => {
    const [isDropdown, setIsDropdown] = useState(false)

    const dropdownHandler = () => setIsDropdown(!isDropdown)

    if (!post) return null

    return (
        <div className={classes.post}>
            <div className={classes.post__head}>
                <div className={classes.post__avatar}>
                    <Avatar
                        size="40"
                        name={post.space.title}
                        src={post.space.avatar}
                    />
                </div>
                <p className={classes.post__authorName}>
                    {post.space.title}
                </p>
                <button
                    className='icon-btn'
                    style={{ marginLeft: 'auto' }}
                    onClick={dropdownHandler}>
                    <FaEllipsisV />
                    {isDropdown &&
                        <OutsideClickWrapper onOutsideClick={dropdownHandler}>
                            <div
                                style={{
                                    top: '100%',
                                    left: '100%',
                                    right: 'auto',
                                    border: '1px solid #d5e3ec'
                                }}
                                className="dropMenu">
                                <div className="dropMenu__list">
                                    <div
                                        to={`/`}
                                        className="dropMenu__listItem">
                                        Copy post URL
                                    </div>
                                    {/* <Link
                                        to={`/posts/${post._id}/settings`}
                                        className="dropMenu__listItem">
                                        Edit post
                                    </Link> */}
                                    {removeHandler && <div
                                        data-post-id={post._id}
                                        style={{ color: '#ee2c5b' }}
                                        onClick={removeHandler}
                                        className="dropMenu__listItem dropMenu__listItem_border">
                                        Remove post
                                    </div>}
                                </div>
                            </div>
                        </OutsideClickWrapper>
                    }
                </button>
            </div>
            <div className={classes.post__content}>
                <div className={classes.post__meta}>
                    <div className={classes.post__status}>
                        <span className={classes.post__statusTitle}>
                            {post.level ? post.level.name :
                                (post.public ? 'Open to everyone' : 'Only subscribers')}
                        </span>
                    </div>
                    <p className={classes.post__createdAt}>
                        <Moment
                            format="DD MMM, HH:mm">
                            {post.createdAt}
                        </Moment>
                    </p>
                </div>
                {post.title && <h3 className={classes.post__title}>
                    {post.title}
                </h3>}
                {post.body &&
                    <ReadMoreWrapper
                        limit={post.cover ? '2' : '10'}
                        className={classes.post__text}>
                        {post.body}
                    </ReadMoreWrapper>
                }
                {post.cover && <div className={classes.post__cover}>
                    <img alt="pic" src={post.cover} />
                </div>}
            </div>
            <div>
                <ul className={classes.comments}>
                    <li className={classes.comment}>
                        <div className={classes.comment__avatar}>
                            <Avatar
                                size="40"
                                name="Женя Лысов"
                                src=""
                            />
                        </div>
                        <div>
                            <p className={classes.comment__name}>
                                Женя Лысов
                            </p>
                            <p className={classes.comment__text}>
                                На айфоне чтобы gpx открыть - нужна прога guitar pro. PDF всегда открыться должно. Если не скачивается - можно скрин экрана в фото сохранить.
                            </p>
                            <div className={classes.comment__info}>
                                <p>16 окт. в 12:19</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className={classes.commentForm}>
                    <div className={classes.commentForm__avatar}>
                        <Avatar
                            size="40"
                            name={user?.name}
                            googleId={user?.googleId}
                            src={user?.imageUrl}
                        />
                    </div>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        maxLength="32"
                        // value={form.title}
                        placeholder="Title here"
                        // onChange={changeHandler}
                        className={`form__input`}
                    />
                </div>
            </div>
        </div>
    )
}