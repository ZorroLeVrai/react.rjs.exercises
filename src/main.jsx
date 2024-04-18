import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import RouterLayout from './RouterLayout.jsx';
import App from './App.jsx';
import { Etape0 } from './etape0/App.jsx';
import { Etape1 } from './etape1/App.jsx';
import { Etape2 } from './etape2/App.jsx';
import NotFound from './NotFound.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RouterLayout/>}>
          <Route path="/" element={<App />} />
          <Route path="/etape0" element={<Etape0.App/>} />
          <Route path="/etape1" element={<Etape1.App/>} />
          <Route path="/etape2" element={<Etape2.App/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
