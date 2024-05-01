import { Outlet } from "react-router-dom";
import LinkElement from './LinkElement';

const RouterLayout = () => {
  return (
    <>
      <div>
        <LinkElement to="/" text="Maison" />
        <LinkElement to="/etape0" text="etape 0" />
        <LinkElement to="/etape1" text="etape 1" />
        <LinkElement to="/etape2" text="etape 2" />
        <LinkElement to="/etape3" text="etape 3" />
        <LinkElement to="/etape4" text="etape 4" />
        <LinkElement to="/etape5" text="etape 5" />
        <LinkElement to="/etape6" text="etape 6" />
        <LinkElement to="/etape7" text="etape 7" />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default RouterLayout;