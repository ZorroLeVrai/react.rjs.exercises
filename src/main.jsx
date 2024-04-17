import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import RouterLayout from './RouterLayout.jsx';
import App from './App.jsx';
import { Etape0 } from './etape0/App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RouterLayout/>}>
          <Route path="/" element={<App />} />
          <Route path="/etape0" element={<Etape0.App/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
