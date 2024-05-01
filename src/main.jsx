import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import RouterLayout from './commonComponents/RouterLayout.jsx';
import App from './App.jsx';
import { Etape0 } from './etape0/App.jsx';
import { Etape1 } from './etape1/App.jsx';
import { Etape2 } from './etape2/App.jsx';
import { Etape3 } from './etape3/App.jsx';
import { Etape4 } from './etape4/App.jsx';
import { Etape5 } from './etape5/App.jsx';
import { Etape6 } from './etape6/App.jsx';
import { Etape7 } from './etape7/App.jsx';
import NotFound from './commonComponents/NotFound.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<RouterLayout/>}>
            <Route path="/" element={<App />} />
            <Route path="/etape0" element={<Etape0.App/>} />
            <Route path="/etape1" element={<Etape1.App/>} />
            <Route path="/etape2" element={<Etape2.App/>} />
            <Route path="/etape3" element={<Etape3.App/>} />
            <Route path="/etape4" element={<Etape4.App/>} />
            <Route path="/etape5" element={<Etape5.App/>} />
            <Route path="/etape6" element={<Etape6.App/>} />
            <Route path="/etape7" element={<Etape7.App/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
);