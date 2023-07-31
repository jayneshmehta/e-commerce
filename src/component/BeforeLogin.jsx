import React from 'react'
import { Link } from 'react-router-dom'

export default function BeforeLogin() {
  return (
    <div className="d-flex gap-2">
      <Link to={'/login'} className="btn btn-outline-primary">Login</Link>
      <Link to={'/register'} className="btn btn-primary">Register</Link>
    </div>
  )
}
