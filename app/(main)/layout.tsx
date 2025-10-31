
import React from 'react'
import AppHeader from '../(main)/_components/AppHeader';

function DashboardLayout({children}: {children:React.ReactNode}) {
  return (
    <div suppressHydrationWarning>
        <AppHeader />
        
        <div className='px-14 lg:px-50 py-10 mt-3'>
        {children}
        </div>
        </div>
  )
}

export default DashboardLayout