import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ServicesProvider } from './context/ServicesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<ServicesProvider>
    <App />
</ServicesProvider>
  </React.StrictMode>,
)
