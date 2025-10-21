import React from 'react'
import { Outlet } from 'react-router'

const PlaylistPageLayout = () => {
  return (
      <div className="pt-8">
        <Outlet/>
    </div>
    
  )
}

export default PlaylistPageLayout