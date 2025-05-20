import { Outlet } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import './index.scss'

const Layout = () => {
  const [screenClass, setScreenClass] = useState('')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenClass('mobile-layout')
      } else if (window.innerWidth < 1024) {
        setScreenClass('tablet-layout')
      } else {
        setScreenClass('desktop-layout')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
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
  )
}

export default Layout
