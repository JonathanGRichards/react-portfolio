import { Outlet } from 'react-router-dom'
import React, { useState, useEffect, createContext } from 'react'
import Sidebar from '../Sidebar'
import './index.scss'

// Create context to share screen size info with child components
export const ScreenContext = createContext({
  isMobile: false,
  isTablet: false,
  screenClass: '',
})

const Layout = () => {
  const [screenClass, setScreenClass] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024

      setIsMobile(mobile)
      setIsTablet(tablet)

      if (mobile) {
        setScreenClass('mobile-layout')
      } else if (tablet) {
        setScreenClass('tablet-layout')
      } else {
        setScreenClass('desktop-layout')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const screenContextValue = {
    isMobile,
    isTablet,
    screenClass,
  }

  return (
    <ScreenContext.Provider value={screenContextValue}>
      <div className={`layout-container ${screenClass}`}>
        <div className="App"></div>
        <Sidebar />
        <div className="page">
          <span className="tags top-tags">&lt;body&gt;</span>

          <Outlet />
          <span className="tags bottom-tags">
            &lt;/body&gt;
            <br />
            <span className="bottom-tag-html">&lt;/html&gt;</span>
          </span>
        </div>
      </div>
    </ScreenContext.Provider>
  )
}

export default Layout
