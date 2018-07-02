import React from 'react'
import '../Assets/styleSheets/base.scss'

const Footer = () => (
  <footer className="footerstyle">
    <div className="footerText">
      Made by{' '}
      <a
        href="https://www.freecodecamp.com/jonniebigodes"
        target="_noopener"
        rel="nofollow">
        Jonniebigodes
      </a>
    </div>
    <div className="footerText">
      Github repository:{' '}
      <a
        href="https://github.com/jonniebigodes/freecodecampApiChallenges"
        target="_noopener"
        rel="nofollow">
        Data Visualization Challenges
      </a>
    </div>
  </footer>
)
export default Footer
