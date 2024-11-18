import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BlogContextProvider } from './context/BlogContext.jsx'
import { FormContextProvider } from './context/FormContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogContextProvider>
        <FormContextProvider>
         <App />
        </FormContextProvider>
      </BlogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
