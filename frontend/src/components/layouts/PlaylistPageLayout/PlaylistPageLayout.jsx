import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../Navbar'

const PlaylistPageLayout = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className="pt-8">
        <Outlet/>
    </div>
    </div>
  )
}

export default PlaylistPageLayout