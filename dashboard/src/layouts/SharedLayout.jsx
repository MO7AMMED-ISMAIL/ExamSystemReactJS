import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from './Navbar'
// import Content from './Content'
import { Outlet } from 'react-router-dom'

function SharedLayout() {
    return (
        <>
           <div className="container-fluid p-0 d-flex h-100 p-3">
                <div className="flex-fill">
                    <Navbar/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default SharedLayout ;
