import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'


export const BackButton = () => {
    const history = useHistory()

    const goBack = () => history.goBack()

    return (
        <button style={{
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            letterSpacing: '0.5px',
            color: '#262626',
            marginBottom: '.5rem',
            transition: 'color 0.1s ease-out'
        }}
            onClick={goBack}>
            <FiArrowLeft />
            <span
                style={{
                    marginLeft: '0.5em'
                }}>
                Back
            </span>
        </button>
    )
}