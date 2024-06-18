import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
// import Content from './Content'
import { Outlet } from 'react-router-dom'


function HomeComponent() {
    return (
        <>
            <div className="container-fluid p-0 d-flex h-100">
                <Sidebar />
                <div className="flex-fill">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default HomeComponent