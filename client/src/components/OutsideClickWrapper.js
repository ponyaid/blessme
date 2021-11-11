import React, { useRef, useEffect } from 'react'


export const OutsideClickWrapper = ({ children, onOutsideClick }) => {
    const wrapperRef = useRef(null)

    useEffect(() => {
        document.addEventListener('mousedown', event => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) onOutsideClick()
        })
    }, [onOutsideClick])

    return (
        <div ref={wrapperRef}>
            {children}
        </div>
    )
}