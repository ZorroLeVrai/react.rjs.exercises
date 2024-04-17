import React from 'react'
import { Outlet } from "react-router-dom";
import LinkElement from './LinkElement';

const RouterLayout = () => {
  return (
    <>
      <div>
        <LinkElement to="/" text="Maison" />
        <LinkElement to="/etape0" text="etape 0" />
        <LinkElement to="/etape1" text="etape 1" />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default RouterLayout;