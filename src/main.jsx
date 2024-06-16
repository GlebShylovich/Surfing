import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.jsx'
import { initializeApp } from "firebase/app";
import appConfig from '../config.js'
import './Styles/index.scss'

initializeApp(appConfig)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
