import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 开发模式下，进行严格模式会进行两次render，在生产环境中不会render两次
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
