import React from 'react'
import { useRouter } from 'next/router'
import AdminSideNav from './admin/AdminSideNav'
import AdminTopNav from './admin/AdminTopNav'

const MainLayout = ({ children }: any) => {
    
    const { pathname } = useRouter()
    const paths = pathname.split('/')
    
    const Layout = () => {
        if (paths[1] === 'admin') {
            return (
                <div className="grid grid-cols-layout">
                    {/* SIDENAV */}
                    <AdminSideNav />
                    {/*  */}
                    <div className="w-full h-screen grid grid-rows-layout">
                        {/* TOPNAV */}
                        <AdminTopNav />
                        {/*  */}
                        <div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
                            { children }
                        </div>
                        {/*  */}
                    </div>
                    {/*  */}
                </div>
            )
        } 
        else if (paths[1] === 'citizen') {
            return (
                <div className="grid grid-cols-layout">
                    {/* SIDENAV */}
                    <AdminSideNav />
                    {/*  */}
                    <div className="w-full h-screen grid grid-rows-layout">
                        {/* TOPNAV */}
                        <AdminTopNav />
                        {/*  */}
                        <div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
                            { children }
                        </div>
                        {/*  */}
                    </div>
                    {/*  */}
                </div>
            )
        }
        else if (paths[1] === 'staff') {
            return (
                <div className="grid grid-cols-layout">
                    {/* SIDENAV */}
                    <AdminSideNav />
                    {/*  */}
                    <div className="w-full h-screen grid grid-rows-layout">
                        {/* TOPNAV */}
                        <AdminTopNav />
                        {/*  */}
                        <div className="w-full bg-gray-100 overflow-y-auto overflow-x-hidden p-8">
                            { children }
                        </div>
                        {/*  */}
                    </div>
                    {/*  */}
                </div>
            )
        }
        return <div>{ children }</div>
    }

    return (
        <div>
            <Layout />
        </div>
    )

}

export default MainLayout