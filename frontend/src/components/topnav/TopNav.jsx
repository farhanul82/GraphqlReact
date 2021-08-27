import React from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'

const Topnav = () => {
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>

        </div>
    )
}

export default Topnav

