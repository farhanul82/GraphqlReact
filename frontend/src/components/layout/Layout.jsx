import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import './layout.css'

import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { fetchStudent, fetchSubjects } from '../../Redux/Action/action'

const Layout = () => {
    const dispatch= useDispatch()
    useEffect( () => {
        dispatch(fetchStudent())
        dispatch(fetchSubjects())
    }, []);
    return (
        <BrowserRouter>
            <Route render={(props) =>

            (
                <div className={`layout `}>
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <TopNav />
                        <div className="layout__content-main">
                            <Routes />
                        </div>
                    </div>
                </div>
            )} />
        </BrowserRouter>
    )
}

export default Layout
