import React from 'react'
import { Outlet } from "react-router-dom";
import LinkElement from './LinkElement';

const RouterLayout = () => {
  return (
    <>
      <div>
        <LinkElement to="/" text="Maison" />
        <LinkElement to="/etape0" text="etape0" />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default RouterLayout;