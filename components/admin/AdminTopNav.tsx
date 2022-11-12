import React from 'react'

const AdminTopNav = () => {
    return (
        <div className="w-full h-full shadow border-b border-gray-200 flex justify-between items-center px-10">
            {/*  */}
            <div></div>
            {/*  */}
            <div className="flex items-center gap-x-1">
                <div className="p-3 rounded-full bg-purple-50">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-5 h-5 text-purple-60"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" fill="currentColor" 
                    className="w-5 h-5 text-purple-60"
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </div>
            {/*  */}
        </div>
    )
}

export default AdminTopNav