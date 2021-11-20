import React, { useRef, useState } from 'react'


export const ReadMoreWrapper = ({ children, limit, className }) => {
    const wrapperRef = useRef(null)
    const [notReadMore, setNotReadMore] = useState(false)

    const clickHandler = () => {
        if (!notReadMore) {
            wrapperRef.current.style.display = 'block'
            wrapperRef.current.style.webkitLineClamp = 'initial'
        } else {
            wrapperRef.current.style.display = '-webkit-box'
            wrapperRef.current.style.webkitLineClamp = limit
        }

        setNotReadMore(!notReadMore)
    }

    return (
        <div className={className}>
            <div ref={wrapperRef}
                style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: limit,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis'
                }}

                dangerouslySetInnerHTML={{ __html: children }} />
            {
                wrapperRef?.current?.childNodes?.length &&
                <button
                    style={{
                        cursor: 'pointer',
                        fontSize: '14px',
                        lineHeight: '140%',
                        letterSpacing: '0.5px',
                        marginTop: '12px',
                        color: '#512da8',
                    }}
                    onClick={clickHandler}>
                    {!notReadMore ? 'Read more' : 'Read less'}
                </button>
            }
        </div>
    )
}