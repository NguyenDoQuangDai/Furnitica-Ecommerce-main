import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UsersList from './UsersList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersList />
  </StrictMode>,
)
