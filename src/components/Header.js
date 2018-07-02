import React from 'react'
import {Link} from 'react-router-dom'
import '../Assets/styleSheets/base.scss'

const Header = () => (
  <div className="header">
    <div className="containerHeader">
      <h1 style={{margin: 0}}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}>
          Supercalifragilistic Api Projects
        </Link>
      </h1>
    </div>
  </div>
)
export default Header
