import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import classes from '../static/scss/settings.module.scss'


export const Select = ({
    name,
    options,
    selectHandler }) => {
    return (
        <div className={classes.selectWrap}>
            <select
                name={name}
                onChange={selectHandler}
                className={classes.select}>
                {options.map((option, index) =>
                    <option
                        key={index}
                        value={option.value}
                        className={classes.select__option}>
                        {option.text}
                    </option>
                )}
            </select>
            <span className={classes.selectWrap__arrow}>
                <FaChevronDown />
            </span>
        </div>
    )
}